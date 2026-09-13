import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, Download, Calculator, Scale } from 'lucide-react';
import { CepteSarrafLogo } from './CepteSarrafLogo';

interface NavbarProps {
  onOpenAlert: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAlert }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-amber-500/15 shadow-lg shadow-black/60'
          : 'py-4.5 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with App Mascot */}
        <div onClick={() => scrollToSection('hero')}>
          <CepteSarrafLogo variant="full" size="md" />
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => scrollToSection('calculator')}
            className="text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Hesaplayıcı</span>
          </button>
          <button
            onClick={() => scrollToSection('market')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Piyasa Fiyatları
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Özellikler
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Nasıl Çalışır?
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Kimler İçin?
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Yorumlar
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-alert-btn"
            onClick={onOpenAlert}
            className="px-4 py-2.5 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold transition-all duration-200 flex items-center gap-2"
          >
            <Bell size={14} className="text-amber-400" />
            <span>Fiyat Alarmı Kur</span>
          </button>

          <button
            id="nav-download-btn"
            onClick={() => scrollToSection('download')}
            className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Uygulamayı İndir</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAlert}
            className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30"
            title="Alarm Kur"
          >
            <Bell size={18} />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-colors"
            aria-label="Menüyü aç"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 border-b border-slate-800 px-6 py-6 shadow-2xl space-y-4 backdrop-blur-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <CepteSarrafLogo variant="icon" size="sm" />
            <div className="text-xs text-slate-400">
              Altın hesabınız cebinizde. <strong className="text-amber-300">Çepte Sarraf.</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => scrollToSection('calculator')}
              className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-left font-bold text-xs flex items-center gap-2"
            >
              <Calculator size={16} />
              <span>Hesaplayıcı</span>
            </button>
            <button
              onClick={() => scrollToSection('market')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left font-bold text-xs flex items-center gap-2"
            >
              <Scale size={16} />
              <span>Piyasa Fiyatları</span>
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => scrollToSection('features')}
              className="w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              Özellikler
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              Nasıl Çalışır?
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              Kimler İçin? & Ne Değildir?
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              Kullanıcı Yorumları
            </button>
          </div>

          <div className="pt-4 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAlert();
              }}
              className="w-full py-3 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Bell size={16} />
              <span>Fiyat Alarmı Kur</span>
            </button>
            <button
              onClick={() => scrollToSection('download')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Download size={16} />
              <span>Mobil Uygulamayı İndir</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
