#!/usr/bin/env node
/**
 * auto-add-products.js
 * ─────────────────────────────────────────────────────────────────
 * Dripzy Store — Automated Watch Product Upload Pipeline
 *
 * Usage:  node scripts/auto-add-products.js
 * Env:    GEMINI_API_KEY   — Google Gemini API key (free tier)
 *
 * Flow:
 *  1. Scan public/uploads/new-watches/ for image files
 *  2. Send each image to Gemini Vision API for product detail generation
 *  3. Append new products to public/products.json
 *  4. Move processed images to public/images/products/
 *  5. Commit + push is handled by the GitHub Actions workflow
 * ─────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

// ── Configuration ───────────────────────────────────────────────
const ROOT          = path.resolve(__dirname, '..');
const UPLOAD_DIR    = path.join(ROOT, 'public', 'uploads', 'new-watches');
const DEST_DIR      = path.join(ROOT, 'public', 'images', 'products');
const PRODUCTS_JSON = path.join(ROOT, 'public', 'products.json');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL  = 'gemini-2.0-flash-lite'; // free-tier model
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

// ── Helpers ─────────────────────────────────────────────────────

/** Convert image file to base64 data URI */
function imageToBase64(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg'
             : ext === 'png'  ? 'image/png'
             : 'image/webp';
  return { base64: buffer.toString('base64'), mimeType: mime };
}

/** Extract price hint from filename, e.g. "watch-4999.jpg" → 4999 */
function extractPriceFromFilename(filename) {
  const match = filename.match(/(\d{3,6})/);
  if (match) {
    const price = parseInt(match[1], 10);
    // sanity check: between ₹500 and ₹999999
    if (price >= 500 && price <= 999999) return price;
  }
  return null;
}

/** Generate a URL-safe slug from filename + timestamp */
function generateId(filename) {
  const base = path.basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const ts = Date.now();
  return `auto-${base}-${ts}`;
}

