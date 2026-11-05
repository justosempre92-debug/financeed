import React, { useState } from 'react';
import { playPopSound } from '../utils/sound';

interface CutePiggyProps {
  size?: 'normal' | 'large';
  interactive?: boolean;
  onTap?: () => void;
  showCoinAnimation?: boolean;
}

export const CutePiggy: React.FC<CutePiggyProps> = ({
  size = 'large',
  interactive = true,
  onTap,
  showCoinAnimation = true,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleClick = () => {
    setIsWiggling(true);
    setShowHeart(true);
    playPopSound();
    if (onTap) onTap();

    setTimeout(() => setIsWiggling(false), 500);
    setTimeout(() => setShowHeart(false), 1200);
  };

  const dimClass = size === 'large' ? 'w-56 h-56 md:w-72 md:h-72' : 'w-40 h-40 md:w-48 md:h-48';

  return (
    <div
      onClick={interactive ? handleClick : undefined}
      className={`relative flex items-center justify-center select-none ${dimClass} ${
        interactive ? 'cursor-pointer group' : ''
      }`}
      role={interactive ? 'button' : undefined}
      aria-label="Cofrinho Mágico fofo"
      tabIndex={interactive ? 0 : undefined}
    >
      {/* Soft Glow behind Piggy */}
      <div className="absolute inset-4 rounded-full bg-pink-200/50 blur-2xl group-hover:bg-pink-300/60 transition-all duration-300" />

      {/* Floating Heart reaction on click */}
      {showHeart && (
        <div className="absolute -top-6 text-3xl animate-bounce pointer-events-none z-20">
          💖
        </div>
      )}

      {/* Falling Gold Coin animation into the slot */}
      {showCoinAnimation && (
        <div className="absolute -top-4 md:-top-6 z-10 animate-bounce pointer-events-none">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-100 border-2 border-yellow-200 shadow-md flex items-center justify-center text-amber-900 font-extrabold text-sm md:text-base">
            R$
          </div>
        </div>
      )}

      {/* High-Fidelity Cute Piggy Vector SVG */}
      <svg
        viewBox="0 0 240 220"
        className={`w-full h-full drop-shadow-xl transition-transform duration-300 ${
          isWiggling ? 'scale-110 -rotate-3' : 'group-hover:scale-105'
        }`}
      >
        <defs>
          <radialGradient id="piggy-body" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="60%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#F43F5E" />
          </radialGradient>
          <radialGradient id="piggy-snout" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="100%" stopColor="#FB7185" />
          </radialGradient>
          <linearGradient id="piggy-ear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
          <linearGradient id="piggy-ear-inner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE4E6" />
            <stop offset="100%" stopColor="#FDA4AF" />
          </linearGradient>
          <linearGradient id="coin-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* Curly Tail at the back */}
        <path
          d="M 45 135 C 30 130, 20 115, 26 102 C 32 90, 48 95, 42 108"
          fill="none"
          stroke="#FB7185"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left Back Leg */}
        <ellipse cx="75" cy="182" rx="14" ry="12" fill="#E11D48" />
        {/* Right Back Leg */}
        <ellipse cx="165" cy="182" rx="14" ry="12" fill="#E11D48" />

        {/* Left Front Leg */}
        <ellipse cx="90" cy="186" rx="16" ry="14" fill="#F43F5E" />
        {/* Right Front Leg */}
        <ellipse cx="150" cy="186" rx="16" ry="14" fill="#F43F5E" />

        {/* Piggy Ears */}
        {/* Left Ear */}
        <g transform="rotate(-15 70 50)">
          <path
            d="M 60 70 C 50 35, 75 20, 92 48 Z"
            fill="url(#piggy-ear)"
          />
          <path
            d="M 66 65 C 58 42, 75 32, 86 52 Z"
            fill="url(#piggy-ear-inner)"
          />
        </g>
        {/* Right Ear */}
        <g transform="rotate(15 170 50)">
          <path
            d="M 180 70 C 190 35, 165 20, 148 48 Z"
            fill="url(#piggy-ear)"
          />
          <path
            d="M 174 65 C 182 42, 165 32, 154 52 Z"
            fill="url(#piggy-ear-inner)"
          />
        </g>

        {/* Main Piggy Body (Chubby, round, and friendly) */}
        <circle cx="120" cy="125" r="76" fill="url(#piggy-body)" />

        {/* Body Highlight / Shine */}
        <ellipse cx="90" cy="85" rx="36" ry="18" transform="rotate(-25 90 85)" fill="#FFFFFF" opacity="0.28" />

        {/* Coin Slot on Top */}
        <rect x="100" y="52" width="40" height="7" rx="3.5" fill="#881337" opacity="0.9" />

        {/* Rosy Cheeks */}
        <ellipse cx="68" cy="132" rx="12" ry="8" fill="#F43F5E" opacity="0.75" />
        <ellipse cx="172" cy="132" rx="12" ry="8" fill="#F43F5E" opacity="0.75" />

        {/* Cartoon Big Eyes */}
        {/* Left Eye */}
        <g>
          <ellipse cx="88" cy="110" rx="9" ry="12" fill="#1E293B" />
          <circle cx="85" cy="106" r="4" fill="#FFFFFF" />
          <circle cx="91" cy="115" r="2" fill="#FFFFFF" />
        </g>
        {/* Right Eye */}
        <g>
          <ellipse cx="152" cy="110" rx="9" ry="12" fill="#1E293B" />
          <circle cx="149" cy="106" r="4" fill="#FFFFFF" />
          <circle cx="155" cy="115" r="2" fill="#FFFFFF" />
        </g>

        {/* Cute Snout in Center */}
        <ellipse cx="120" cy="136" rx="28" ry="20" fill="url(#piggy-snout)" stroke="#F43F5E" strokeWidth="2.5" />
        {/* Nostrils */}
        <ellipse cx="111" cy="136" rx="4.5" ry="6.5" fill="#BE123C" />
        <ellipse cx="129" cy="136" rx="4.5" ry="6.5" fill="#BE123C" />

        {/* Cheerful Smile below Snout */}
        <path
          d="M 112 160 Q 120 166 128 160"
          stroke="#9F1239"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Small sparkle on the snout */}
        <circle cx="106" cy="128" r="2" fill="#FFFFFF" opacity="0.6" />
      </svg>

      {/* Floating Coin helper note */}
      {interactive && (
        <span className="absolute -bottom-2 text-xs font-semibold text-emerald-800 bg-emerald-100/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
          Toque em mim! 🐷
        </span>
      )}
    </div>
  );
};
