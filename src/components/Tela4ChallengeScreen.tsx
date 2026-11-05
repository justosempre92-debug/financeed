import React, { useState } from 'react';
import { Lightbulb, Check, X, ArrowRight, ArrowLeft, Sparkles, Trophy, Star } from 'lucide-react';
import piggy3DImage from '../assets/images/porquinho_cartoon_3d_1793835969064.jpg';
import { playStarSound, playWrongSound, playPopSound } from '../utils/sound';

interface Tela4ChallengeScreenProps {
  childName?: string;
  onNext: () => void;
  onBack: () => void;
}

type OptionId = 1 | 2 | 3;

interface OptionConfig {
  id: OptionId;
  label: string;
  isCorrect: boolean;
}

const OPTIONS: OptionConfig[] = [
  { id: 1, label: 'Você terá 7 reais', isCorrect: false },
  { id: 2, label: 'Você terá 14 reais', isCorrect: true },
  { id: 3, label: 'Você terá 20 reais', isCorrect: false },
];

export const Tela4ChallengeScreen: React.FC<Tela4ChallengeScreenProps> = ({
  childName,
  onNext,
  onBack,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
  const [shakingOption, setShakingOption] = useState<OptionId | null>(null);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const handleSelectOption = (option: OptionConfig) => {
    setSelectedOption(option.id);

    if (option.isCorrect) {
      setHasWon(true);
      playStarSound();
    } else {
      setHasWon(false);
      playWrongSound();
      // Trigger shake animation
      setShakingOption(option.id);
      setTimeout(() => {
        setShakingOption(null);
      }, 600);
    }
  };

  const handleContinue = () => {
    playStarSound();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-4 py-6 max-w-4xl mx-auto w-full select-none relative overflow-hidden">
      {/* Confetti Explosion Animation Overlay on Victory */}
      {hasWon && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          {/* Confetti pieces in different positions, colors and delays */}
          {[...Array(35)].map((_, i) => {
            const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444', '#FBBF24'];
            const color = colors[i % colors.length];
            const left = `${(i * 100) / 35 + (i % 3) * 2}%`;
            const delay = `${(i % 7) * 0.15}s`;
            const duration = `${2 + (i % 4) * 0.4}s`;
            const size = (i % 3 === 0) ? 'w-3 h-5 rounded-xs' : (i % 2 === 0) ? 'w-3 h-3 rounded-full' : 'w-4 h-4 rounded-xs';

            return (
              <div
                key={i}
                className={`absolute top-0 animate-confetti shadow-xs ${size}`}
                style={{
                  left,
                  backgroundColor: color,
                  animationDelay: delay,
                  animationDuration: duration,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Top Section: Header Badge & Piggy with Lightbulb */}
      <div className="w-full flex flex-col items-center text-center">
        {/* Child greeting pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-3 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
          <span>{childName ? `Missão da Semana com ${childName}` : 'Missão da Semana'} · Tela 4</span>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
        </div>

        {/* Top: Cute Piggy image with Lightbulb icon */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="relative flex items-center">
            {/* Radiant golden halo */}
            <div className="absolute inset-0 rounded-full bg-amber-300/60 blur-xl pointer-events-none" />

            {/* Cute Piggy Image */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-b from-amber-100 via-yellow-100 to-orange-100 p-1.5 overflow-hidden flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <img
                src={
                  imgError
                    ? 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=80'
                    : piggy3DImage
                }
                alt="Porquinho fofo com lâmpada"
                className="w-full h-full object-cover rounded-full select-none pointer-events-none"
                loading="eager"
                onError={() => setImgError(true)}
              />
            </div>

            {/* Lightbulb Icon Badge beside/above the piggy */}
            <div className="relative z-20 -ml-4 -mt-16 sm:-ml-5 sm:-mt-20 bg-amber-400 rounded-full p-2 sm:p-2.5 border-3 border-white shadow-lg text-amber-950 animate-pulse flex items-center justify-center">
              <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-amber-950 fill-yellow-200" />
            </div>
          </div>
        </div>

        {/* Título: DESAFIO DA SEMANA! */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-2 drop-shadow-xs">
          DESAFIO DA SEMANA!
        </h1>

        {/* Subtítulo: Se você guardar 2 reais por dia, o que acontece depois de uma semana? */}
        <p className="text-base sm:text-lg md:text-xl font-extrabold text-amber-950 max-w-xl mx-auto leading-snug px-2">
          Se você guardar 2 reais por dia, o que acontece depois de uma semana?
        </p>

        {/* Helpful educational hint */}
        <span className="inline-block text-xs font-bold text-amber-800 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full mt-2 shadow-2xs">
          💡 Dica mágica: Uma semana tem 7 dias inteirinhos!
        </span>
      </div>

      {/* Middle Section: The Three Option Buttons */}
      <div className="w-full max-w-md my-4 flex flex-col gap-3.5 sm:gap-4">
        {OPTIONS.map((option) => {
          const isSelected = selectedOption === option.id;
          const isShaking = shakingOption === option.id;

          // Compute button color and icon state based on selection & correctness
          let btnClass = 'bg-white hover:bg-amber-50 text-slate-800 border-3 border-amber-300 shadow-md';
          let icon = null;

          if (isSelected) {
            if (option.isCorrect) {
              // Option 2 (Correct): bg-green-500, Check icon
              btnClass = 'bg-green-500 hover:bg-green-500 text-white border-3 border-green-600 ring-4 ring-green-300 shadow-xl shadow-green-500/30 scale-105';
              icon = <Check className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3] shrink-0" />;
            } else {
              // Option 1 or 3 (Incorrect): bg-red-500, X icon, shake
              btnClass = 'bg-red-500 hover:bg-red-500 text-white border-3 border-red-600 ring-4 ring-red-300 shadow-lg';
              icon = <X className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[3] shrink-0" />;
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option)}
              className={`w-full py-4 px-6 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-between transition-all duration-200 cursor-pointer transform active:scale-95 select-none ${btnClass} ${
                isShaking ? 'animate-shake' : ''
              }`}
              aria-label={`Opção ${option.id}: ${option.label}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 ${
                    isSelected
                      ? 'bg-white/20 text-white border-white'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {option.id}
                </span>
                <span className="tracking-wide">{option.label}</span>
              </div>

              {icon && <div className="ml-2 animate-bounce">{icon}</div>}
            </button>
          );
        })}

        {/* Feedback message banner */}
        {hasWon && (
          <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-950 p-4 rounded-2xl shadow-md text-center animate-fade-in mt-1">
            <div className="text-2xl mb-1">🎉 ⭐ 🪙</div>
            <p className="font-black text-base sm:text-lg">
              Parabéns, {childName || 'Pequeno Mestre'}! Você acertou!
            </p>
            <p className="text-xs sm:text-sm text-emerald-800 mt-0.5 font-medium">
              7 dias × R$ 2,00 por dia = <b>R$ 14,00</b> guardados no Cofrinho!
            </p>
          </div>
        )}

        {selectedOption && !hasWon && (
          <div className="bg-rose-50 border-2 border-rose-300 text-rose-950 p-3.5 rounded-2xl shadow-xs text-center animate-fade-in mt-1">
            <p className="font-extrabold text-sm">
              Ops! Tente mais uma vez!
            </p>
            <p className="text-xs text-rose-800 mt-0.5">
              Dica: Conte de 2 em 2 para cada um dos 7 dias da semana: 2, 4, 6, 8...
            </p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-2xl mt-4 pt-4 border-t border-amber-200/80 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            playPopSound();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs sm:text-sm border border-amber-200 shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar (Tela 3)</span>
        </button>

        {/* Botão 'Continuar': só aparece quando o usuário acertar, levando à Tela 5 */}
        {hasWon && (
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-500/30 border-3 border-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all animate-pulse-gentle ml-auto"
            aria-label="Continuar para a Tela 5"
          >
            <span>Continuar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
