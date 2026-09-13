import React from 'react';
import { Search, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import { CepteSarrafLogo } from './CepteSarrafLogo';

interface HowItWorksProps {
  onStartClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartClick }) => {
  const steps = [
    {
      num: '1',
      icon: Search,
      title: 'Takip Et & Ürünü Seç',
      desc: 'Canlı Kapalıçarşı ve serbest piyasa altın kurlarını inceleyin. Hesaplamak istediğiniz bilezik, takı veya sarrafiye ürününü seçin.',
      detail: '22 ayar burma bilezikten çeyrek veya ata liraya kadar tüm ürünler anlık güncellenir.'
    },
    {
      num: '2',
      icon: Sliders,
      title: 'Miktarı Belirle',
      desc: 'Ürünün türüne göre gramajını veya adet miktarını girin. Hassas kaydırıcı ve hazır butonlarla anında belirleyin.',
      detail: '0.1 gram hassasiyetinde bilezik/takı veya adetli çeyrek/yarım altın girişi yapabilirsiniz.'
    },
    {
      num: '3',
      icon: CheckCircle2,
      title: 'Anında Hesapla & Takip Et',
      desc: 'Kuyumcu bozdurma ve satın alma değerlerini şeffafça görün. Sepetinize ekleyin veya fiyat alarmı kurun.',
      detail: 'Kuyumcuya gitmeden önce gerçek değerinizi bilin, hedeflediğiniz fiyata alarm oluşturun.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative bg-[#0d0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Zahmetsiz Deneyim
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            3 Kolay Adımda Sonuca Ulaşın
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Karmaşık altın formüllerini geride bırakın. Çepte Sarraf ile hesaplama doğrudan ve hızlıdır.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-slate-900/70 border border-slate-800 hover:border-amber-500/30 rounded-3xl p-8 text-center flex flex-col items-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-sm"
              >
                {/* Step Connector Line for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[68%] w-[64%] h-[2px] bg-gradient-to-r from-amber-500/40 to-transparent z-0 pointer-events-none" />
                )}

                {/* Step Number & Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6 group-hover:scale-105 transition-transform">
                  <Icon size={26} />
                </div>

                <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mb-1.5">
                  Adım {step.num}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {step.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-800/80 w-full text-xs text-slate-400">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA with Mascot */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <CepteSarrafLogo variant="icon" size="sm" />
            <span className="text-xs text-slate-400">
              Hemen canlı demo üzerinde test edin:
            </span>
          </div>
          <button
            onClick={onStartClick}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Canlı Hesaplayıcıya Git</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};
