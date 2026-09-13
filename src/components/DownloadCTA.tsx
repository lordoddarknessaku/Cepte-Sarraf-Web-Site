import React, { useState } from 'react';
import { Smartphone, QrCode, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { CepteSarrafLogo } from './CepteSarrafLogo';

export const DownloadCTA: React.FC = () => {
  const [showQrModal, setShowQrModal] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  const handleStoreClick = (store: 'App Store' | 'Google Play') => {
    setShowQrModal(store);
    setSmsSent(false);
  };

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setSmsSent(true);
      setTimeout(() => {
        setPhoneNumber('');
      }, 2500);
    }
  };

  return (
    <section id="download" className="py-24 md:py-36 relative overflow-hidden bg-[#0a0a0f] border-t border-slate-800/80">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mascot Mascot Card */}
        <div className="mb-10 flex flex-col items-center justify-center">
          <CepteSarrafLogo variant="mascot" size="lg" />
          <div className="mt-4 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
            "Altın hesabınızı cebinize taşıyın!"
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Çepte Sarraf’ı <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Hemen Ücretsiz İndirin
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Kuyumcuya gitmeden önce değerinizi bilin, fiyat alarmları ile fırsatları kaçırmayın. iOS ve Android cihazlar için hazır.
          </p>

          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            {/* App Store Button */}
            <button
              id="download-appstore-btn"
              onClick={() => handleStoreClick('App Store')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-4 px-6 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400 rounded-2xl text-white shadow-xl shadow-black/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <span className="text-3xl">🍎</span>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-amber-300">
                  İndir
                </div>
                <div className="text-base font-extrabold text-white">
                  App Store
                </div>
              </div>
            </button>

            {/* Google Play Button */}
            <button
              id="download-googleplay-btn"
              onClick={() => handleStoreClick('Google Play')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-4 px-6 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400 rounded-2xl text-white shadow-xl shadow-black/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <span className="text-3xl">🤖</span>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-amber-300">
                  Edinin
                </div>
                <div className="text-base font-extrabold text-white">
                  Google Play
                </div>
              </div>
            </button>
          </div>

          {/* Features Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400 mb-12">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              %100 Ücretsiz
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Reklamsız & Sade Arayüz
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Canlı Kapalıçarşı Verileri
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-amber-400" />
              Kişisel Veri İstemez
            </span>
          </div>

          {/* SMS Link Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg mx-auto backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2 text-white font-bold text-sm">
              <Smartphone size={16} className="text-amber-400" />
              <span>İndirme Bağlantısını Telefonunuza Gönderin</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Numaranızı girin, Çepte Sarraf mobil indirme linkini SMS ile anında iletelim.
            </p>

            <form onSubmit={handleSendSms} className="flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                placeholder="0 (5XX) XXX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                Gönder
              </button>
            </form>

            {smsSent && (
              <div className="mt-3 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
                <CheckCircle2 size={14} />
                <span>İndirme bağlantısı telefonunuza başarıyla iletildi!</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <QrCode size={24} />
            </div>

            <h3 className="text-xl font-black text-white mb-1">
              {showQrModal} ile İndirin
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Kameranızı aşağıdaki QR koda tutarak uygulamayı anında yükleyebilirsiniz.
            </p>

            {/* Custom SVG QR Code with Mascot in center */}
            <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto mb-6 flex flex-col items-center justify-center relative shadow-lg">
              <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                {/* Simulated QR blocks */}
                <rect x="5" y="5" width="28" height="28" fill="black" rx="3" />
                <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
                <rect x="13" y="13" width="12" height="12" fill="black" rx="1" />

                <rect x="67" y="5" width="28" height="28" fill="black" rx="3" />
                <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
                <rect x="75" y="13" width="12" height="12" fill="black" rx="1" />

                <rect x="5" y="67" width="28" height="28" fill="black" rx="3" />
                <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
                <rect x="13" y="75" width="12" height="12" fill="black" rx="1" />

                <rect x="38" y="10" width="8" height="8" fill="black" />
                <rect x="50" y="15" width="10" height="6" fill="black" />
                <rect x="38" y="24" width="6" height="10" fill="black" />
                <rect x="48" y="26" width="12" height="8" fill="black" />

                <rect x="10" y="38" width="8" height="8" fill="black" />
                <rect x="22" y="42" width="10" height="10" fill="black" />
                <rect x="68" y="38" width="8" height="14" fill="black" />
                <rect x="80" y="45" width="12" height="8" fill="black" />

                <rect x="38" y="68" width="10" height="10" fill="black" />
                <rect x="52" y="65" width="8" height="14" fill="black" />
                <rect x="68" y="72" width="12" height="8" fill="black" />
                <rect x="84" y="68" width="8" height="12" fill="black" />
                <rect x="72" y="84" width="14" height="8" fill="black" />
              </svg>

              {/* Logo in center */}
              <div className="absolute inset-0 m-auto w-10 h-10 bg-slate-900 border-2 border-amber-400 rounded-xl flex items-center justify-center p-1 shadow-md">
                <CepteSarrafLogo variant="icon" size="sm" />
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
