# OCR GCSE Business Revision Website

## GitHub Pages deployment fix

This project is configured for GitHub Pages static hosting:

- Uses `HashRouter` so page routing works without server-side rewrites.
- Uses Vite `base: './'` so asset paths resolve correctly on project pages.

If you deploy with GitHub Pages, ensure you upload the **`dist/`** folder output from:

```bash
npm install
npm run build
```

Then publish from the built static files.
