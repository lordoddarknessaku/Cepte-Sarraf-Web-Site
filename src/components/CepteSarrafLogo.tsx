import React, { useState } from 'react';
import { motion } from 'motion/react';

interface CepteSarrafLogoProps {
  variant?: 'icon' | 'mascot' | 'full' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  speechBubble?: string;
  showSpeech?: boolean;
  interactive?: boolean;
}

export const CepteSarrafLogo: React.FC<CepteSarrafLogoProps> = ({
  variant = 'icon',
  size = 'md',
  className = '',
  speechBubble,
  showSpeech = false,
  interactive = true,
}) => {
  const [isWaving, setIsWaving] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState(speechBubble);

  const sizeDimensions = {
    sm: { box: 'w-8 h-8', icon: 32, font: 'text-sm' },
    md: { box: 'w-10 h-10', icon: 40, font: 'text-base' },
    lg: { box: 'w-14 h-14', icon: 56, font: 'text-lg' },
    xl: { box: 'w-20 h-20', icon: 80, font: 'text-2xl' },
    '2xl': { box: 'w-32 h-32 md:w-40 md:h-40', icon: 140, font: 'text-3xl' },
  };

  const dim = sizeDimensions[size];

  // Mascot SVG Graphic with exact features from user image:
  // - Gold bar character with beveled metallic gradient
  // - "S" engraved on chest
  // - Big cute brown eyes & friendly smile
  // - Phone held to ear
  // - Left arm waving
  // - Standing on cute golden shoes
  const MascotGraphic = ({ isIcon = true }: { isIcon?: boolean }) => (
    <svg
      viewBox="0 0 512 512"
      className="w-full h-full drop-shadow-sm select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bgGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="50%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>

        <linearGradient id={`goldBody-${size}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb" />
          <stop offset="18%" stop-color="#fde047" />
          <stop offset="55%" stop-color="#f59e0b" />
          <stop offset="85%" stop-color="#d97706" />
          <stop offset="100%" stop-color="#92400e" />
        </linearGradient>

        <linearGradient id={`goldBevel-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309" />
          <stop offset="30%" stop-color="#f59e0b" />
          <stop offset="70%" stop-color="#fde047" />
          <stop offset="100%" stop-color="#78350f" />
        </linearGradient>

        <linearGradient id={`letterS-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#78350f" />
          <stop offset="45%" stop-color="#b45309" />
          <stop offset="100%" stop-color="#fef08a" />
        </linearGradient>

        <filter id={`glow-${size}`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0c4a6e" flood-opacity="0.3" />
        </filter>
      </defs>

      {/* Blue Squircle base if icon */}
      {isIcon && (
        <>
          <rect width="512" height="512" rx="115" fill={`url(#bgGrad-${size})`} />
          <path
            d="M 115,0 L 397,0 C 460,0 512,52 512,115 L 512,190 C 410,120 290,95 0,150 L 0,115 C 0,52 52,0 115,0 Z"
            fill="#ffffff"
            opacity="0.16"
          />
          <ellipse cx="256" cy="438" rx="130" ry="24" fill="#0c4a6e" opacity="0.45" />
        </>
      )}

      {/* Mascot Graphic */}
      <g filter={`url(#glow-${size})`}>
        {/* Feet / Shoes */}
        <ellipse cx="205" cy="428" rx="34" ry="18" fill="#d97706" />
        <ellipse cx="205" cy="425" rx="32" ry="16" fill={`url(#goldBody-${size})`} />
        <ellipse cx="201" cy="422" rx="16" ry="6" fill="#fffbeb" opacity="0.7" />

        <ellipse cx="307" cy="428" rx="34" ry="18" fill="#b45309" />
        <ellipse cx="307" cy="425" rx="32" ry="16" fill={`url(#goldBody-${size})`} />
        <ellipse cx="303" cy="422" rx="16" ry="6" fill="#fffbeb" opacity="0.7" />

        {/* Right Arm & Phone */}
        <path d="M 330,260 Q 380,240 372,185 Q 360,190 325,235 Z" fill={`url(#goldBevel-${size})`} />
        <path d="M 332,256 Q 375,238 368,188" stroke="#fffbeb" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.6" />
        <circle cx="366" cy="186" r="15" fill={`url(#goldBody-${size})`} />

        {/* Phone */}
        <g transform="rotate(14, 385, 175)">
          <rect x="368" y="128" width="38" height="74" rx="8" fill="#020617" opacity="0.35" />
          <rect x="366" y="125" width="38" height="74" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="2" />
          <rect x="370" y="131" width="30" height="62" rx="5" fill="#1e293b" />
          <path d="M 374,175 L 380,168 L 386,170 L 394,152" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <circle cx="394" cy="152" r="2.5" fill="#22c55e" />
        </g>

        {/* Left Arm & Waving Hand */}
        <g className={isWaving ? 'animate-bounce' : ''}>
          <path d="M 180,260 C 130,230 115,160 120,115 C 135,112 145,135 185,225 Z" fill={`url(#goldBevel-${size})`} />
          <path d="M 175,250 C 138,220 126,165 128,125" stroke="#fffbeb" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.7" />
          <circle cx="120" cy="115" r="18" fill={`url(#goldBody-${size})`} />
          <ellipse cx="140" cy="112" rx="7" ry="12" transform="rotate(35, 140, 112)" fill={`url(#goldBody-${size})`} stroke="#b45309" stroke-width="1.5" />
          <ellipse cx="126" cy="92" rx="6.5" ry="15" transform="rotate(10, 126, 92)" fill={`url(#goldBody-${size})`} stroke="#b45309" stroke-width="1.5" />
          <ellipse cx="112" cy="88" rx="6.5" ry="16" transform="rotate(-5, 112, 88)" fill={`url(#goldBody-${size})`} stroke="#b45309" stroke-width="1.5" />
          <ellipse cx="98" cy="94" rx="6" ry="14" transform="rotate(-20, 98, 94)" fill={`url(#goldBody-${size})`} stroke="#b45309" stroke-width="1.5" />
          <ellipse cx="88" cy="106" rx="5.5" ry="12" transform="rotate(-35, 88, 106)" fill={`url(#goldBody-${size})`} stroke="#b45309" stroke-width="1.5" />
          <circle cx="116" cy="114" r="8" fill="#fffbeb" opacity="0.6" />
        </g>

        {/* Gold Bullion Main Body */}
        <rect x="156" y="110" width="200" height="285" rx="36" fill="#78350f" />
        <rect x="158" y="112" width="196" height="280" rx="34" fill={`url(#goldBevel-${size})`} />
        <rect x="170" y="124" width="172" height="256" rx="26" fill={`url(#goldBody-${size})`} />

        {/* Top Edge Specular Reflection */}
        <path d="M 172,145 C 172,130 185,125 205,125 L 307,125 C 327,125 340,130 340,145 C 300,165 210,165 172,145 Z" fill="#ffffff" opacity="0.35" />
        <line x1="185" y1="130" x2="327" y2="130" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.9" />

        {/* Eyebrows */}
        <path d="M 194,175 Q 212,164 230,172" stroke="#78350f" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M 282,172 Q 300,164 318,175" stroke="#78350f" stroke-width="4.5" stroke-linecap="round" fill="none" />

        {/* Eyes with Big Anime/Pixar Sparkles */}
        <ellipse cx="215" cy="198" rx="20" ry="25" fill="#ffffff" stroke="#92400e" stroke-width="2" />
        <ellipse cx="218" cy="198" rx="14" ry="17" fill="#451a03" />
        <ellipse cx="220" cy="198" rx="10" ry="12" fill="#170902" />
        <circle cx="215" cy="190" r="5.5" fill="#ffffff" />
        <circle cx="224" cy="204" r="2.8" fill="#ffffff" opacity="0.9" />

        <ellipse cx="297" cy="198" rx="20" ry="25" fill="#ffffff" stroke="#92400e" stroke-width="2" />
        <ellipse cx="294" cy="198" rx="14" ry="17" fill="#451a03" />
        <ellipse cx="292" cy="198" rx="10" ry="12" fill="#170902" />
        <circle cx="289" cy="190" r="5.5" fill="#ffffff" />
        <circle cx="298" cy="204" r="2.8" fill="#ffffff" opacity="0.9" />

        {/* Cheeks */}
        <ellipse cx="188" cy="216" rx="10" ry="6" fill="#f43f5e" opacity="0.35" />
        <ellipse cx="324" cy="216" rx="10" ry="6" fill="#f43f5e" opacity="0.35" />

        {/* Happy Smiling Mouth */}
        <path d="M 237,218 Q 256,244 275,218 Z" fill="#451a03" />
        <path d="M 246,226 Q 256,222 266,226 Q 256,242 246,226 Z" fill="#fb7185" />
        <path d="M 234,216 Q 256,242 278,216" stroke="#78350f" stroke-width="4.5" stroke-linecap="round" fill="none" />

        {/* Embossed 'S' on Chest */}
        <g>
          <path
            d="M 276,260 C 274,250 264,244 254,244 C 244,244 238,249 238,256 C 238,265 248,269 262,272 C 278,275 288,284 288,298 C 288,314 274,324 256,324 C 238,324 226,314 224,300"
            stroke={`url(#letterS-${size})`}
            stroke-width="12"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M 275,259 C 273,251 264,246 254,246 C 245,246 240,250 240,256 C 240,263 248,267 262,270"
            stroke="#ffffff"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M 286,298 C 286,312 273,322 256,322 C 240,322 230,314 226,303"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>

        <text x="256" y="358" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" letter-spacing="4" fill="#92400e" text-anchor="middle" opacity="0.85">
          SARRAF
        </text>
      </g>
    </svg>
  );

  const handleClick = () => {
    if (!interactive) return;
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1200);

    const greetings = [
      'Altın hesabınız cebinizde!',
      'Kapalıçarşı fiyatları canlı yayında!',
      'Kaç gram bileziğiniz var? Hemen hesaplayalım!',
      'Çeyrek altın alarmınızı kurdunuz mu?',
      'Ben Sarraf Usta, yardım için buradayım!',
    ];
    const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
    setActiveSpeech(randomGreet);
  };

  if (variant === 'mascot') {
    return (
      <div
        className={`relative inline-flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
        onClick={handleClick}
      >
        {(showSpeech || activeSpeech) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-2 px-3.5 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-lg backdrop-blur-md whitespace-nowrap flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {activeSpeech || speechBubble}
          </motion.div>
        )}
        <div className={dim.box}>
          <MascotGraphic isIcon={false} />
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-950/80 via-slate-900 to-amber-950/40 border border-blue-500/30 shadow-md ${className}`}
      >
        <div className="w-7 h-7 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
          <MascotGraphic isIcon={true} />
        </div>
        <span className="text-xs font-bold text-amber-300 tracking-wide">
          {speechBubble || 'Çepte Sarraf Asistanı'}
        </span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        className={`inline-flex items-center gap-3 cursor-pointer group select-none ${className}`}
        onClick={handleClick}
      >
        <div
          className={`${dim.box} rounded-2xl overflow-hidden shadow-lg shadow-blue-900/20 ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105 group-hover:ring-amber-400/50`}
        >
          <MascotGraphic isIcon={true} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              ÇEPTE<span className="text-amber-400 ml-1">SARRAF</span>
            </span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Canlı
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium tracking-wide">
            Altın & Takı Hesaplama Asistanı
          </span>
        </div>
      </div>
    );
  }

  // Default 'icon' variant
  return (
    <div
      className={`relative inline-block ${dim.box} rounded-2xl overflow-hidden shadow-md shadow-blue-950/40 cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
      onClick={handleClick}
      title="Çepte Sarraf - Altın Asistanı"
    >
      <MascotGraphic isIcon={true} />
    </div>
  );
};
