# 🚀 Dripzy Store — Automated Product Upload Pipeline

## How It Works

```
You drop photos → push to GitHub → GitHub Actions runs → Gemini AI analyzes images
→ products.json updated → images moved → Netlify auto-deploys → Live store updated!
```

No server. No manual work. 100% free. ✨

---

## ✅ Prerequisites Checklist

- [ ] GitHub account with this repo pushed
- [ ] Netlify connected to your GitHub repo (auto-deploy on push)
- [ ] Google Gemini API key (free — instructions below)
- [ ] GitHub Repository Secret set up

---

## Step 1 — Get Your Free Gemini API Key

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key — it looks like: `AIzaSyAbc123...`

> **Free Tier Limits** (more than enough for a small store):
> - 15 requests per minute
> - 1,500 requests per day
> - 1 million tokens per day
> - **No credit card required**

---

## Step 2 — Add the API Key to GitHub Secrets

1. Open your GitHub repository in the browser
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Set:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** *(paste your API key here)*
5. Click **"Add secret"**

> ⚠️ **Never** put your API key directly in code or commit it to Git.
> GitHub Secrets are encrypted and only exposed to GitHub Actions during runs.

---

## Step 3 — Upload Photos to Add Products

### Option A: From Your Phone (Easiest)

1. Install the **GitHub Mobile** app (iOS or Android)
2. Open your repository → navigate to `public/uploads/new-watches/`
3. Tap the **+** button → **"Upload files"**
4. Select watch photos from your camera roll
5. Commit the upload — the pipeline starts automatically!

### Option B: From Your Laptop

```bash
# Copy your watch photos into the upload folder
cp ~/Downloads/my-watch.jpg dripzy-store/public/uploads/new-watches/

# Commit and push
cd dripzy-store
git add public/uploads/new-watches/
git commit -m "Add new watch photos for auto-upload"
git push
```

The GitHub Action triggers the moment you push files to that folder.

### Option C: GitHub Web UI (Browser)

1. Go to your repo on **github.com**
2. Navigate to `public/uploads/new-watches/`
3. Click **"Add file"** → **"Upload files"**
4. Drag & drop your watch images
5. Click **"Commit changes"**

---

## 💡 Pro Tips: Filename Price Trick

**Name your file with a price to control the product price:**

| Filename | Price Used |
|---|---|
| `watch-4999.jpg` | ₹4,999 |
| `luxury-9999.png` | ₹9,999 |
| `casio-2499.jpg` | ₹2,499 |
| `my-watch.jpg` | Gemini picks a price |

The script reads any 3-6 digit number in the filename and uses it as the exact price.

---

## Step 4 — Monitor the Pipeline

1. Go to your GitHub repo → **"Actions"** tab
2. You'll see the **"🤖 Auto Product Upload"** workflow running
3. Click it to see live logs of Gemini analyzing your images
4. When it goes ✅ green, Netlify starts deploying automatically
5. Your store is live in ~1-2 minutes!

---

## 📁 Folder Structure

```
dripzy-store/
├── public/
│   ├── uploads/
│   │   └── new-watches/        ← 📸 DROP YOUR PHOTOS HERE
│   ├── images/
│   │   └── products/           ← Auto-moved here after processing
│   └── products.json           ← Auto-updated product database
├── scripts/
│   └── auto-add-products.js    ← The automation script
└── .github/
    └── workflows/
        └── auto-product-upload.yml  ← GitHub Actions config
```

---

## 🛠️ Troubleshooting

### "GEMINI_API_KEY is not set"
→ Make sure you added the secret in GitHub (Step 2). Secret names are case-sensitive.

### Workflow didn't trigger
→ Make sure you pushed files specifically into `public/uploads/new-watches/`. The workflow only triggers when files are pushed to that path.

### Image not appearing on store
→ Check the Actions log for errors. If Gemini couldn't analyze the image, check that it's a clear photo of a watch (not too blurry or dark).

### Netlify not deploying
→ Make sure Netlify is connected to your GitHub repo and auto-deploy is enabled in Netlify's Site Settings → Build & Deploy.

---

## 🔄 Manual Trigger

You can also trigger the pipeline manually without pushing images:
1. Go to **Actions** → **"🤖 Auto Product Upload"**
2. Click **"Run workflow"** → **"Run workflow"**

Useful for re-running after fixing an error.

---

## 📞 Need Help?

If the pipeline fails, check:
1. The **Actions** tab on GitHub for the full error log
2. That your Gemini API key hasn't expired
3. That the image file is a supported format: `.jpg`, `.jpeg`, `.png`, `.webp`

---

*Built with ❤️ for Dripzy Store — Powered by Google Gemini AI (Free Tier) + GitHub Actions*

