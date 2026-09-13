import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';
import { CepteSarrafLogo } from './CepteSarrafLogo';

export const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 't1',
      stars: 5,
      text: 'Düğünümüzden kalan 22 ayar burma bilezikleri ve çeyrekleri tek tek hesaplamak dertti. Çepte Sarraf’ın sepet özelliğine hepsini girdim, anında toplam bozdurma değerini verdi. Kuyumcuya gittiğimde de birebir aynı rakam çıktı!',
      author: 'Merve & Kaan Aksoy',
      role: 'Yeni Evli Çift, İstanbul',
      avatarInitials: 'MK',
    },
    {
      id: 't2',
      stars: 5,
      text: 'Maaşımdan her ay düzenli çeyrek ve gram altın alarak birikim yapıyorum. Fiyat alarmı özelliği sayesinde altın düştüğünde anında telefonuma bildirim geldi ve tam hedeflediğim fiyattan alım yapabildim. Arayüzü çok sade ve hızlı.',
      author: 'Serkan Güler',
      role: 'Yazılım Mühendisi, Ankara',
      avatarInitials: 'SG',
    },
    {
      id: 't3',
      stars: 5,
      text: 'Annemin eski 14 ve 18 ayar takılarını değerlendirmek istiyorduk. Kuyumcuya gitmeden önce hurda değerini bilmek bize inanılmaz güven verdi. Şeffaf ve hiçbir gizli yanı olmayan harika bir uygulama.',
      author: 'Fatma Zehra Yıldız',
      role: 'Öğretmen, İzmir',
      avatarInitials: 'FY',
    },
    {
      id: 't4',
      stars: 5,
      text: 'Kapalıçarşı’daki makas farklarını ve sarrafiye ürünlerini takip etmek için bundan daha pratik bir araç görmedim. Gram ve adet ayrımını kendi otomatik yapıyor, kafa karışıklığı sıfıra iniyor.',
      author: 'Burak Demirtaş',
      role: 'Serbest Muhasebeci, Bursa',
      avatarInitials: 'BD',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            Kullanıcı Deneyimleri
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Altınını Güvenle <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Hesaplayanlar Ne Diyor?
            </span>
          </h2>
          <p className="text-base text-slate-400">
            Binlerce kullanıcı altın ve takı hesaplamalarını Çepte Sarraf ile şeffafça yönetiyor.
          </p>
        </div>

        {/* Testimonials Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-slate-700 group-hover:text-amber-500/40 transition-colors" />
                </div>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800/80">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                  {item.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
