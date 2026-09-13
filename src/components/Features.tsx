import React, { useState } from 'react';
import { 
  Calculator, 
  Scale, 
  Coins, 
  BellRing, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { FeatureItem } from '../types';
import { CepteSarrafLogo } from './CepteSarrafLogo';

export const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'smart-calc',
      icon: 'calculator',
      title: 'Akıllı Ürün Hesaplama',
      desc: 'Gram ve adet ayrımını otomatik yönetir. Karışık formüllerle uğraşmadan net tutara ulaştırır.',
      badge: 'Zahmetsiz Formül',
      detail: '22 ayar bilezik gibi gramla satılan ürünler ile çeyrek gibi adetle işlem gören sarrafiye ürünlerini tek dokunuşla ayırt eder ve doğru piyasa fiyatıyla çarpar.'
    },
    {
      id: 'jewelry-valuation',
      icon: 'scale',
      title: 'Takı ve Ayar Değerleme',
      desc: '22, 18, 14 ve 8 ayar takılarınızın kuyumcu bozdurma hurda değerini anında öğrenin.',
      badge: 'Tüm Ayarlar',
      detail: 'Milyem saflık oranlarını (916, 750, 585, 333) canlı has altın kuruyla eşleştirir; vitrin alımı ve hurda bozdurma değerlerini ayrı ayrı şeffafça sunar.'
    },
    {
      id: 'sarrafiye-tracking',
      icon: 'coins',
      title: 'Canlı Sarrafiye Takibi',
      desc: 'Çeyrek, yarım, tam, Ata Lira, Gremse ve Reşat altınların serbest piyasa kurlarını takip edin.',
      badge: 'Kapalıçarşı Canlı',
      detail: 'Darphane basımı tüm sarrafiye altınlarında anlık alış-satış makasını ve günlük yüzdesel değişim oranlarını gecikmesiz ekrana taşır.'
    },
    {
      id: 'price-alerts',
      icon: 'bell',
      title: 'Akıllı Fiyat Alarmları',
      desc: 'Hedeflediğiniz alım veya satım seviyesini belirleyin, fiyat eşleştiğinde anında bildirim alın.',
      badge: 'Anlık Bildirim',
      detail: 'Gram altın veya çeyrek altın belirlediğiniz rakama ulaştığında telefonunuza sesli veya sessiz push bildirimi gönderir; fırsatları kaçırmazsınız.'
    },
    {
      id: 'portfolio-basket',
      icon: 'bag',
      title: 'Altın Çantam (Çoklu Sepet)',
      desc: 'Evdeki veya kasanızdaki farklı takı ve sarrafiyeleri tek bir sepete kaydedin, toplamı görün.',
      badge: 'Portföy Yönetimi',
      detail: 'Örn: 2 adet çeyrek altın + 35 gram 22 ayar bilezik + 1 adet Ata altın ekleyin; toplam piyasa değerini ve günlük kâr/zararınızı tek bakışta izleyin.'
    },
    {
      id: 'favorites-fast',
      icon: 'star',
      title: 'Favoriler ve Hızlı Erişim',
      desc: 'Sık hesapladığınız altın türlerini sabitleyin, her defasında arama yapmaktan kurtulun.',
      badge: 'Tek Dokunuş',
      detail: 'En çok takip ettiğiniz bilezik veya çeyrek altınları listenizin en üstüne taşıyarak tek dokunuşla doğrudan hesaplama ekranına girin.'
    }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'calculator':
        return <Calculator size={22} className="text-amber-400" />;
      case 'scale':
        return <Scale size={22} className="text-amber-400" />;
      case 'coins':
        return <Coins size={22} className="text-amber-400" />;
      case 'bell':
        return <BellRing size={22} className="text-amber-400" />;
      case 'bag':
        return <ShoppingBag size={22} className="text-amber-400" />;
      case 'star':
        return <Star size={22} className="text-amber-400" />;
      default:
        return <Sparkles size={22} className="text-amber-400" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            <span>Neden Çepte Sarraf?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Altın Hesabında <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Kafa Karışıklığına Son
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Farklı ayarlar, işçilikler, gram ve adet karmaşasını ortadan kaldırıyoruz. Çepte Sarraf ihtiyacınız olan net sonuca en kısa yoldan ulaştırır.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {renderIcon(feature.icon)}
                  </div>
                  {feature.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedFeature(feature)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Detaylı İncele</span>
                  <ArrowRight size={14} />
                </button>
                <CepteSarrafLogo variant="icon" size="sm" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
              {renderIcon(selectedFeature.icon)}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{selectedFeature.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedFeature.detail || selectedFeature.desc}
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
