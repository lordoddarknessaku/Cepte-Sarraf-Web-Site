import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Scale, 
  Coins, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Bell, 
  Info,
  Check,
  ChevronRight
} from 'lucide-react';
import { GOLD_PRODUCTS, INITIAL_BASKET } from '../data/goldData';
import { GoldProduct, BasketItem } from '../types';
import { CepteSarrafLogo } from './CepteSarrafLogo';

interface GoldCalculatorProps {
  onOpenAlertModal?: (productName: string, price: number) => void;
}

export const GoldCalculator: React.FC<GoldCalculatorProps> = ({ onOpenAlertModal }) => {
  const [calcTab, setCalcTab] = useState<'gram' | 'piece' | 'basket'>('gram');
  
  // Selected products for each tab
  const gramProducts = GOLD_PRODUCTS.filter((p) => p.type === 'gram' && p.category !== 'ons');
  const pieceProducts = GOLD_PRODUCTS.filter((p) => p.type === 'piece');
  
  const [selectedGramProduct, setSelectedGramProduct] = useState<GoldProduct>(gramProducts[1]); // 22 Ayar Bilezik default
  const [gramAmount, setGramAmount] = useState<number>(20.0);
  
  const [selectedPieceProduct, setSelectedPieceProduct] = useState<GoldProduct>(pieceProducts[0]); // Çeyrek default
  const [pieceCount, setPieceCount] = useState<number>(2);

  // Multi-item portfolio basket state
  const [basket, setBasket] = useState<BasketItem[]>(INITIAL_BASKET);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Calculations for Gram tab
  const gramTotalBuy = gramAmount * selectedGramProduct.buyPrice;
  const gramTotalSell = gramAmount * selectedGramProduct.sellPrice;
  const gramSpread = gramTotalSell - gramTotalBuy;

  // Calculations for Piece tab
  const pieceTotalBuy = pieceCount * selectedPieceProduct.buyPrice;
  const pieceTotalSell = pieceCount * selectedPieceProduct.sellPrice;
  const pieceSpread = pieceTotalSell - pieceTotalBuy;

  // Basket totals
  const totalBasketBuy = basket.reduce((acc, item) => acc + item.totalBuy, 0);
  const totalBasketSell = basket.reduce((acc, item) => acc + item.totalSell, 0);

  // Add current calculation to basket
  const addToBasket = (product: GoldProduct, qty: number, unit: 'gram' | 'adet', totalBuy: number, totalSell: number) => {
    const newItem: BasketItem = {
      id: `basket-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      category: product.category,
      quantity: qty,
      unit,
      unitBuyPrice: product.buyPrice,
      unitSellPrice: product.sellPrice,
      totalBuy,
      totalSell,
      addedAt: 'Az önce',
    };

    setBasket([newItem, ...basket]);
    setAddedToast(`${qty} ${unit} ${product.shortName} sepete eklendi!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const removeBasketItem = (id: string) => {
    setBasket(basket.filter((item) => item.id !== id));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-20 md:py-28 relative bg-[#0d0f17] overflow-hidden border-t border-b border-amber-500/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Mascot */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Akıllı Hesaplama Motoru</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Altın ve Takınızı <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Anında & Şeffafça Hesaplayın
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
            İster düğünden kalan bileziğinizin hurda değerini, ister birikim yaptığınız çeyrek altınların güncel karşılığını birkaç dokunuşla öğrenin.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              id="calc-tab-gram"
              onClick={() => setCalcTab('gram')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                calcTab === 'gram'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Gram Bazlı Takı & Bilezik</span>
            </button>

            <button
              id="calc-tab-piece"
              onClick={() => setCalcTab('piece')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                calcTab === 'piece'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Adet Bazlı Sarrafiye</span>
            </button>

            <button
              id="calc-tab-basket"
              onClick={() => setCalcTab('basket')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 relative ${
                calcTab === 'basket'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Altın Çantam (Sepet)</span>
              {basket.length > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  {basket.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Added to Basket Toast Notification */}
        <AnimatePresence>
          {addedToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto mb-6 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{addedToast}</span>
              </div>
              <button
                onClick={() => setCalcTab('basket')}
                className="underline hover:text-white text-xs font-bold"
              >
                Görüntüle
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Calculator Card */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-3xl border border-slate-800/80 shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
          {calcTab === 'gram' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Product selection & Gram Input */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    1. Altın veya Takı Türünü Seçin
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {gramProducts.map((prod) => {
                      const isSelected = selectedGramProduct.id === prod.id;
                      return (
                        <button
                          key={prod.id}
                          id={`select-gram-${prod.id}`}
                          onClick={() => setSelectedGramProduct(prod)}
                          className={`p-3 rounded-2xl text-left border transition-all duration-200 relative ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="text-xs font-bold text-amber-400/90 mb-0.5">
                            {prod.purity * 1000} Milyem
                          </div>
                          <div className="text-sm font-extrabold truncate text-white">
                            {prod.shortName}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            Alış: {formatCurrency(prod.buyPrice)}
                          </div>
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gram input with Stepper & Quick Presets */}
                <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800/60">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      2. Ağırlık / Gram Miktarı
                    </label>
                    <span className="text-xs font-semibold text-amber-400">
                      Hassas Ayar: 0.1 gr
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGramAmount((prev) => Math.max(0.5, +(prev - 1).toFixed(2)))}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-lg transition-colors"
                      title="-1 gram"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <div className="flex-1 relative">
                      <input
                        type="number"
                        id="gram-input-field"
                        min="0.1"
                        max="1000"
                        step="0.1"
                        value={gramAmount}
                        onChange={(e) => setGramAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-2xl font-black text-white text-center tracking-tight focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-400">
                        GRAM
                      </span>
                    </div>

                    <button
                      onClick={() => setGramAmount((prev) => +(prev + 1).toFixed(2))}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-lg transition-colors"
                      title="+1 gram"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Slider for smooth dragging */}
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="0.5"
                    value={Math.min(100, gramAmount)}
                    onChange={(e) => setGramAmount(parseFloat(e.target.value))}
                    className="w-full mt-4 accent-amber-400 cursor-pointer"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs text-slate-500 self-center mr-1">Hızlı Seçim:</span>
                    {[5, 10, 15, 20, 25, 50, 100].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setGramAmount(preset)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          gramAmount === preset
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {preset} gr
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-blue-300 text-xs">
                  <Info className="w-4 h-4 flex-shrink-0 text-blue-400" />
                  <span>
                    <strong>Sarraf Bilgisi:</strong> {selectedGramProduct.description}
                  </span>
                </div>
              </div>

              {/* Right Column: Calculation Result Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Canlı Hesaplama Sonucu
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    {gramAmount} gr {selectedGramProduct.shortName}
                  </span>
                </div>

                {/* Primary Values */}
                <div className="space-y-4">
                  {/* Buy Price (Bozdurma / Kuyumcunun Aldığı) */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Bozdurma Değeri (Kuyumcu Alışı)</span>
                      <span className="text-slate-500 font-mono">
                        {formatCurrency(selectedGramProduct.buyPrice)}/gr
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-emerald-400 tracking-tight">
                      {formatCurrency(gramTotalBuy)}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Kuyumcuya veya sarrafa satarken alacağınız tahmini net tutar.
                    </div>
                  </div>

                  {/* Sell Price (Satın Alma / Vitrin) */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Satın Alma Değeri (Kuyumcu Satışı)</span>
                      <span className="text-slate-500 font-mono">
                        {formatCurrency(selectedGramProduct.sellPrice)}/gr
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {formatCurrency(gramTotalSell)}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Sıfır alırken ödeyeceğiniz tahmini perakende tutar.
                    </div>
                  </div>

                  {/* Spread info */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/40 text-xs text-slate-400 border border-slate-800/40">
                    <span>Alış - Satış Makas Farkı:</span>
                    <span className="font-bold text-amber-300 font-mono">
                      {formatCurrency(gramSpread)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    id="btn-add-gram-basket"
                    onClick={() =>
                      addToBasket(
                        selectedGramProduct,
                        gramAmount,
                        'gram',
                        gramTotalBuy,
                        gramTotalSell
                      )
                    }
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Altın Sepetime Ekle</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenAlertModal?.(
                        selectedGramProduct.name,
                        selectedGramProduct.sellPrice
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bu Fiyat İçin Alarm Oluştur</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {calcTab === 'piece' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Sarrafiye item selection & Piece Count */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    1. Sarrafiye Altınını Seçin
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {pieceProducts.map((prod) => {
                      const isSelected = selectedPieceProduct.id === prod.id;
                      return (
                        <button
                          key={prod.id}
                          id={`select-piece-${prod.id}`}
                          onClick={() => setSelectedPieceProduct(prod)}
                          className={`p-3 rounded-2xl text-left border transition-all duration-200 relative ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="text-xs font-bold text-amber-400/90 mb-0.5">
                            {prod.unitWeightGrams} gr
                          </div>
                          <div className="text-sm font-extrabold truncate text-white">
                            {prod.shortName}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            Alış: {formatCurrency(prod.buyPrice)}
                          </div>
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Piece Stepper */}
                <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800/60">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      2. Kaç Adet Altınınız Var?
                    </label>
                    <span className="text-xs font-semibold text-amber-400">
                      Adet Başı Ağırlık: {selectedPieceProduct.unitWeightGrams} gr
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPieceCount((prev) => Math.max(1, prev - 1))}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-lg transition-colors"
                      title="-1 adet"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <div className="flex-1 relative">
                      <input
                        type="number"
                        id="piece-input-field"
                        min="1"
                        max="1000"
                        step="1"
                        value={pieceCount}
                        onChange={(e) => setPieceCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-2xl font-black text-white text-center tracking-tight focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-400">
                        ADET
                      </span>
                    </div>

                    <button
                      onClick={() => setPieceCount((prev) => prev + 1)}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-lg transition-colors"
                      title="+1 adet"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs text-slate-500 self-center mr-1">Hızlı Seçim:</span>
                    {[1, 2, 3, 5, 10, 20].map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => setPieceCount(cnt)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          pieceCount === cnt
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {cnt} Adet
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200 text-xs">
                  <Info className="w-4 h-4 flex-shrink-0 text-amber-400" />
                  <span>
                    <strong>Toplam Ağırlık:</strong> {pieceCount} adet {selectedPieceProduct.shortName} yaklaşık{' '}
                    <strong>{+(pieceCount * (selectedPieceProduct.unitWeightGrams || 0)).toFixed(2)} gram</strong> saf 22 ayar altına karşılık gelir.
                  </span>
                </div>
              </div>

              {/* Right Column: Piece Calculation Result */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Canlı Sarrafiye Sonucu
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    {pieceCount} Adet {selectedPieceProduct.shortName}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Bozdurma Tutarı (Kuyumcu Alışı)</span>
                      <span className="text-slate-500 font-mono">
                        {formatCurrency(selectedPieceProduct.buyPrice)}/adet
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-emerald-400 tracking-tight">
                      {formatCurrency(pieceTotalBuy)}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Sarraftan nakite çevirdiğinizde elinize geçecek net tutar.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Satın Alma Tutarı (Kuyumcu Satışı)</span>
                      <span className="text-slate-500 font-mono">
                        {formatCurrency(selectedPieceProduct.sellPrice)}/adet
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {formatCurrency(pieceTotalSell)}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Kuyumcudan sıfır adetli satın alım güncel piyasa tutarı.
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/40 text-xs text-slate-400 border border-slate-800/40">
                    <span>Toplam Makas Farkı:</span>
                    <span className="font-bold text-amber-300 font-mono">
                      {formatCurrency(pieceSpread)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    id="btn-add-piece-basket"
                    onClick={() =>
                      addToBasket(
                        selectedPieceProduct,
                        pieceCount,
                        'adet',
                        pieceTotalBuy,
                        pieceTotalSell
                      )
                    }
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Altın Sepetime Ekle</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenAlertModal?.(
                        selectedPieceProduct.name,
                        selectedPieceProduct.sellPrice
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bu Fiyat İçin Alarm Oluştur</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {calcTab === 'basket' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>Altın Çantam (Kişisel Altın & Takı Portföyü)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Farklı gramajdaki bileziklerinizi ve çeyrek/yarım altınlarınızı tek bir sepette birleştirin.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCalcTab('gram')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yeni Ürün Ekle</span>
                  </button>
                  {basket.length > 0 && (
                    <button
                      onClick={() => setBasket([])}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20"
                    >
                      Sepeti Temizle
                    </button>
                  )}
                </div>
              </div>

              {basket.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">Sepetiniz Boş</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Hesaplama sekmelerinden bilezik, çeyrek veya takı ekleyerek portföyünüzün toplam değerini burada görün.
                  </p>
                  <button
                    onClick={() => setCalcTab('gram')}
                    className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Bilezik / Takı Ekle
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {/* Basket Item List */}
                  <div className="divide-y divide-slate-800/80">
                    {basket.map((item) => (
                      <div
                        key={item.id}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/40 px-3 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-sm flex-shrink-0">
                            {item.unit === 'gram' ? 'gr' : 'ad'}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">
                              {item.productName}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2">
                              <span>
                                {item.quantity} {item.unit}
                              </span>
                              <span>•</span>
                              <span className="text-slate-500 font-mono">
                                Alış: {formatCurrency(item.unitBuyPrice)}/{item.unit}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          <div className="text-right">
                            <div className="text-xs text-slate-400">Bozdurma Değeri</div>
                            <div className="text-base font-extrabold text-emerald-400">
                              {formatCurrency(item.totalBuy)}
                            </div>
                          </div>
                          <button
                            onClick={() => removeBasketItem(item.id)}
                            className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Sepetten Çıkar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Portfolio Totals Box */}
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                        Toplam Portföy Değeri ({basket.length} Ürün)
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-emerald-400">
                        {formatCurrency(totalBasketBuy)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Satın Alma (Vitrin) Toplamı:{' '}
                        <span className="text-slate-300 font-semibold">
                          {formatCurrency(totalBasketSell)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          alert(
                            'Portföyünüz kaydedildi! Çepte Sarraf mobil uygulamasında hesabınızla eşitlenecektir.'
                          )
                        }
                        className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                      >
                        <span>Hesaplamayı Kaydet</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mascot Assistant Callout below calculator */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-amber-950/20 border border-blue-500/20 flex items-center gap-4 shadow-lg">
          <div className="flex-shrink-0">
            <CepteSarrafLogo variant="mascot" size="md" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-300">Sarraf Usta'dan Hatırlatma:</span>{' '}
            Altın takılarda işçilik payı yalnızca satın alırken ödenir; bozdururken milyem (ayar) ve net gramaj esas alınır. Çepte Sarraf hesaplayıcısı hurda bozdurma değerinizi Kapalıçarşı canlı verileriyle birebir hesaplar.
          </div>
        </div>
      </div>
    </section>
  );
};
