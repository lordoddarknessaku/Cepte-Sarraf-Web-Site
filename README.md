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

Statik dosyalar doğrudan açılabilir veya basit bir HTTP sunucusu kullanılabilir.

Örnek:

```bash
python -m http.server 8080
```

Ardından `http://localhost:8080` adresi açılır.
