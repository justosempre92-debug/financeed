import React from 'react';
import { Star, Volume2, VolumeX, Coins, Trophy, HandCoins, Target } from 'lucide-react';
import { ScreenMode } from '../types';
import { playPopSound } from '../utils/sound';

interface HeaderNavProps {
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode) => void;
  stars: number;
  totalMoney: number;
  soundOn: boolean;
  onToggleSound: () => void;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
  childName?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  onNavigate,
  stars,
  totalMoney,
  soundOn,
  onToggleSound,
  unlockedBadgesCount,
  totalBadgesCount,
  childName,
}) => {
  const handleNav = (screen: ScreenMode) => {
    playPopSound();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-xs px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('welcome')}
            className="flex items-center gap-2 group cursor-pointer text-left"
            title="Ir para a tela inicial"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🐷</span>
            <span className="text-lg sm:text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-pink-500 to-amber-500 whitespace-nowrap">
              COFRINHO MÁGICO
            </span>
          </button>

          {childName && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100/80 border border-pink-200 text-pink-800 text-xs font-black shadow-xs">
              <span>👋</span>
              <span>{childName}</span>
            </div>
          )}
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 text-sm font-bold overflow-x-auto whitespace-nowrap no-scrollbar py-1">
          <button
            onClick={() => handleNav('welcome')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              currentScreen === 'welcome'
                ? 'bg-sky-200 text-sky-950 font-black shadow-xs ring-2 ring-sky-300/60'
                : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => handleNav('tela2')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'tela2'
                ? 'bg-emerald-200 text-emerald-950 font-black shadow-xs ring-2 ring-emerald-300/60'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <HandCoins className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Guardar</span>
          </button>
          <button
            onClick={() => handleNav('tela3')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              currentScreen === 'tela3'
                ? 'bg-blue-200 text-blue-950 font-black shadow-xs ring-2 ring-blue-300/60'
                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
            }`}
          >
            Como fazer?
          </button>
          <button
            onClick={() => handleNav('tela4')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              currentScreen === 'tela4'
                ? 'bg-orange-200 text-orange-950 font-black shadow-xs ring-2 ring-orange-300/60'
                : 'text-slate-600 hover:text-orange-700 hover:bg-orange-50'
            }`}
          >
            Desafio
          </button>
          <button
            onClick={() => handleNav('tela5')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              currentScreen === 'tela5'
                ? 'bg-amber-200 text-amber-950 font-black shadow-xs ring-2 ring-amber-300/60'
                : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
            }`}
          >
            Progresso
          </button>
          <button
            onClick={() => handleNav('cofrinho')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              currentScreen === 'cofrinho'
                ? 'bg-pink-200 text-pink-950 font-black shadow-xs ring-2 ring-pink-300/60'
                : 'text-slate-600 hover:text-pink-700 hover:bg-pink-50'
            }`}
          >
            Meu Cofrinho
          </button>
          <button
            onClick={() => handleNav('licoes')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'licoes'
                ? 'bg-purple-200 text-purple-950 font-black shadow-xs ring-2 ring-purple-300/60'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Target className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Missões</span>
          </button>
          <button
            onClick={() => handleNav('conquistas')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'conquistas'
                ? 'bg-amber-200 text-amber-950 font-black shadow-xs ring-2 ring-amber-300/60'
                : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Conquistas</span>
            <span className="text-xs bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-bold">
              {unlockedBadgesCount}/{totalBadgesCount}
            </span>
          </button>
        </nav>

        {/* Right Zone: Star Counter, Coin Counter & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Star Counter Pill */}
          <div
            onClick={() => handleNav('conquistas')}
            className="flex items-center gap-1.5 bg-amber-100/90 hover:bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full border border-amber-300 font-extrabold text-xs sm:text-sm cursor-pointer shadow-xs transition-transform active:scale-95"
            title="Suas estrelas mágicas"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="tabular-nums">{stars}</span>
            <span className="hidden sm:inline text-xs font-semibold text-amber-800">★</span>
          </div>

          {/* Money Counter Pill */}
          <div
            onClick={() => handleNav('cofrinho')}
            className="flex items-center gap-1.5 bg-emerald-100/90 hover:bg-emerald-200/80 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300 font-extrabold text-xs sm:text-sm cursor-pointer shadow-xs transition-transform active:scale-95"
            title="Total no seu cofrinho"
          >
            <Coins className="w-4 h-4 text-emerald-600" />
            <span className="tabular-nums">R$ {totalMoney.toFixed(2).replace('.', ',')}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title={soundOn ? 'Desativar sons' : 'Ativar sons'}
            aria-label="Controle de áudio"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav strip with horizontal scroll (overflow-x-auto whitespace-nowrap) */}
      <div className="flex md:hidden items-center gap-1.5 pt-2 border-t border-sky-100 mt-2 text-xs font-bold overflow-x-auto whitespace-nowrap no-scrollbar pb-1 px-1 scroll-smooth">
        <button
          onClick={() => handleNav('welcome')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer ${
            currentScreen === 'welcome'
              ? 'bg-sky-200 text-sky-950 font-black shadow-xs ring-2 ring-sky-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Início
        </button>
        <button
          onClick={() => handleNav('tela2')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
            currentScreen === 'tela2'
              ? 'bg-emerald-200 text-emerald-950 font-black shadow-xs ring-2 ring-emerald-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HandCoins className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>Guardar</span>
        </button>
        <button
          onClick={() => handleNav('tela3')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer ${
            currentScreen === 'tela3'
              ? 'bg-blue-200 text-blue-950 font-black shadow-xs ring-2 ring-blue-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Como fazer?
        </button>
        <button
          onClick={() => handleNav('tela4')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer ${
            currentScreen === 'tela4'
              ? 'bg-orange-200 text-orange-950 font-black shadow-xs ring-2 ring-orange-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Desafio
        </button>
        <button
          onClick={() => handleNav('tela5')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer ${
            currentScreen === 'tela5'
              ? 'bg-amber-200 text-amber-950 font-black shadow-xs ring-2 ring-amber-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Progresso
        </button>
        <button
          onClick={() => handleNav('cofrinho')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer ${
            currentScreen === 'cofrinho'
              ? 'bg-pink-200 text-pink-950 font-black shadow-xs ring-2 ring-pink-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Meu Cofrinho
        </button>
        <button
          onClick={() => handleNav('licoes')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
            currentScreen === 'licoes'
              ? 'bg-purple-200 text-purple-950 font-black shadow-xs ring-2 ring-purple-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>Missões</span>
        </button>
        <button
          onClick={() => handleNav('conquistas')}
          className={`px-3 py-1.5 rounded-full shrink-0 transition-all cursor-pointer ${
            currentScreen === 'conquistas'
              ? 'bg-amber-200 text-amber-950 font-black shadow-xs ring-2 ring-amber-300/60'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Selos ({unlockedBadgesCount})
        </button>
      </div>
    </header>
  );
};
