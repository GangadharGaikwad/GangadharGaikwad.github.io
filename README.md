# gangadhargaikwad.me

Personal portfolio of **Gangadhar Gaikwad** — AI & full-stack engineer.
Live at **[gangadhargaikwad.me](https://gangadhargaikwad.me)**.

Static site (HTML + CSS + vanilla JS, no build step) in [`site/`](site/).
It auto-deploys to GitHub Pages on every push to `main` via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Edit
- `site/index.html` — all content
- `site/styles.css` — design tokens + styling
- `site/script.js` — interactions
- `site/Gangadhar-Gaikwad-Resume.pdf` — downloadable résumé (replace with latest)

## Preview locally
```bash
cd site && python -m http.server 8000   # open http://localhost:8000
```

Design system and source history live in the companion repo
[`portfolio-liq`](https://github.com/GangadharGaikwad/portfolio-liq).
