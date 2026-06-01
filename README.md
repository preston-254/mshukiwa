# Mshukiwa — Marketing website

Standalone static site for the **Mshukiwa** app. This folder is **not** part of the game build — copy or zip it and host it anywhere.

## What's included

| File | Purpose |
|------|---------|
| `index.html` | Landing page with Google Play + App Store (coming soon) buttons |
| `privacy-policy.html` | Privacy policy (required for Play Console / App Store) |
| `site-config.js` | **Edit store URLs here** |
| `css/styles.css` | Styles |
| `assets/app-icon.png` | App icon used on the site |
| `assets/google-play-badge.png` | Official Google Play badge |
| `assets/app-store-badge.svg` | Official App Store badge |
| `assets/icons/*.svg` | Feature & step icons |
| `js/effects.js` | Anti-gravity particles + mouse parallax |
| `js/site.js` | Store link wiring from config |

## Quick start (preview locally)

Open `index.html` in a browser, or run a simple server:

```bash
# Python
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy

Upload the **entire folder** to any static host, for example:

- **Netlify** — drag the folder onto netlify.com/drop
- **GitHub Pages** — push to a repo and enable Pages on the `main` branch
- **Cloudflare Pages** — connect repo or direct upload
- **Any web host** — upload via FTP/cPanel to `public_html`

No build step required.

## Update store links

Edit `site-config.js`:

```js
window.MSHUKIWA_SITE = {
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.techheart.mshukiwa",
  appStoreUrl: "", // paste Apple link when iOS is live
  contactEmail: "infotechheart254@gmail.com",
};
```

When `appStoreUrl` is set, the App Store button on the homepage becomes a live link automatically.

## Play Console

Use your hosted privacy policy URL in Google Play:

**Store presence → App content → Privacy policy**

Example: `https://yourdomain.com/privacy-policy.html`

### AdMob app-ads.txt (required for ad verification)

Upload `app-ads.txt` from this folder to the **root** of the same domain you set as your **Developer website** in Google Play Console (**Store settings → Store listing contact details → Website**).

The file must be reachable at:

`https://yourdomain.com/app-ads.txt`

Current contents (publisher ID from your AdMob account):

```
google.com, pub-4688202910099181, DIRECT, f08c47fec0942fa0
```

After deploying, open AdMob → **Apps → Mshukiwa (Android) → app-ads.txt** and click **Check for updates**. Crawling can take a few minutes (sometimes up to 24 hours).

The domain in Play Console must **exactly** match where you host this file (including `www` vs non-`www`).

## Extract / move elsewhere

Zip this folder and move it out of the game project:

```
mshukiwa-website/
├── index.html
├── privacy-policy.html
├── site-config.js
├── css/
│   └── styles.css
├── assets/
│   └── app-icon.png
└── README.md
```

Nothing in this folder depends on the game codebase.