/** Make an HTTPS POST request and return the JSON body */
function httpsPost(url, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse failed: ${data}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/** Call Gemini Vision API and return parsed product JSON */
async function analyzeImageWithGemini(filePath, filename) {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY environment variable is not set.');

  const { base64, mimeType } = imageToBase64(filePath);
  const priceHint = extractPriceFromFilename(filename);

  const priceInstruction = priceHint
    ? `The filename contains the number ${priceHint} — use this as the exact price in INR (do NOT change it).`
    : 'Generate a realistic price in INR between ₹1,999 and ₹24,999 based on the watch quality visible in the image.';

  const prompt = `You are a luxury watch product copywriter for an Indian e-commerce store called Dripzy Store.

Analyze this watch image carefully and return ONLY a valid JSON object — no markdown fences, no explanation.

${priceInstruction}

Return exactly this JSON structure:
{
  "name": "A luxury watch product title (e.g. 'Chronograph Obsidian Steel')",
  "price": <integer price in INR>,
  "originalPrice": <integer MRP in INR, 20-40% higher than price, or null if unknown>,
  "caption": "Two compelling sentences highlighting the strap material, dial style, and ideal occasion. Sound premium and aspirational.",
  "category": "One of: Skeleton Watches | Cushion Watches | Casio Watches | Samsung Galaxy Watches | Sport Watches | Minimalist Watches | Luxury Watches",
  "badge": "One of: New | Bestseller | Premium | Hot | Trending | Limited | Luxury | Exclusive | Popular | null",
  "isNew": true
}

RULES:
- Output ONLY the JSON object. No extra text, no code fences.
- name: 3-6 words, luxury tone, avoid generic names.
- price: integer only, no currency symbols.
- originalPrice: integer or null.
- caption: exactly 2 sentences, max 40 words total.
- category: must be one of the listed options.
- badge: must be one of the listed options or null.
- isNew: always true for auto-uploaded products.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{
      parts: [
        { text: prompt },
        { inline_data: { mime_type: mimeType, data: base64 } }
      ]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 400,
    }
  };

  const response = await httpsPost(url, payload);

  if (response.error) {
    throw new Error(`Gemini API error: ${response.error.message}`);
  }

  const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Gemini returned empty response.');

  // Strip markdown fences if Gemini wrapped output anyway
  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error(`Gemini response is not valid JSON:\n${cleaned}`);
  }

  return parsed;
}

/** Sleep helper for rate limiting */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Main ─────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Dripzy Auto-Product Upload Pipeline Starting...\n');

  // Ensure directories exist
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    console.log(`📁 Created upload directory: ${UPLOAD_DIR}`);
  }
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  // Find new images
  const files = fs.readdirSync(UPLOAD_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED_EXT.includes(ext) && !f.startsWith('.');
  });

  if (files.length === 0) {
    console.log('✅ No new images found in uploads/new-watches/. Nothing to do.');
    process.exit(0);
  }

  console.log(`📷 Found ${files.length} new image(s) to process:\n`);
  files.forEach(f => console.log(`   • ${f}`));
  console.log('');

  // Load existing products.json
  let productsData = { watches: [], categories: [] };
  if (fs.existsSync(PRODUCTS_JSON)) {
    try {
      productsData = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));
    } catch (e) {
      console.error('⚠️  Warning: Could not parse products.json, starting fresh.');
    }
  }

  // Track existing IDs to avoid duplicates
  const existingIds = new Set((productsData.watches || []).map(w => w.id));
  const newProducts = [];

  // Process each image
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const srcPath  = path.join(UPLOAD_DIR, filename);
    
    console.log(`\n[${i + 1}/${files.length}] Processing: ${filename}`);
    console.log('  🤖 Analyzing with Gemini Vision...');

    try {
      const geminiData = await analyzeImageWithGemini(srcPath, filename);

      // Build the final dest filename: slugified original name
      const slugName = filename
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9.\-_]/g, '');
      const destFilename = `${Date.now()}-${slugName}`;
      const destPath = path.join(DEST_DIR, destFilename);
      const publicImagePath = `/images/products/${destFilename}`;

      // Generate unique ID
      let productId = generateId(filename);
      while (existingIds.has(productId)) {
        productId = `${productId}-${Math.floor(Math.random() * 1000)}`;
      }
      existingIds.add(productId);

      const product = {
        id:            productId,
        name:          geminiData.name          || `Watch ${Date.now()}`,
        category:      geminiData.category       || 'Luxury Watches',
        price:         geminiData.price          || 4999,
        originalPrice: geminiData.originalPrice  || null,
        image:         publicImagePath,
        badge:         geminiData.badge          || 'New',
        description:   geminiData.caption        || 'A premium timepiece for the discerning collector.',
        isNew:         true,
      };

      // Move image to destination
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);

      newProducts.push(product);
      console.log(`  ✅ Generated: "${product.name}" | ₹${product.price.toLocaleString('en-IN')} | ${product.category}`);
      console.log(`  📦 Moved to: ${publicImagePath}`);

    } catch (err) {
      console.error(`  ❌ Failed to process ${filename}: ${err.message}`);
      // Don't stop — continue with next image
    }

    // Rate limit: wait 2 seconds between API calls (free tier is 15 rpm)
    if (i < files.length - 1) {
      await sleep(2000);
    }
  }

  if (newProducts.length === 0) {
    console.log('\n⚠️  No products were successfully generated. Check errors above.');
    process.exit(1);
  }

  // Update categories list dynamically
  const allCategories = new Set(productsData.categories || []);
  allCategories.add('All');
  newProducts.forEach(p => allCategories.add(p.category));

  // Append new products
  productsData.watches = [...(productsData.watches || []), ...newProducts];
  productsData.categories = ['All', ...Array.from(allCategories).filter(c => c !== 'All')];

  // Write updated products.json
  fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(productsData, null, 2), 'utf8');

  console.log(`\n🎉 Success! Added ${newProducts.length} new product(s) to products.json`);
  console.log(`📊 Total products in store: ${productsData.watches.length}`);
  console.log('\n📝 New products added:');
  newProducts.forEach(p => {
    console.log(`   • [${p.id}] ${p.name} — ₹${p.price.toLocaleString('en-IN')}`);
  });
  console.log('\n✨ Done! GitHub Actions will now commit and push the changes.\n');
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err.message);
  process.exit(1);
});
