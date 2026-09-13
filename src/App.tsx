import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketTicker } from './components/MarketTicker';
import { GoldCalculator } from './components/GoldCalculator';
import { MarketTable } from './components/MarketTable';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import { HowItWorks } from './components/HowItWorks';
import { AboutAndAudience } from './components/AboutAndAudience';
import { Testimonials } from './components/Testimonials';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';
import { PriceAlertModal } from './components/PriceAlertModal';
import { GoldProduct } from './types';

export default function App() {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedAlertProduct, setSelectedAlertProduct] = useState<string | undefined>();
  const [selectedAlertPrice, setSelectedAlertPrice] = useState<number | undefined>();

  const handleOpenAlert = (productName?: string, price?: number) => {
    setSelectedAlertProduct(productName);
    setSelectedAlertPrice(price);
    setAlertModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductToCalc = (product: GoldProduct) => {
    scrollToSection('calculator');
    // The user will see the calculator
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col selection:bg-amber-500/30 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onOpenAlert={() => handleOpenAlert()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive App Mockup & Mascot */}
        <Hero
          onStartClick={() => scrollToSection('calculator')}
          onHowItWorksClick={() => scrollToSection('how-it-works')}
          onOpenAlertModal={() => handleOpenAlert()}
        />

        {/* 2. Realtime Gold Market Ticker */}
        <MarketTicker />

        {/* 3. Core Interactive Calculator & Portfolio Basket */}
        <GoldCalculator />

        {/* 4. Live Market Price Table with Search & Filters */}
        <MarketTable
          onSelectProductToCalc={handleSelectProductToCalc}
          onOpenAlertModal={(name, price) => handleOpenAlert(name, price)}
        />

        {/* 5. Core 6 Features from Çepte Sarraf Specification */}
        <Features />

        {/* 6. Dynamic Metrics & Statistics */}
        <Stats />

        {/* 7. How It Works (3 Simple Steps) */}
        <HowItWorks onStartClick={() => scrollToSection('calculator')} />

        {/* 8. Who Is It For? & What It Is Not (Transparency & Principles) */}
        <AboutAndAudience />

        {/* 9. Real User Reviews */}
        <Testimonials />

        {/* 10. Download Call-to-Action with Store Badges & QR Code */}
        <DownloadCTA />
      </main>

      {/* Footer with Logo, Disclaimers and Links */}
      <Footer />

      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        defaultProduct={selectedAlertProduct}
        defaultPrice={selectedAlertPrice}
      />
    </div>
  );
}
