import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Scale, 
  Bell, 
  TrendingUp, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone
} from 'lucide-react';
import { CepteSarrafLogo } from './CepteSarrafLogo';
import { GOLD_PRODUCTS } from '../data/goldData';

interface HeroProps {
  onStartClick: () => void;
  onHowItWorksClick: () => void;
  onOpenAlertModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onStartClick, 
  onHowItWorksClick,
  onOpenAlertModal 
}) => {
  const [activePhoneTab, setActivePhoneTab] = useState<'prices' | 'quickCalc' | 'bag'>('quickCalc');
  const [miniGram, setMiniGram] = useState<number>(20);

  // Quick calc in phone screen
  const bilezikPrice = 3120;
  const quickResult = miniGram * bilezikPrice;

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden flex items-center justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[600px] bg-gradient-to-b from-blue-600/15 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-[-150px] w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge with Mascot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-bold mb-6 shadow-md shadow-amber-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Altın hesabınız cebinizde • Çepte Sarraf</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-white">
              Altın ve Takı <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Hesaplamalarını
              </span>{' '}
              <br className="hidden sm:inline" />
              Kolaylaştıran Asistan
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Bilezikten çeyrek altına, gram ve adet bazlı akıllı hesaplama, anlık Kapalıçarşı piyasa takibi, portföy sepeti ve hedef fiyat alarmları tek bir mobil deneyimde.
            </p>

            {/* Mascot Interactive greeting in hero */}
            <div className="mb-8 p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-amber-950/30 border border-blue-500/20 max-w-xl mx-auto lg:mx-0 flex items-center gap-3.5 shadow-lg">
              <CepteSarrafLogo variant="icon" size="sm" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-amber-300">Sarraf Usta:</span>{' '}
                "Kuyumcuya gitmeden önce elinizdeki altının güncel bozdurma değerini saniyeler içinde şeffafça öğrenin!"
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                id="hero-calculate-btn"
                onClick={onStartClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>Hemen Hesapla (Canlı Demo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-howitworks-btn"
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-amber-400/50 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Nasıl Çalışır?</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl md:text-3xl font-black text-white">12+</div>
                <div className="text-xs text-slate-400 mt-0.5">Altın & Takı Türü</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-amber-400">100K+</div>
                <div className="text-xs text-slate-400 mt-0.5">Mobil Kullanıcı</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-emerald-400">%100</div>
                <div className="text-xs text-slate-400 mt-0.5">Şeffaf Hesaplama</div>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Mockup with Interactive App Preview */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0">
            <div className="relative">
              
              {/* Floating Badge 1 (Top Right) - Mascot Speech */}
              <div className="absolute -top-6 -right-6 md:-right-10 z-20 bg-slate-900/95 border border-amber-500/40 rounded-2xl p-3 backdrop-blur-xl shadow-2xl shadow-black/60 hidden sm:flex items-center gap-3 animate-bounce duration-1000">
                <CepteSarrafLogo variant="icon" size="sm" />
                <div>
                  <div className="text-xs font-bold text-white">22 Ayar Bilezik</div>
                  <div className="text-[11px] font-black text-emerald-400">₺3.120 / gram hesaplandı</div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Left) - Price Alert */}
              <div className="absolute -bottom-6 -left-6 md:-left-10 z-20 bg-slate-900/95 border border-blue-500/40 rounded-2xl p-3 backdrop-blur-xl shadow-2xl shadow-black/60 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Bell size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Fiyat Alarmı Aktif</div>
                  <div className="text-[11px] font-bold text-amber-300">Çeyrek: ₺5.265 hedefi</div>
                </div>
              </div>

              {/* Phone Frame */}
              <div className="w-[310px] sm:w-[325px] h-[630px] bg-[#10131d] rounded-[48px] border-[4px] border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col p-3 ring-1 ring-white/10">
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full bg-[#141824] rounded-[38px] p-4 pt-7 flex flex-col justify-between overflow-hidden border border-slate-800/80">
                  {/* Phone Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <CepteSarrafLogo variant="icon" size="sm" />
                        <div>
                          <div className="text-[11px] font-black text-white flex items-center gap-1">
                            ÇEPTE SARRAF
                          </div>
                          <div className="text-[9px] text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Kapalıçarşı Canlı
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={onOpenAlertModal}
                        className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400"
                        title="Alarm Kur"
                      >
                        <Bell size={13} />
                      </button>
                    </div>

                    {/* App Tabs inside phone */}
                    <div className="flex bg-slate-950/80 p-1 rounded-xl mb-3 border border-slate-800 text-[10px]">
                      <button
                        onClick={() => setActivePhoneTab('quickCalc')}
                        className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                          activePhoneTab === 'quickCalc'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Hesapla
                      </button>
                      <button
                        onClick={() => setActivePhoneTab('prices')}
                        className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                          activePhoneTab === 'prices'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Piyasa
                      </button>
                      <button
                        onClick={() => setActivePhoneTab('bag')}
                        className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                          activePhoneTab === 'bag'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Sepetim
                      </button>
                    </div>
                  </div>

                  {/* Phone Screen Dynamic View */}
                  <div className="flex-1 overflow-hidden flex flex-col justify-start">
                    {activePhoneTab === 'quickCalc' && (
                      <div className="space-y-2.5">
                        {/* Selected Product Card */}
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/15 to-slate-900 border border-amber-500/30">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                            <span>Seçilen Ürün</span>
                            <span className="text-amber-400 font-bold">22 Ayar Bilezik</span>
                          </div>
                          <div className="text-xs font-bold text-white">Gramaj Seçimi: {miniGram} gr</div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            step="1"
                            value={miniGram}
                            onChange={(e) => setMiniGram(parseInt(e.target.value))}
                            className="w-full mt-2 accent-amber-400 cursor-pointer h-1.5"
                          />
                        </div>

                        {/* Calculation Output */}
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                          <div className="text-[10px] text-slate-400">Kuyumcu Alış (Bozdurma) Değeri</div>
                          <div className="text-xl font-black text-emerald-400 mt-0.5">
                            ₺{(miniGram * 2985.2).toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                          </div>
                          <div className="text-[9px] text-slate-500 mt-1">
                            Vitrin Satış Değeri: ₺{quickResult.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                          </div>
                        </div>

                        {/* Direct Action */}
                        <button
                          onClick={onStartClick}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center gap-1 shadow-md"
                        >
                          <Calculator size={13} />
                          <span>Tam Hesaplayıcıyı Aç</span>
                        </button>
                      </div>
                    )}

                    {activePhoneTab === 'prices' && (
                      <div className="space-y-1.5 overflow-y-auto max-h-[320px] pr-1">
                        {GOLD_PRODUCTS.slice(0, 5).map((p) => (
                          <div
                            key={p.id}
                            className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-[11px]"
                          >
                            <div>
                              <div className="font-bold text-white">{p.shortName}</div>
                              <div className="text-[9px] text-slate-400">
                                Alış: ₺{p.buyPrice.toLocaleString('tr-TR')}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-extrabold text-amber-300">
                                ₺{p.sellPrice.toLocaleString('tr-TR')}
                              </div>
                              <div className="text-[9px] font-bold text-emerald-400">
                                +%{p.changeRate}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activePhoneTab === 'bag' && (
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Kayıtlı Altınlarım</div>
                          <div className="text-lg font-black text-emerald-400">₺110.795</div>
                          <div className="text-[9px] text-slate-400">3 Farklı Altın & Takı</div>
                        </div>

                        <div className="space-y-1 text-[10px]">
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                            <span className="text-slate-300">25 gr 22 Ayar Bilezik</span>
                            <span className="font-bold text-emerald-400">₺74.630</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                            <span className="text-slate-300">4 Adet Çeyrek Altın</span>
                            <span className="font-bold text-emerald-400">₺20.780</span>
                          </div>
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                            <span className="text-slate-300">8.5 gr 14 Ayar Kolye</span>
                            <span className="font-bold text-emerald-400">₺15.385</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Bottom Nav Bar */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-slate-500 text-[10px]">
                    <span className="text-amber-400 font-bold flex flex-col items-center">
                      <Calculator size={12} />
                      Hesapla
                    </span>
                    <span className="flex flex-col items-center hover:text-slate-300">
                      <Scale size={12} />
                      Piyasa
                    </span>
                    <span className="flex flex-col items-center hover:text-slate-300">
                      <ShoppingBag size={12} />
                      Sepet
                    </span>
                    <span className="flex flex-col items-center hover:text-slate-300">
                      <Bell size={12} />
                      Alarm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
