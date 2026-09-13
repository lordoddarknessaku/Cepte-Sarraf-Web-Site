import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Bell, Calculator, Filter, Sparkles, Scale } from 'lucide-react';
import { GOLD_PRODUCTS } from '../data/goldData';
import { GoldProduct } from '../types';

interface MarketTableProps {
  onSelectProductToCalc: (product: GoldProduct) => void;
  onOpenAlertModal: (productName: string, price: number) => void;
}

export const MarketTable: React.FC<MarketTableProps> = ({
  onSelectProductToCalc,
  onOpenAlertModal,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'sarrafiye' | 'taki' | 'kulce'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = GOLD_PRODUCTS.filter((p) => {
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <section id="market" className="py-20 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Canlı Kapalıçarşı & Serbest Piyasa</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Anlık Altın & Sarrafiye Fiyatları
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              24K has altından 8 ayar hediyelik takılara, çeyrekten Ata Liraya tüm altın ürünlerinde güncel alış, satış ve makas aralıkları.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Altın veya takı ara..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tüm Ürünler ({GOLD_PRODUCTS.length})
          </button>
          <button
            onClick={() => setFilterCategory('sarrafiye')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'sarrafiye'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Sarrafiye & Ziynet (Adet)
          </button>
          <button
            onClick={() => setFilterCategory('taki')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'taki'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Bilezik & Takı (Gram)
          </button>
          <button
            onClick={() => setFilterCategory('kulce')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'kulce'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Has Altın & Külçe
          </button>
        </div>

        {/* Responsive Table */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Ürün & Özellik</th>
                  <th className="py-3.5 px-4 text-right">Alış (Bozdurma)</th>
                  <th className="py-3.5 px-4 text-right">Satış (Vitrin)</th>
                  <th className="py-3.5 px-4 text-right hidden sm:table-cell">Makas Farkı</th>
                  <th className="py-3.5 px-4 text-right">24s Değişim</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredProducts.map((prod) => {
                  const spread = prod.sellPrice - prod.buyPrice;
                  return (
                    <tr
                      key={prod.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Product Name */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-extrabold text-xs flex-shrink-0">
                            {prod.type === 'gram' ? 'gr' : 'ad'}
                          </div>
                          <div>
                            <div className="font-extrabold text-white group-hover:text-amber-300 transition-colors">
                              {prod.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {prod.type === 'gram'
                                ? `${prod.purity * 1000} Milyem Saflık`
                                : `${prod.unitWeightGrams} Gram • 22 Ayar`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Buy Price */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-black text-emerald-400 font-mono">
                          {formatMoney(prod.buyPrice)}
                        </div>
                        <div className="text-[10px] text-slate-500">Net Ele Geçen</div>
                      </td>

                      {/* Sell Price */}
                      <td className="py-4 px-4 text-right">
                        <div className="font-black text-white font-mono">
                          {formatMoney(prod.sellPrice)}
                        </div>
                        <div className="text-[10px] text-slate-500">Kuyumcu Satışı</div>
                      </td>

                      {/* Spread */}
                      <td className="py-4 px-4 text-right hidden sm:table-cell">
                        <span className="font-mono text-xs text-amber-300 font-semibold">
                          {formatMoney(spread)}
                        </span>
                      </td>

                      {/* Change % */}
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center gap-1 font-bold text-xs text-emerald-400 font-mono">
                          <TrendingUp className="w-3 h-3" />
                          +%{prod.changeRate}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onSelectProductToCalc(prod)}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
                            title="Bu ürünü hesaplayıcıda aç"
                          >
                            <Calculator className="w-3 h-3" />
                            <span className="hidden md:inline">Hesapla</span>
                          </button>
                          <button
                            onClick={() => onOpenAlertModal(prod.name, prod.sellPrice)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
                            title="Fiyat Alarmı Kur"
                          >
                            <Bell className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
