import React, { useState, useEffect, useRef } from 'react';
import { StatItem } from '../types';

export const Stats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [userCount, setUserCount] = useState(0);
  const [goldTypeCount, setGoldTypeCount] = useState(0);
  const [accuracyRate, setAccuracyRate] = useState(0);
  const [calcCount, setCalcCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate users to 100K
          let u = 0;
          const uStep = 100000 / 40;
          const uTimer = setInterval(() => {
            u += uStep;
            if (u >= 100000) {
              setUserCount(100000);
              clearInterval(uTimer);
            } else {
              setUserCount(Math.floor(u));
            }
          }, 30);

          // Animate gold types to 12
          let g = 0;
          const gTimer = setInterval(() => {
            g += 1;
            if (g >= 12) {
              setGoldTypeCount(12);
              clearInterval(gTimer);
            } else {
              setGoldTypeCount(g);
            }
          }, 80);

          // Animate accuracy to 99.8%
          let a = 0;
          const aStep = 99.8 / 40;
          const aTimer = setInterval(() => {
            a += aStep;
            if (a >= 99.8) {
              setAccuracyRate(99.8);
              clearInterval(aTimer);
            } else {
              setAccuracyRate(parseFloat(a.toFixed(1)));
            }
          }, 30);

          // Animate calculations to 1.5M+
          let cl = 0;
          const clStep = 1500000 / 40;
          const clTimer = setInterval(() => {
            cl += clStep;
            if (cl >= 1500000) {
              setCalcCount(1500000);
              clearInterval(clTimer);
            } else {
              setCalcCount(Math.floor(cl));
            }
          }, 30);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats: StatItem[] = [
    {
      id: 'stat-users',
      value: userCount,
      suffix: '+',
      label: 'İndirme & Kullanıcı',
      subtext: 'Türkiye genelinde',
    },
    {
      id: 'stat-gold-types',
      value: goldTypeCount,
      suffix: '+',
      label: 'Altın & Takı Türü',
      subtext: 'Bilezik, takı ve sarrafiye',
    },
    {
      id: 'stat-accuracy',
      value: accuracyRate,
      suffix: '%',
      label: 'Hesaplama Hassasiyeti',
      subtext: 'Canlı Kapalıçarşı milyemi',
    },
    {
      id: 'stat-calcs',
      value: calcCount,
      suffix: '+',
      label: 'Aylık Yapılan Hesaplama',
      subtext: 'Güvenle sonuca ulaşan',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-[#0a0a0f] to-[#0d0f17] border-y border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {stats.map((item) => (
            <div key={item.id} className="p-4">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center">
                <span>
                  {item.id === 'stat-users' || item.id === 'stat-calcs'
                    ? (item.value / 1000).toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + 'B'
                    : item.value}
                </span>
                <span className="text-amber-400 ml-0.5">{item.suffix}</span>
              </div>
              <div className="text-sm font-bold text-slate-200 mt-2">
                {item.label}
              </div>
              {item.subtext && (
                <div className="text-xs text-slate-500 mt-1">{item.subtext}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
