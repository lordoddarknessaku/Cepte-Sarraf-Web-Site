import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { MarketAsset } from '../types';

export const MarketTicker: React.FC = () => {
  const assets: MarketAsset[] = [
    { symbol: 'GRAM (24K)', name: 'Gram Has Altın', price: '3.214,20 ₺', change: '+1.18%', isPositive: true },
    { symbol: '22 AYAR BİLEZİK', name: '22 Ayar Burma / Takı', price: '3.120,00 ₺', change: '+1.12%', isPositive: true },
    { symbol: 'ÇEYREK ALTIN', name: 'Çeyrek Ziynet', price: '5.265,00 ₺', change: '+1.25%', isPositive: true },
    { symbol: 'YARIM ALTIN', name: 'Yarım Ziynet', price: '10.530,00 ₺', change: '+1.22%', isPositive: true },
    { symbol: 'TAM (ZİYNET)', name: 'Tam Altın', price: '21.020,00 ₺', change: '+1.20%', isPositive: true },
    { symbol: 'ATA LİRA', name: 'Cumhuriyet Altını', price: '21.650,00 ₺', change: '+1.15%', isPositive: true },
    { symbol: '14 AYAR TAKI', name: '14 Ayar Takı', price: '2.040,00 ₺', change: '+0.88%', isPositive: true },
    { symbol: '18 AYAR TAKI', name: '18 Ayar Takı', price: '2.540,00 ₺', change: '+0.95%', isPositive: true },
    { symbol: 'GREMSE (2.5)', name: 'Gremse Altın', price: '52.600,00 ₺', change: '+1.18%', isPositive: true },
    { symbol: 'REŞAT ALTIN', name: 'Reşat Altın', price: '21.820,00 ₺', change: '+1.05%', isPositive: true },
    { symbol: 'ONS ALTIN', name: 'Spot Ons', price: '$2.885,50', change: '+0.62%', isPositive: true },
    { symbol: 'USD / TRY', name: 'Dolar Kuru', price: '36,45 ₺', change: '+0.15%', isPositive: true },
  ];

  return (
    <div className="w-full bg-[#0d0f17] border-y border-amber-500/15 py-2.5 overflow-hidden select-none relative z-20">
      <div className="flex items-center gap-6 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
        {/* Double array for seamless loop */}
        {[...assets, ...assets].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs hover:border-amber-400/40 hover:bg-slate-800/60 transition-colors shadow-sm"
          >
            <span className="font-extrabold text-amber-300 tracking-wide">{item.symbol}</span>
            <span className="text-white font-mono text-[11px] font-bold">{item.price}</span>
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                item.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {item.isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
