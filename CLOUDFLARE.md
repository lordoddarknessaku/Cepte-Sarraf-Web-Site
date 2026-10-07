# Cloudflare'de yayin

Site Cloudflare Workers Static Assets ile yayinlanir (ucretsiz plan, sunucu yok).

- `npm ci && npm run build` -> `dist/`
- `npx wrangler deploy` -> `wrangler.jsonc` icindeki `cepte-sarraf-web` Worker'i (ceptesarraf.com + www.ceptesarraf.com)
- Guvenlik basliklari: `public/_headers`
- Davranis eski `nginx.production.conf` ile ayni: `/sayfa` -> `sayfa.html`, `/sayfa.html` -> `/sayfa`, bulunamayan adres -> `404.html`

Windows'ta tek komut: `C:\cepte_sarraf_pro\canliya-al.ps1`
