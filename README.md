# OCR GCSE Business Revision Website

## Why you may see a blank screen on GitHub Pages

If GitHub Pages is serving the **repository source** directly, this app can appear blank because `index.html` points to `src/main.jsx` (which contains JSX and must be built by Vite first).

### Correct deployment method (recommended)

Use the included GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) so Pages serves the built `dist/` output.

1. In GitHub, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually).
4. Wait for workflow **Deploy to GitHub Pages** to finish.

### Technical config already applied

- Router uses `HashRouter` for static hosting route compatibility.
- Vite build uses `base: './'` for project-path asset compatibility.

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```


### CI note

GitHub Actions workflow uses `npm install` (not `npm ci`) so deployment works even if a lock file is not present.
