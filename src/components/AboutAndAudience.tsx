import React from 'react';
import { Users, AlertCircle, CheckCircle2, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { CepteSarrafLogo } from './CepteSarrafLogo';

export const AboutAndAudience: React.FC = () => {
  const targetAudiences = [
    {
      title: 'Düğün ve Hediye Takılarını Hesaplayanlar',
      desc: 'Düğünden, nişandan veya özel günlerden kalan bilezik, çeyrek ve kolyelerin toplam değerini tek tek hesaplamak yerine tek sepette toplayın.',
    },
    {
      title: 'Bileziğinin Gerçek Değerini Merak Edenler',
      desc: '22, 18 veya 14 ayar takılarınızın kuyumcuya götürüldüğünde ne kadar edeceğini (hurda değerini) kuyumcuya gitmeden önce öğrenin.',
    },
    {
      title: 'Düzenli Altın Birikimi Yapanlar',
      desc: 'Her ay maaşından gram veya çeyrek altın alanlar için kurlar, fiyat alarmları ve toplam varlık takibi tek ekranda.',
    },
    {
      title: 'Kuyumcu Alışverişi Öncesi Fiyat Kıyaslayanlar',
      desc: 'Kapalıçarşı serbest piyasa alış ve satış makasını bilerek kuyumcu vitrinine daha bilinçli ve şeffaf adımlarla yaklaşın.',
    },
  ];

  const whatItIsNot = [
    {
      title: 'Çepte Sarraf bir kuyumcu değildir.',
      desc: 'Uygulama üzerinden fiziksel altın satışı yapılmaz, kullanıcılardan fiziki altın teslim alınmaz. Amacımız tamamen dijital hesaplama ve fiyat takibidir.',
    },
    {
      title: 'Yatırım tavsiyesi (YTD) sunmaz.',
      desc: 'Uygulamada yer alan piyasa verileri ve hesaplamalar bilgilendirme amaçlıdır. Kullanıcıların finansal alım-satım kararlarını yönlendirici tavsiye niteliği taşımaz.',
    },
    {
      title: 'Kullanıcılardan komisyon veya gizli ücret talep etmez.',
      desc: 'Çepte Sarraf, kullanıcının cebindeki dijital asistanıdır. Hesaplama motoru, sepet oluşturma ve alarm özellikleri ücretsiz ve şeffaftır.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0f] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake size={14} />
            <span>Şeffaflık & Amacımız</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Çepte Sarraf Kimler İçin? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Ne Amaçla Geliştirildi?
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
            Kullanıcının doğru hesaplamaya en az adımla, doğrudan ve tarafsız şekilde ulaşmasını hedefleyen dijital yol arkadaşınız.
          </p>
        </div>

        {/* 2 Column Layout: "Kimler İçin?" vs "Ne Değildir?" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Kimler İçin? */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-3xl p-8 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Çepte Sarraf Kimler İçin?</h3>
                  <p className="text-xs text-slate-400">Günlük hayatında altınla temas eden herkes için</p>
                </div>
              </div>

              <div className="space-y-4">
                {targetAudiences.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <CepteSarrafLogo variant="icon" size="sm" />
              <span>Cebinizde her an yanınızda olan güvenilir altın rehberi.</span>
            </div>
          </div>

          {/* Column 2: Ne Değildir? (Şeffaflık & Sorumluluk Reddi) */}
          <div className="lg:col-span-6 bg-slate-900/60 rounded-3xl p-8 border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Çepte Sarraf Ne Değildir?</h3>
                  <p className="text-xs text-slate-400">Şeffaf ilkelerimiz ve net sınırlarımız</p>
                </div>
              </div>

              <div className="space-y-4">
                {whatItIsNot.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-center gap-3 text-xs text-blue-200">
              <Eye className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>
                <strong>Temel Felsefe:</strong> Bilgiye ulaşmayı sadeleştirmek, kuyumcu ve altın piyasasını herkes için anlaşılır kılmaktır.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
