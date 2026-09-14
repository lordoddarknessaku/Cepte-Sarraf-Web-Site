# Cepte Sarraf Web Sitesi

Cepte Sarraf mobil uygulamasını bireysel altın yatırımcılarına tanıtmak için hazırlanan responsive web sitesi prototipi.

## Tasarım yönü

- Güven + uzmanlık + sade mobil teknoloji
- Geleneksel kuyumcu sitesi yerine modern finansal ürün görünümü
- Altın hesaplama, 8/14/18 ayar ve lokal fiyat yaklaşımı ön planda
- Mobil öncelikli responsive yapı
- Kurumsal kimlik daha sonra değiştirilebilsin diye CSS değişkenleriyle esnek tasarım sistemi

## Sayfalar

- `index.html` — Ana sayfa
- `ozellikler.html` — Uygulama özellikleri
- `hakkimizda.html` — Marka yaklaşımı
- `blog.html` — İlk sürüm için “Çok yakında” ekranı
- `iletisim.html` — İletişim formu prototipi
- `gizlilik.html` — Gizlilik politikası taslak alanı
- `kullanim-kosullari.html` — Kullanım koşulları taslak alanı
- `kvkk.html` — KVKK taslak alanı
- `cerez.html` — Çerez politikası taslak alanı
- `404.html` — 404 ekranı

## Teknik notlar

Bu branch şu anda frontend/prototip aşamasıdır. Aşağıdaki işler canlı yayın öncesinde ayrıca bağlanmalıdır:

- Gerçek Google Play URL'si
- Gerçek uygulama ekran görüntüleri
- Kesin logo, renk sistemi ve tipografi
- İletişim formu backend'i ve yönetim paneli kayıt sistemi
- reCAPTCHA veya eşdeğer spam koruması
- Bülten backend'i
- Google Analytics ve Search Console
- Gelişmiş çerez tercih yönetimi
- Nihai KVKK / gizlilik / kullanım koşulları metinleri
- CMS veya özel yönetim paneli
- İngilizce, Arapça (RTL) ve Rusça dil altyapısı

## Yerelde çalıştırma

Site, Vite çok sayfalı statik HTML girişlerini kullanır; `src/App.tsx` mevcut HTML girişine bağlı değildir. Ortak `script.js` modül olarak paketlenir; sayfaları dosya URL'sinden değil HTTP üzerinden açın.

```bash
npm ci --ignore-scripts
npm run dev
node --test tests/site-content.test.mjs
npm run lint
npm run build
npm run preview
```

Ürün açıklamaları mobil uygulamanın `lib/product_catalog.dart` kataloğundaki gram/adet ayrımı ve ürün adlarına dayanır. Gösterilen fiyatlar örnektir; demo formlar sunucuya veri göndermez. Gerçek mağaza yayını doğrulanmadan indirme bağlantısı etkinleştirilmemelidir.

Aşağıdaki alternatif sunucu kaynak HTML dosyalarını sunar; üretim için `dist/` çıktısı kullanılmalıdır.

Örnek:

```bash
python -m http.server 8080
```

Ardından `http://localhost:8080` adresi açılır.
