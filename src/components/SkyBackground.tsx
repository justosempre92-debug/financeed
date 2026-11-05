import React from 'react';

interface SkyBackgroundProps {
  children: React.ReactNode;
  variant?: 'sky' | 'green' | 'orange';
}

export const SkyBackground: React.FC<SkyBackgroundProps> = ({
  children,
  variant = 'sky',
}) => {
  const isGreen = variant === 'green';
  const isOrange = variant === 'orange';

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-slate-800 flex flex-col justify-between transition-colors duration-500 ${
        isOrange
          ? 'bg-gradient-to-b from-orange-100 via-amber-100 to-yellow-50'
          : isGreen
          ? 'bg-gradient-to-b from-green-100 via-emerald-100 to-teal-50'
          : 'bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50'
      }`}
    >
      {/* Background SVG and Clouds layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft Smiling Sun in top-left */}
        <div className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64">
          <div className="absolute inset-0 bg-yellow-200/50 rounded-full blur-2xl animate-pulse" />
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300 drop-shadow-md">
            <circle cx="50" cy="50" r="32" fill="#FDE047" />
            {/* Sun rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="50"
                x2={50 + 44 * Math.cos((deg * Math.PI) / 180)}
                y2={50 + 44 * Math.sin((deg * Math.PI) / 180)}
                stroke="#FACC15"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-75"
              />
            ))}
            {/* Cute Smiling Face on Sun */}
            <circle cx="43" cy="48" r="3" fill="#854D0E" />
            <circle cx="57" cy="48" r="3" fill="#854D0E" />
            <ellipse cx="38" cy="53" rx="3" ry="2" fill="#F87171" opacity="0.6" />
            <ellipse cx="62" cy="53" rx="3" ry="2" fill="#F87171" opacity="0.6" />
            <path
              d="M 44 54 Q 50 61 56 54"
              stroke="#854D0E"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Pastel Rainbow Arc (Only on Sky variant) */}
        {variant === 'sky' && (
          <div className="absolute top-2 right-4 md:right-16 w-80 md:w-[460px] opacity-80 pointer-events-none">
          <svg viewBox="0 0 300 150" className="w-full h-auto drop-shadow-sm">
            <defs>
              <linearGradient id="rainbow-red" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
              <linearGradient id="rainbow-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              <linearGradient id="rainbow-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
              <linearGradient id="rainbow-green" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#86EFAC" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>
              <linearGradient id="rainbow-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="rainbow-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <path d="M 20 150 A 130 130 0 0 1 280 150" fill="none" stroke="url(#rainbow-red)" strokeWidth="10" strokeLinecap="round" />
            <path d="M 29 150 A 121 121 0 0 1 271 150" fill="none" stroke="url(#rainbow-orange)" strokeWidth="9" />
            <path d="M 37 150 A 113 113 0 0 1 263 150" fill="none" stroke="url(#rainbow-yellow)" strokeWidth="8" />
            <path d="M 44 150 A 106 106 0 0 1 256 150" fill="none" stroke="url(#rainbow-green)" strokeWidth="8" />
            <path d="M 51 150 A 99 99 0 0 1 249 150" fill="none" stroke="url(#rainbow-blue)" strokeWidth="8" />
            <path d="M 58 150 A 92 92 0 0 1 242 150" fill="none" stroke="url(#rainbow-purple)" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
        )}

        {/* Floating Clouds */}
        {/* Cloud 1 - Top Left */}
        <div className="absolute top-12 left-1/4 animate-float-1 opacity-90">
          <svg className="w-36 h-20 md:w-48 md:h-28 text-white drop-shadow-sm" viewBox="0 0 120 60" fill="currentColor">
            <path d="M 20 45 A 15 15 0 0 1 30 20 A 25 25 0 0 1 70 15 A 20 20 0 0 1 95 28 A 15 15 0 0 1 100 45 Z" />
          </svg>
        </div>

        {/* Cloud 2 - Top Right */}
        <div className="absolute top-24 right-1/6 animate-float-2 opacity-85">
          <svg className="w-40 h-22 md:w-56 md:h-32 text-white drop-shadow-sm" viewBox="0 0 120 60" fill="currentColor">
            <path d="M 15 48 A 16 16 0 0 1 28 24 A 26 26 0 0 1 72 18 A 22 22 0 0 1 98 32 A 16 16 0 0 1 105 48 Z" />
          </svg>
        </div>

        {/* Cloud 3 - Lower Left */}
        <div className="absolute top-64 left-8 animate-float-2 opacity-75 hidden sm:block">
          <svg className="w-32 h-18 text-white drop-shadow-sm" viewBox="0 0 120 60" fill="currentColor">
            <path d="M 20 45 A 15 15 0 0 1 30 20 A 25 25 0 0 1 70 15 A 20 20 0 0 1 95 28 A 15 15 0 0 1 100 45 Z" />
          </svg>
        </div>

        {/* Twinkling Magical Sparkles */}
        <div className="absolute top-20 left-1/2 w-4 h-4 text-amber-300 animate-sparkle">✦</div>
        <div className="absolute top-44 right-1/3 w-3 h-3 text-amber-400 animate-sparkle" style={{ animationDelay: '1.5s' }}>✦</div>
        <div className="absolute top-36 left-1/6 w-5 h-5 text-amber-300 animate-sparkle" style={{ animationDelay: '3s' }}>✨</div>

        {/* Rolling Soft Green Hills at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 md:h-36 pointer-events-none">
          <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="w-full h-full">
            {/* Back hill */}
            <path
              d="M0 80 Q300 30 600 70 T1200 40 L1200 180 L0 180 Z"
              fill="#A7F3D0"
              opacity="0.6"
            />
            {/* Front hill */}
            <path
              d="M0 110 Q250 60 550 100 T1200 80 L1200 180 L0 180 Z"
              fill="#6EE7B7"
              opacity="0.8"
            />
            {/* Wildflowers / Little daisies */}
            <circle cx="120" cy="130" r="4" fill="#FEF08A" />
            <circle cx="280" cy="140" r="5" fill="#F472B6" />
            <circle cx="450" cy="120" r="4" fill="#FEF08A" />
            <circle cx="680" cy="135" r="5" fill="#93C5FD" />
            <circle cx="890" cy="125" r="4" fill="#F472B6" />
            <circle cx="1060" cy="140" r="5" fill="#FEF08A" />
          </svg>
        </div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
