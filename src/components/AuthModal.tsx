import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate completed session
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
      <div
        id="auth-modal-overlay"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#12121a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#f5a623]/15 rounded-full blur-3xl pointer-events-none" />

        <button
          id="close-auth-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {mode === 'login' ? 'Giriş Başarılı!' : 'Hesabınız Oluşturuldu!'}
            </h3>
            <p className="text-sm text-neutral-400 max-w-xs mx-auto">
              {mode === 'login'
                ? 'FinApp yatırım hesabınıza yönlendiriliyorsunuz...'
                : 'Doğrulama bağlantısı e-posta adresinize gönderildi. Hoş geldiniz!'}
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f5a623] to-[#f7c948] text-black font-semibold text-sm hover:opacity-95 transition-opacity"
            >
              Uygulamaya Devam Et
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f5a623] to-[#f7c948] flex items-center justify-center font-extrabold text-black text-sm">
                F
              </div>
              <span className="font-bold text-lg text-white">FinApp</span>
            </div>

            <div className="flex border-b border-white/10 mb-6">
              <button
                id="tab-login"
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
                  mode === 'login' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Giriş Yap
                {mode === 'login' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f5a623]" />
                )}
              </button>
              <button
                id="tab-register"
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
                  mode === 'register' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Hesap Oluştur
                {mode === 'register' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f5a623]" />
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                    <input
                      id="auth-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ahmet Yılmaz"
                      className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#f5a623] transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    id="auth-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#f5a623] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Şifre
                  </label>
                  {mode === 'login' && (
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Şifre sıfırlama bağlantısı için lütfen e-postanızı girin.'); }} className="text-xs text-[#f5a623] hover:underline">
                      Şifremi Unuttum
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    id="auth-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#f5a623] transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-neutral-400">
                <Shield size={14} className="text-[#f5a623] shrink-0" />
                <span>256-bit SSL ve SPK mevzuatına uygun güvenlik standartları</span>
              </div>

              <button
                id="submit-auth-btn"
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#f5a623] to-[#f7c948] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#f5a623]/20 hover:brightness-105 active:scale-[0.99] transition-all"
              >
                <span>{mode === 'login' ? 'Giriş Yap' : 'Hemen Başla'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
