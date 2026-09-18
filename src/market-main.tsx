import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Bell, CalendarDays, ChevronRight, TrendingUp } from 'lucide-react';
import { GOLD_PRODUCTS } from './data/goldData';
import { FinanceChart, ChartPoint } from './components/FinanceChart';
import './market.css';

const formatCurrency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 });
const chartProduct = GOLD_PRODUCTS.find((product) => product.id === 'gram-24k') ?? GOLD_PRODUCTS[0];

function buildHistory(): ChartPoint[] {
  const today = new Date();
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (13 - index));
    const drift = 1 + ((index - 6) * 0.0018);
    return { date, close: +(chartProduct.sellPrice * drift).toFixed(2) };
  });
}

function MarketDashboard() {
  const chartData = useMemo(buildHistory, []);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [selectedRange, setSelectedRange] = useState('14G');

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;
    const update = () => setChartWidth(element.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const spread = chartProduct.sellPrice - chartProduct.buyPrice;

  return (
    <div className="market-page">
      <header className="market-header">
        <a className="market-brand" href="index.html" aria-label="Cepte Sarraf ana sayfa">
          <span className="market-brand-mark">✦</span>
          <span>Cepte Sarraf<small>ALTIN HESABI CEBİNDE</small></span>
        </a>
        <a className="market-back" href="index.html"><ArrowLeft size={16} /> Ana sayfaya dön</a>
      </header>

      <main className="market-main">
        <section className="market-intro">
          <div>
            <p className="market-eyebrow">04 / PİYASA GÖRÜNÜMÜ</p>
            <h1>Altın değerini <em>tek bakışta</em> takip et.</h1>
            <p className="market-lede">Bu ekran, uygulamadaki piyasa akışının web karşılığıdır. Gösterilen değerler örnek veri niteliğindedir.</p>
          </div>
          <div className="market-status"><span /> Örnek veri · Son güncelleme bugün</div>
        </section>

        <section className="market-summary-grid" aria-label="Gram altın özeti">
          <article className="market-summary-card market-summary-primary">
            <div className="market-summary-label">Gram Altın · 24 Ayar</div>
            <strong>{formatCurrency.format(chartProduct.sellPrice)}</strong>
            <span className="market-positive"><TrendingUp size={15} /> +1,18% bugün</span>
          </article>
          <article className="market-summary-card">
            <div className="market-summary-label">Kuyumcu alışı</div>
            <strong>{formatCurrency.format(chartProduct.buyPrice)}</strong>
            <span>Bozdurma değeri</span>
          </article>
          <article className="market-summary-card">
            <div className="market-summary-label">Makas farkı</div>
            <strong>{formatCurrency.format(spread)}</strong>
            <span>Alış / satış aralığı</span>
          </article>
        </section>

        <section className="market-grid">
          <article className="market-panel market-chart-panel">
            <div className="market-panel-head">
              <div><p className="market-eyebrow">FİYAT GRAFİĞİ</p><h2>Gram Altın</h2></div>
              <div className="market-range" role="group" aria-label="Grafik aralığı">
                {['1G', '7G', '14G'].map((range) => (
                  <button key={range} type="button" className={selectedRange === range ? 'is-active' : ''} onClick={() => setSelectedRange(range)}>{range}</button>
                ))}
              </div>
            </div>
            <div className="market-chart" ref={chartRef}>
              {chartWidth > 0 && <FinanceChart width={chartWidth} height={320} data={chartData} />}
            </div>
            <div className="market-chart-meta"><span><CalendarDays size={14} /> {selectedRange} görünüm</span><span>Kaynak: demo fiyat kataloğu</span></div>
          </article>

          <aside className="market-panel market-watchlist">
            <div className="market-panel-head"><div><p className="market-eyebrow">ÜRÜN KATALOĞU</p><h2>Yakından bak</h2></div><Bell size={18} className="market-muted-icon" /></div>
            <div className="market-product-list">
              {GOLD_PRODUCTS.filter((product) => product.category !== 'ons').slice(0, 6).map((product) => (
                <div className="market-product-row" key={product.id}>
                  <div><strong>{product.shortName}</strong><span>{product.type === 'gram' ? 'Gram bazlı' : 'Adet bazlı'}</span></div>
                  <div className="market-product-price"><strong>{formatCurrency.format(product.sellPrice)}</strong><span>+{product.changeRate.toFixed(2)}%</span></div>
                </div>
              ))}
            </div>
            <a className="market-catalogue-link" href="ozellikler.html">Ürün kataloğunu incele <ChevronRight size={16} /></a>
          </aside>
        </section>

        <p className="market-disclaimer">Bilgilendirme: Fiyatlar temsilidir, canlı piyasa verisi değildir. Gerçek fiyat bağlantısı ve fiyat alarmı servisi backend entegrasyonu sonrasında etkinleştirilecektir.</p>
      </main>
    </div>
  );
}

createRoot(document.getElementById('market-root')!).render(<MarketDashboard />);
