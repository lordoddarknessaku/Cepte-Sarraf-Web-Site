import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { GOLD_PRODUCTS } from '../data/goldData';
import { CepteSarrafLogo } from './CepteSarrafLogo';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
  defaultPrice?: number;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  defaultProduct,
  defaultPrice,
}) => {
  const [selectedProductName, setSelectedProductName] = useState(
    defaultProduct || 'Gram Altın (24 Ayar Has)'
  );
  const [targetPrice, setTargetPrice] = useState<string>(
    defaultPrice ? (defaultPrice * 1.02).toFixed(0) : '3250'
  );
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProd = GOLD_PRODUCTS.find((p) => p.name === selectedProductName) || GOLD_PRODUCTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Fiyat Alarmı Kuruldu!</h3>
            <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
              <strong>{selectedProductName}</strong> fiyatı{' '}
              <span className="text-amber-400 font-bold">
                {parseFloat(targetPrice).toLocaleString('tr-TR')} ₺
              </span>{' '}
              seviyesine {condition === 'above' ? 'ulaştığında' : 'düştüğünde'} bildirim alacaksınız.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <CepteSarrafLogo variant="icon" size="sm" />
              <span className="text-xs font-semibold text-amber-300">
                Çepte Sarraf Fiyat Takipçisi Aktif
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Anlık Fiyat Alarmı Kur</h3>
                <p className="text-xs text-slate-400">Hedef seviyeye ulaşıldığında anında bildirim alın.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Select */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Altın / Sarrafiye Türü
                </label>
                <select
                  value={selectedProductName}
                  onChange={(e) => setSelectedProductName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:border-amber-400 focus:outline-none"
                >
                  {GOLD_PRODUCTS.filter((p) => p.category !== 'ons').map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (Güncel: {p.sellPrice.toLocaleString('tr-TR')} ₺)
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Alarm Koşulu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCondition('above')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                      condition === 'above'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Bu Fiyata Çıkınca (≥)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCondition('below')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                      condition === 'below'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                    <span>Bu Fiyata İnerse (≤)</span>
                  </button>
                </div>
              </div>

              {/* Target Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Hedef Fiyat (₺)
                  </label>
                  <span className="text-xs text-slate-400">
                    Mevcut: {currentProd.sellPrice.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    required
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-black text-white focus:border-amber-400 focus:outline-none"
                    placeholder="Örn: 3250"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    TL
                  </span>
                </div>
              </div>

              {/* Mobile / Notification info */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Bildirim Gönderilecek Telefon / E-posta
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0 (5XX) XXX XX XX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Çepte Sarraf uygulaması yüklüyse bildirim doğrudan telefonunuza anlık gelir.
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-transform active:scale-[0.98]"
              >
                Alarmı Oluştur ve Takibe Başla
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
