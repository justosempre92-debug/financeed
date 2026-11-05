import React, { useState } from 'react';
import { Star, Sparkles, PiggyBank, Coins, User } from 'lucide-react';
import piggy3DImage from '../assets/images/porquinho_cartoon_3d_1793835969064.jpg';
import { playStarSound } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  earnedStars: number;
  initialName?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  earnedStars,
  initialName = '',
}) => {
  const [childName, setChildName] = useState<string>(initialName);
  const [imgError, setImgError] = useState(false);

  const isNameValid = childName.trim().length > 0;

  const handleStartClick = () => {
    if (!isNameValid) return;
    playStarSound();
    onStart(childName.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isNameValid) {
      handleStartClick();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full text-center select-none">
      {/* Floating Greeting Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-sky-200 shadow-xs text-sky-800 text-sm md:text-base font-bold mb-3 animate-bounce">
        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        <span>Para pequenos poupadores de 6 a 10 anos!</span>
        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
      </div>

      {/* Main Title: COFRINHO MÁGICO */}
      <div className="relative mb-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-pink-500 to-amber-500 drop-shadow-md">
          COFRINHO MÁGICO
        </h1>
        <span
          className="absolute -top-4 -right-6 md:-right-10 text-2xl md:text-3xl animate-bounce"
          style={{ animationDuration: '2.5s' }}
        >
          ✨
        </span>
      </div>

      {/* Subtitle: Aprenda a cuidar do seu dinheiro brincando! */}
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-sky-900/90 max-w-xl mx-auto mb-4 leading-snug">
        Aprenda a cuidar do seu dinheiro brincando!
      </p>

      {/* Center: <img> tag with 3D Cartoon Cute Piggy image placeholder */}
      <div className="my-3 flex flex-col items-center">
        <div className="relative group">
          {/* Soft glowing backdrop */}
          <div className="absolute inset-0 rounded-full bg-pink-300/40 blur-2xl group-hover:bg-pink-400/50 transition-all duration-300 pointer-events-none" />

          {/* Floating magical sparkles */}
          <span
            className="absolute -top-3 -right-2 text-2xl animate-bounce pointer-events-none z-20"
            style={{ animationDuration: '2s' }}
          >
            ⭐
          </span>
          <span
            className="absolute -bottom-2 -left-3 text-2xl animate-bounce pointer-events-none z-20"
            style={{ animationDuration: '2.8s' }}
          >
            ✨
          </span>

          {/* Centered 3D Cartoon Piggy <img> */}
          <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl border-4 border-white shadow-2xl bg-gradient-to-b from-pink-100 to-rose-200 p-2 overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
            <img
              src={
                imgError
                  ? 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=80'
                  : piggy3DImage
              }
              alt="Porquinho fofo estilo cartoon 3D"
              className="w-full h-full object-cover rounded-2xl drop-shadow-md select-none pointer-events-none"
              loading="eager"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      </div>

      {/* Child Name Input Section */}
      <div className="w-full max-w-md mx-auto mb-5 px-2">
        <label
          htmlFor="child-name-input"
          className="block text-sm sm:text-base font-extrabold text-sky-950 mb-2"
        >
          Como você se chama? Digite seu nome:
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none text-xl">
            ✍️
          </div>
          <input
            id="child-name-input"
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite seu nome aqui"
            maxLength={25}
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-full bg-white/95 border-3 border-sky-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-200 text-slate-800 font-extrabold text-base sm:text-lg placeholder:text-slate-400 shadow-md outline-none transition-all duration-200 text-center"
            autoComplete="off"
          />
          {childName && (
            <button
              type="button"
              onClick={() => setChildName('')}
              className="absolute right-3 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-colors"
              title="Limpar nome"
            >
              ✕
            </button>
          )}
        </div>

        {/* Input Helper Feedback */}
        {!isNameValid ? (
          <p className="text-xs sm:text-sm font-bold text-sky-900/80 mt-2 flex items-center justify-center gap-1.5">
            <span>💡</span> Digite seu nome para ativar o botão mágico!
          </p>
        ) : (
          <p className="text-xs sm:text-sm font-extrabold text-emerald-700 mt-2 flex items-center justify-center gap-1.5 animate-pulse">
            <span>✨</span> Que legal, {childName}! Agora toque em VAMOS LÁ!
          </p>
        )}
      </div>

      {/* Main Yellow Action Button: VAMOS LÁ! with Star Icon */}
      <div className="relative flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={handleStartClick}
          disabled={!isNameValid}
          className={`relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-extrabold text-xl sm:text-2xl tracking-wider border-4 border-white transition-all duration-200 select-none ${
            isNameValid
              ? 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:via-amber-300 hover:to-amber-400 text-amber-950 shadow-xl shadow-amber-400/40 cursor-pointer transform hover:scale-105 active:scale-95 animate-pulse-gentle group'
              : 'bg-gradient-to-b from-amber-200 to-amber-300 text-amber-900/50 opacity-60 cursor-not-allowed shadow-none'
          }`}
          aria-label="Vamos lá! Começar a aventura no Cofrinho Mágico"
        >
          <Star
            className={`w-7 h-7 sm:w-8 sm:h-8 ${
              isNameValid
                ? 'text-amber-950 fill-amber-400 drop-shadow-sm group-hover:rotate-12 transition-transform duration-300'
                : 'text-amber-800/40 fill-amber-300/30'
            }`}
          />
          <span>VAMOS LÁ!</span>
          <Star
            className={`w-7 h-7 sm:w-8 sm:h-8 ${
              isNameValid
                ? 'text-amber-950 fill-amber-400 drop-shadow-sm group-hover:-rotate-12 transition-transform duration-300'
                : 'text-amber-800/40 fill-amber-300/30'
            }`}
          />
        </button>

        {isNameValid && (
          <span className="text-xs font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-3 py-1 rounded-full mt-3 shadow-xs">
            ⭐ Ganhe sua 1ª Estrela Mágica ao começar!
          </span>
        )}
      </div>

      {/* Highlights / Educational Pillars Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-8 max-w-2xl w-full text-left">
        <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Guardar & Poupar</h4>
            <p className="text-xs text-slate-600">Junte moedas para realizar grandes sonhos!</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Os 3 Potes Mágicos</h4>
            <p className="text-xs text-slate-600">Poupar, gastar e doar com sabedoria.</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Ganhe Estrelas</h4>
            <p className="text-xs text-slate-600">Desbloqueie selos e troféus virtuais!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

