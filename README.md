# Seekers Quest

Official company website featuring ArrowsBlock Blast!+. Dependency-free static HTML/CSS, with original game artwork and trailer. Target domain: https://get-set-go.in.

## Preview

Run `python3 -m http.server 8080` in this directory, then visit http://localhost:8080.

## Publish with GitHub Pages

In repository Settings → Pages, select **Deploy from a branch**, then **main / (root)** and Save. Set the custom domain to `get-set-go.in`. Enable Enforce HTTPS when the certificate is ready.

At the domain registrar, configure the following DNS records (preserve email-related MX/TXT records):

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | mdazhar26.github.io |

Replace conflicting web-hosting A/AAAA records for the apex. DNS propagation and HTTPS provisioning may take up to 24 hours. Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Content

Game information is based on the current ArrowsBlock Blast!+ source: seven games and 35 app language options. The home page includes collection artwork, a scalable language illustration, and an actual Sudoku screenshot. No unverified store availability, download links, ratings, reviews, or advertising claims are published. The privacy policy is hosted locally at `privacy-policy.html`; support uses the game's existing email address. Add verified store URLs when available. The legacy arrow-only trailer is not presented on the collection home page. All assets are served locally; no analytics or external fonts are loaded.
