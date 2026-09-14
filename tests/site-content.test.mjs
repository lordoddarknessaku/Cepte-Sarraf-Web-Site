import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');

for (const page of ['index.html', 'ozellikler.html']) {
  test(`${page}: illustrative prices are labelled`, () => {
    assert.match(read(page), /Örnek değer — canlı fiyat değildir/);
    assert.doesNotMatch(read(page), /<small>Tahmini değer<\/small>/);
  });
}

test('all interactive pages use a bundleable module entry', () => {
  for (const page of ['index', 'ozellikler', 'hakkimizda', 'blog', 'iletisim', 'gizlilik', 'kullanim-kosullari', 'kvkk', 'cerez']) {
    assert.match(read(`${page}.html`), /<script type="module" src="script\.js"><\/script>/);
  }
});

test('homepage shows a captured application screen and verified user flow', () => {
  const html = read('index.html');
  for (const text of ['cepte-sarraf-uygulama-ekrani.png', 'yerel Flutter web derlemesinden', 'Piyasa ve hesaplama sekmeleri aynı fiyat anlık görüntüsünü kullanır', 'Sepeti ve işlemi yönet']) {
    assert.ok(html.includes(text), `Missing product experience detail: ${text}`);
  }
});

test('features explain the verified mobile product catalogue', () => {
  const html = read('ozellikler.html');
  for (const text of ['22 Ayar 1 Gram', '24 Ayar 1 Gram', '8, 14 ve 18 ayar takı', '22 ayar bilezik', 'Yeni ve eski çeyrek', 'Ata altın', 'adet bazlı', 'gram bazlı']) {
    assert.ok(html.includes(text), `Missing product detail: ${text}`);
  }
});

test('demo form prevents submission and does not claim a saved request', () => {
  const status = { textContent: '', style: {} };
  let submit;
  let ready;
  const form = {
    addEventListener: (event, callback) => { if (event === 'submit') submit = callback; },
    querySelector: () => status,
  };
  runInNewContext(read('script.js'), {
    localStorage: { getItem: () => null },
    window: {},
    document: {
      documentElement: { setAttribute() {}, classList: { contains: () => false, remove() {} } },
      querySelectorAll: (selector) => selector === '[data-demo-form]' ? [form] : [],
      querySelector: () => null,
      getElementById: () => null,
      addEventListener: (event, callback) => { if (event === 'DOMContentLoaded') ready = callback; },
    },
  });
  ready();
  let prevented = false;
  submit({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.match(status.textContent, /Bilgileriniz gönderilmedi/);
  assert.match(status.textContent, /kayıt oluşturulmadı/);
  assert.doesNotMatch(status.textContent, /Talebiniz alındı/);
});
