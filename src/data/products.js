// Product data — fetched at runtime from /products.json (served from public/).
// This means the browser always reads the latest version without a rebuild.
// The GitHub Actions pipeline writes to public/products.json and Netlify redeploys.

/** @returns {Promise<{ watches: object[], categories: string[] }>} */
export async function fetchProducts() {
  const res = await fetch('/products.json');
  if (!res.ok) throw new Error(`Failed to load products.json: ${res.status}`);
  return res.json();
}
