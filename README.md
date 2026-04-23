# Binary Ocean

A one-person studio in Phnom Penh. Games by passion, apps by design.

Source for [binaryocean.dev](https://binaryocean.dev) (planned).

## Structure

```
.
├── index.html           Page markup
├── assets/
│   ├── styles.css       All styles (light + dark themes)
│   ├── theme.js         Theme toggle + system-preference detection
│   └── flip.js          Per-letter flip-clock hero animation
├── TECH_DEBT.md         Known gaps, ready-to-paste GitHub issues
├── LICENSE              MIT
└── .gitignore
```

## Run locally

No build step. Any static file server:

```bash
python3 -m http.server 8000
# or
npx serve
```

Open http://localhost:8000.

## Deploy

### Cloudflare Pages (recommended — free)

1. Push this repo to GitHub.
2. Go to [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages) → **Create → Connect to Git**.
3. Select the repo. Build command: *(empty)*. Build output directory: `/`.
4. Deploy. You'll get `binary-ocean.pages.dev`.
5. When you buy `binaryocean.dev`, point the DNS at the Pages project.

### Netlify / Vercel

Same flow — connect repo, no build command, publish directory is the root.

## Analytics

Cloudflare Web Analytics is wired in `index.html` as a commented-out snippet.
Create a project at [dash.cloudflare.com → Analytics → Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics), copy the token, paste it where `TOKEN_HERE` is, uncomment the `<script>`. Free, unlimited, no cookie banner.

## License

MIT — see [LICENSE](./LICENSE).
