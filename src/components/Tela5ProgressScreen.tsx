import React, { useState } from 'react';
import { Star, Lock, Unlock, Sparkles, Coins, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import celebratingPiggyImg from '../assets/images/porquinho_comemorando_1793837149039.jpg';
import { playCoinSound, playStarSound, playAchievementSound, playPopSound } from '../utils/sound';

interface Tela5ProgressScreenProps {
  childName?: string;
  onNext: () => void;
  onBack: () => void;
}

export const Tela5ProgressScreen: React.FC<Tela5ProgressScreenProps> = ({
  childName,
  onNext,
  onBack,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isRainingCoins, setIsRainingCoins] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  // Format title using childName state from Tela 1
  const displayName = childName && childName.trim().length > 0 ? childName.trim().toUpperCase() : 'POUPADOR(A)';

  const handleContinueLearning = () => {
    setIsUnlocked(true);
    setIsRainingCoins(true);

    // Audio effects: coin sounds and star victory fanfare
    playCoinSound();
    setTimeout(() => playCoinSound(), 200);
    setTimeout(() => playCoinSound(), 400);
    setTimeout(() => playAchievementSound(), 600);

    // Keep rain active for celebration
    setTimeout(() => {
      setIsRainingCoins(false);
    }, 4500);
  };

  const handleReplayRain = () => {
    setIsRainingCoins(true);
    playCoinSound();
    setTimeout(() => playCoinSound(), 250);
    setTimeout(() => setIsRainingCoins(false), 3500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-4 py-6 max-w-4xl mx-auto w-full select-none relative overflow-hidden">
      {/* Shower of Coins Falling on Screen */}
      {isRainingCoins && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
          {[...Array(40)].map((_, i) => {
            const left = `${(i * 100) / 40 + (i % 3) * 1.5}%`;
            const delay = `${(i % 10) * 0.12}s`;
            const duration = `${1.8 + (i % 5) * 0.3}s`;
            const coinSize = i % 3 === 0 ? 'w-10 h-10 text-xs' : i % 2 === 0 ? 'w-12 h-12 text-sm' : 'w-14 h-14 text-base';

            return (
              <div
                key={i}
                className={`absolute -top-16 animate-coin-rain flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 border-2 border-yellow-100 shadow-xl text-amber-950 font-black ${coinSize}`}
                style={{
                  left,
                  animationDelay: delay,
                  animationDuration: duration,
                }}
              >
                <span>R$</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Top Section: Celebrating Piggy & Title */}
      <div className="w-full flex flex-col items-center text-center">
        {/* Child Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-sky-300 text-sky-900 text-xs sm:text-sm font-extrabold mb-3 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
          <span>Trilha de Aprendizado Mágico · Tela 5</span>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
        </div>

        {/* Top: Porquinho Comemorando */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="relative group">
            {/* Radiant golden halo */}
            <div className="absolute inset-0 rounded-full bg-sky-300/60 blur-xl pointer-events-none" />

            {/* Celebrating Piggy Image */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-b from-sky-100 via-pink-100 to-amber-100 p-1.5 overflow-hidden flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <img
                src={
                  imgError
                    ? 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=80'
                    : celebratingPiggyImg
                }
                alt="Porquinho comemorando"
                className="w-full h-full object-cover rounded-full select-none pointer-events-none"
                loading="eager"
                onError={() => setImgError(true)}
              />
            </div>

            {/* Floating party elements */}
            <span className="absolute -top-3 -right-2 text-3xl animate-bounce pointer-events-none z-20" style={{ animationDuration: '2s' }}>
              🎉
            </span>
            <span className="absolute -bottom-2 -left-2 text-2xl animate-bounce pointer-events-none z-20" style={{ animationDuration: '2.5s' }}>
              ⭐
            </span>
          </div>
        </div>

        {/* Título: PARABÉNS, [Nome da Criança]! VOCÊ ARRASOU! */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-2 drop-shadow-xs">
          PARABÉNS, {displayName}! VOCÊ ARRASOU!
        </h1>
        <p className="text-sm sm:text-base font-bold text-sky-900/90 max-w-lg mx-auto">
          Você completou as lições da semana e está dominando o poder de poupar!
        </p>
      </div>

      {/* Middle Section: Learning Trail (Trilha com 5 círculos e baú do tesouro) */}
      <div className="w-full max-w-2xl my-4 sm:my-6 px-2">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-3 border-sky-200 shadow-xl flex flex-col items-center">
          <div className="text-xs font-black text-sky-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Sua Trilha de Conquistas</span>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>

          {/* Gamified Trail Nodes: 1 to 5 + Treasure Chest */}
          <div className="w-full flex items-center justify-between relative max-w-xl mx-auto py-3">
            {/* Background connecting track line */}
            <div className="absolute top-1/2 left-6 right-8 -translate-y-1/2 h-2.5 bg-sky-100 rounded-full z-0 overflow-hidden border border-sky-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: isUnlocked ? '100%' : '78%' }}
              />
            </div>

            {/* Circles 1 to 4 (Golden Stars) */}
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 border-3 border-white shadow-lg flex flex-col items-center justify-center text-amber-950 font-black transform hover:scale-110 transition-transform">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 fill-amber-400 drop-shadow-2xs" />
                  <span className="text-[10px] font-black leading-none mt-0.5 text-amber-900">{step}</span>
                </div>
                <span className="text-[11px] font-extrabold text-amber-900 mt-1">
                  Lição {step}
                </span>
              </div>
            ))}

            {/* Circle 5 (Padlock that vanishes when unlocked) */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white shadow-lg flex flex-col items-center justify-center font-black transition-all duration-500 ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 text-amber-950 scale-110 ring-4 ring-amber-300'
                    : 'bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300 text-slate-600'
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="text-[10px] font-black leading-none mt-0.5 text-amber-900">5</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                    <span className="text-[10px] font-bold leading-none mt-0.5 text-slate-600">5</span>
                  </>
                )}
              </div>
              <span className={`text-[11px] font-extrabold mt-1 ${isUnlocked ? 'text-amber-900' : 'text-slate-500'}`}>
                {isUnlocked ? 'Desbloqueado!' : 'Lição 5'}
              </span>
            </div>

            {/* Treasure Chest at the end */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl transition-all duration-500 transform ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-yellow-300 via-amber-400 to-amber-500 scale-110 ring-4 ring-yellow-300 animate-bounce'
                    : 'bg-gradient-to-tr from-amber-100 to-amber-200'
                }`}
              >
                {isUnlocked ? (
                  <span title="Baú do Tesouro Aberto!">💎</span>
                ) : (
                  <span title="Baú do Tesouro Fechado">📦</span>
                )}
              </div>
              <span className="text-[11px] font-black text-amber-900 mt-1">
                {isUnlocked ? 'Tesouro Aberto!' : 'Baú Mágico'}
              </span>
            </div>
          </div>

          {/* Bottom Section inside Card: Golden Progress Bar with 'Semana 1 - Lição 4' */}
          <div className="w-full mt-6 pt-4 border-t border-sky-100">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black text-amber-900 mb-1.5 px-1">
              <span>{isUnlocked ? 'Semana 1 - Lição 5 Concluída! 🎉' : 'Semana 1 - Lição 4'}</span>
              <span className="tabular-nums font-extrabold text-amber-800">
                {isUnlocked ? '100% Completo' : '80% Completo'}
              </span>
            </div>

            {/* Golden Progress Bar */}
            <div className="w-full h-4 sm:h-5 rounded-full bg-amber-100 border-2 border-amber-300 p-0.5 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-700 flex items-center justify-end pr-2 text-[10px] text-amber-950 font-black shadow-xs"
                style={{ width: isUnlocked ? '100%' : '80%' }}
              >
                ✨
              </div>
            </div>
          </div>

          {/* Feedback banner when unlocked */}
          {isUnlocked && (
            <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 text-center animate-fade-in w-full">
              <p className="text-xs sm:text-sm font-black text-amber-950 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>O cadeado se abriu e o baú do tesouro revelou uma chuva mágica de moedas!</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Action Button: Botão azul 'CONTINUAR APRENDENDO!' */}
      <div className="w-full max-w-md flex flex-col items-center gap-3 my-2">
        {!isUnlocked ? (
          <button
            type="button"
            onClick={handleContinueLearning}
            className="w-full py-4 sm:py-5 px-8 rounded-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-black text-lg sm:text-2xl tracking-wide shadow-xl shadow-blue-500/30 border-4 border-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse-gentle flex items-center justify-center gap-3"
            aria-label="Continuar aprendendo e abrir o baú"
          >
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200 fill-yellow-300" />
            <span>CONTINUAR APRENDENDO!</span>
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200 fill-yellow-300" />
          </button>
        ) : (
          <div className="w-full flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              type="button"
              onClick={handleReplayRain}
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm border-2 border-white shadow-md flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Coins className="w-4 h-4" />
              <span>Chuva de Moedas Novamente! 🪙</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base border-3 border-white shadow-xl shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
            >
              <span>Ir para Meu Cofrinho</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Navigation: 'Voltar (Tela 4)' */}
      <div className="w-full max-w-2xl mt-4 pt-3 border-t border-sky-200/80 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            playPopSound();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs sm:text-sm border border-sky-200 shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar (Tela 4)</span>
        </button>

        {isUnlocked && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-sky-800 hover:text-sky-950 bg-sky-100 hover:bg-sky-200 px-4 py-2 rounded-full cursor-pointer transition-colors"
          >
            <span>Explorar os 3 Potes Mágicos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
