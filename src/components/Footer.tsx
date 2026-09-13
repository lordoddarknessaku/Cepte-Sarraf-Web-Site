import React from 'react';
import { CepteSarrafLogo } from './CepteSarrafLogo';
import { Scale, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#08090f] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <CepteSarrafLogo variant="full" size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-5">
              Altın ve takı hesaplamalarını kolaylaştıran dijital yardımcı. Gramdan adete, bilezikten çeyrek altına anlık, şeffaf ve güvenilir piyasa takibi.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Kapalıçarşı & Serbest Piyasa Verileri</span>
            </div>
          </div>

          {/* Kolay Erişim */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Canlı Altın Hesaplayıcı
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('market')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Piyasa Fiyat Tablosu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Özellikler
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Nasıl Çalışır?
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Kimler İçin?
                </button>
              </li>
            </ul>
          </div>

          {/* Altın Çeşitleri */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Popüler Altınlar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  22 Ayar Bilezik Değeri
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Gram Has Altın (24K)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Çeyrek & Yarım Altın
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Ata Lira (Cumhuriyet)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calculator')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  14 & 18 Ayar Takı Değeri
                </button>
              </li>
            </ul>
          </div>

          {/* Kurumsal & Yasal */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Kurumsal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Çepte Sarraf Ne Değildir?
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('download')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Mobil Uygulamayı İndir
                </button>
              </li>
              <li>
                <span className="text-slate-500 text-xs block pt-1">
                  Gizlilik ve KVKK Politikası
                </span>
              </li>
              <li>
                <span className="text-slate-500 text-xs block">
                  Kullanıcı Sözleşmesi
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8">
          <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5">
            <Shield size={14} />
            <span>Yasal Bilgilendirme ve Sorumluluk Reddi</span>
          </div>
          <p>
            <strong>Çepte Sarraf bir kuyumcu, döviz bürosu veya aracı kurum değildir.</strong> Platformumuz üzerinden fiziksel altın veya kıymetli maden alım-satımı gerçekleştirilmemektedir. Sunulan fiyatlar, serbest piyasa ve Kapalıçarşı genel gösterge kurları olup bilgilendirme ve tahmini hesaplama amaçlıdır. Kuyumculardaki işçilik, model, bölge ve anlık piyasa koşullarına göre nihai fiyatlar farklılık gösterebilir. Uygulama içeriği yatırım tavsiyesi (YTD) niteliğinde değildir.
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CepteSarrafLogo variant="icon" size="sm" />
            <span>© {currentYear} Çepte Sarraf. Tüm hakları saklıdır.</span>
          </div>
          <div className="text-slate-400">
            Altın hesabınız cebinizde güvenle.
          </div>
        </div>

      </div>
    </footer>
  );
};
