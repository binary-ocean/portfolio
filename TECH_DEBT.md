# Tech Debt

Known gaps in the landing page. Each item below is sized to be a single GitHub issue — copy title + body into a new issue.

---

## 1. Add favicon

**Labels:** `chore`, `polish`

Currently the browser tab shows the default globe. Add:

- [ ] `favicon.svg` (vector, scales to any size) — the teal dot from the brand mark
- [ ] `favicon-32.png` (fallback for older browsers)
- [ ] `apple-touch-icon.png` (180×180)
- [ ] Link them from `<head>` in `index.html`

Reference: [evilmartians.com/favicon](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

---

## 2. Add Open Graph + Twitter card

**Labels:** `chore`, `polish`

When the link is pasted into Slack / X / iMessage, no preview card shows. `<meta>` tags are already in `index.html` as placeholders — need to ship the image.

- [ ] Design 1200×630 OG image (hero type on brand background)
- [ ] Add `og.png` to repo (or `assets/og.png`)
- [ ] Uncomment `<meta property="og:image">` in `index.html`
- [ ] Test with [opengraph.xyz](https://www.opengraph.xyz/)

---

## 3. `<meta name="description">` + robots + sitemap

**Labels:** `seo`

- [x] Description meta tag (already in `index.html`)
- [ ] `robots.txt` allowing all
- [ ] `sitemap.xml` (one URL for now — update when project pages ship)

---

## 4. Populate project pages

**Labels:** `content`

The Work section lists SnapInventory, DUEL, SnapSales, Happy Hour, Kitchen Timer — but every "Read the devlog" / "Get in touch" link points at `#contact` or `#`. When each project has a story to tell:

- [ ] `/snapinventory/` — dashboard screenshots, API highlights, who it's for
- [ ] `/duel/` — devlog, playable build when available
- [ ] Keep design system consistent — same type, same rail pattern

---

## 5. Accessibility pass

**Labels:** `a11y`

- [ ] Verify `aria-label="Games"` / `aria-label="Apps"` propagates to screen readers during flip animation (the `.flip-letters` overlay may be announced as individual letters)
- [ ] Run axe / Lighthouse a11y audit
- [ ] Check color contrast in both light and dark themes (`--mute` against `--bg` is borderline)
- [ ] Confirm `prefers-reduced-motion` disables flip AND predicate cycling (already coded, needs manual test)
- [ ] Add `alt` text to any OG / favicon images

---

## 6. Performance pass

**Labels:** `perf`

- [ ] Preload Geist + JetBrains Mono fonts with `<link rel="preload">`
- [ ] Check font weights actually used — currently loading 5 Geist weights (300/400/500/600/700); may only need 400/500
- [ ] Add `font-display: swap` — wait, already handled by Google Fonts `&display=swap` param. Confirm no FOIT in Safari
- [ ] Lighthouse score target: 100 / 100 / 100 / 100

---

## 7. Analytics

**Labels:** `chore`

- [ ] Create Cloudflare Web Analytics project
- [ ] Drop token into `index.html` (snippet already there, commented out)
- [ ] Verify events land after deploy

---

## 8. Domain + mailbox

**Labels:** `infra`

Not code but necessary before go-live:

- [ ] Register `binaryocean.dev`
- [ ] Set up mailbox for `helloworld@binaryocean.dev` (Fastmail / Google Workspace / Zoho Mail free tier)
- [ ] Point DNS at Cloudflare Pages project
