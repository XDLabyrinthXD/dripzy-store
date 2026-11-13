// Product data — sourced from public/products.json (auto-managed by GitHub Actions pipeline)
// Vite resolves /products.json at build time via the public folder.
// The script scripts/auto-add-products.js writes directly to public/products.json.

import data from '../../public/products.json';

export const categories = data.categories;
export default data.watches;
