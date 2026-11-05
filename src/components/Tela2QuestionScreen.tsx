import React, { useState } from 'react';
import { HelpCircle, PiggyBank, IceCream, Bot, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import piggy3DImage from '../assets/images/porquinho_cartoon_3d_1793835969064.jpg';
import { playPopSound, playStarSound } from '../utils/sound';

interface Tela2QuestionScreenProps {
  childName?: string;
  onNext: () => void;
  onBack?: () => void;
}

type ChoiceId = 'azul' | 'laranja' | 'verde';

export const Tela2QuestionScreen: React.FC<Tela2QuestionScreenProps> = ({
  childName,
  onNext,
  onBack,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<ChoiceId | null>(null);
  const [imgError, setImgError] = useState(false);

  const handleSelect = (choice: ChoiceId) => {
    setSelectedChoice(choice);
    if (choice === 'azul') {
      playStarSound();
    } else {
      playPopSound();
    }
  };

  const handleNextClick = () => {
    playStarSound();
    onNext();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-4 py-6 max-w-4xl mx-auto w-full select-none">
      {/* Top Section: Header Badge & Piggy Image with HelpCircle */}
      <div className="w-full flex flex-col items-center text-center">
        {/* Child greeting or step badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-extrabold mb-3 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-300" />
          <span>
            {childName ? `Desafio Mágico de ${childName}` : 'Desafio Mágico do Cofrinho'} · Tela 2
          </span>
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-300" />
        </div>

        {/* Top: <img> tag for cute piggy + HelpCircle icon beside it */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="relative flex items-center">
            {/* Soft radiant glow */}
            <div className="absolute inset-0 rounded-full bg-emerald-200/60 blur-xl pointer-events-none" />

            {/* Cute Piggy Image */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl bg-gradient-to-b from-pink-100 to-rose-200 p-1.5 overflow-hidden flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <img
                src={
                  imgError
                    ? 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=80'
                    : piggy3DImage
                }
                alt="Porquinho fofo estilo cartoon 3D"
                className="w-full h-full object-cover rounded-full select-none pointer-events-none"
                loading="eager"
                onError={() => setImgError(true)}
              />
            </div>

            {/* HelpCircle icon beside the piggy */}
            <div className="relative z-20 -ml-4 -mt-16 sm:-ml-5 sm:-mt-20 bg-white rounded-full p-1.5 sm:p-2 border-3 border-emerald-400 shadow-lg text-emerald-600 animate-pulse">
              <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 fill-emerald-100" />
            </div>
          </div>
        </div>

        {/* Title: O QUE VOCÊ FARIA COM 5 REAIS? */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-4 drop-shadow-xs">
          O QUE VOCÊ FARIA COM 5 REAIS?
        </h1>
      </div>

      {/* Middle Section: Speech Bubble (Balão de Fala) above the buttons */}
      <div className="w-full max-w-2xl my-2 flex flex-col items-center">
        <div className="relative w-full">
          {/* Speech bubble card */}
          <div
            className={`w-full p-4 sm:p-5 rounded-3xl border-3 shadow-lg transition-all duration-300 ${
              selectedChoice === 'azul'
                ? 'bg-blue-50/95 border-blue-400 text-blue-950 shadow-blue-200/50'
                : selectedChoice === 'laranja'
                ? 'bg-orange-50/95 border-orange-400 text-orange-950 shadow-orange-200/50'
                : selectedChoice === 'verde'
                ? 'bg-emerald-50/95 border-emerald-400 text-emerald-950 shadow-emerald-200/50'
                : 'bg-white/95 border-emerald-300 text-slate-700 shadow-emerald-100/50'
            }`}
          >
            {selectedChoice === null && (
              <div className="text-center py-2">
                <span className="text-2xl block mb-1">💬</span>
                <p className="font-extrabold text-sm sm:text-base text-emerald-900">
                  {childName ? `${childName}, escolha` : 'Escolha'} uma das opções abaixo para ver o que o Cofrinho Mágico diz! 👇
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Não tem resposta errada, o importante é pensar sobre o dinheiro!
                </p>
              </div>
            )}

            {selectedChoice === 'azul' && (
              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in text-left">
                <span className="text-3xl sm:text-4xl shrink-0">🐷</span>
                <div className="flex-1">
                  <div className="text-xs font-black uppercase tracking-wider text-blue-600 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Opção Azul: Guardar no cofrinho</span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-black text-blue-950 leading-snug">
                    "Boa escolha! O importante é pensar antes de gastar!"
                  </p>
                  <p className="text-xs text-blue-800 mt-1.5 font-medium">
                    ✨ Guardar 5 reais hoje ajuda você a juntar para comprar coisas muito maiores depois!
                  </p>
                </div>
              </div>
            )}

            {selectedChoice === 'laranja' && (
              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in text-left">
                <span className="text-3xl sm:text-4xl shrink-0">🍦</span>
                <div className="flex-1">
                  <div className="text-xs font-black uppercase tracking-wider text-orange-600 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Opção Laranja: Comprar um sorvete</span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-black text-orange-950 leading-snug">
                    "Hummm, sorvete é uma delícia! Mas lembre-se: ele dura só um pouquinho e o dinheiro vai embora rapidinho."
                  </p>
                  <p className="text-xs text-orange-800 mt-1.5 font-medium">
                    🍨 Gastar com momentos gostosos é bom, mas é sábio não gastar tudo de uma vez só!
                  </p>
                </div>
              </div>
            )}

            {selectedChoice === 'verde' && (
              <div className="flex items-start gap-3 sm:gap-4 animate-fade-in text-left">
                <span className="text-3xl sm:text-4xl shrink-0">🤖</span>
                <div className="flex-1">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Opção Verde: Comprar um brinquedo</span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-black text-emerald-950 leading-snug">
                    "Eu amo brinquedos! Com 5 reais talvez dê para comprar um pequenininho, mas se você guardar mais um pouco, pode comprar um bem legal depois!"
                  </p>
                  <p className="text-xs text-emerald-800 mt-1.5 font-medium">
                    🚀 Paciência para poupar é o superpoder de quem quer brinquedos incríveis!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Speech bubble pointer / triangle tail pointing towards the buttons below */}
          <div className="w-0 h-0 mx-auto border-x-12 border-x-transparent border-t-12 border-t-emerald-300 -mt-0.5" />
        </div>

        {/* Three Big Rounded-Full Pill Buttons */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-4 mt-4">
          {/* 1. Azul (bg-blue-400), PiggyBank, 'Guardar no cofrinho' */}
          <button
            type="button"
            onClick={() => handleSelect('azul')}
            className={`w-full py-4 px-6 sm:px-8 rounded-full bg-blue-400 hover:bg-blue-300 active:bg-blue-500 text-white font-extrabold text-base sm:text-xl flex items-center justify-center gap-3 sm:gap-4 shadow-lg shadow-blue-400/30 border-3 border-white transform hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer ${
              selectedChoice === 'azul'
                ? 'ring-4 ring-offset-2 ring-blue-500 bg-blue-500 scale-[1.02]'
                : ''
            }`}
            aria-label="Opção 1: Guardar no cofrinho"
          >
            <PiggyBank className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-blue-100" />
            <span className="tracking-wide">Guardar no cofrinho</span>
          </button>

          {/* 2. Laranja (bg-orange-400), IceCream, 'Comprar um sorvete' */}
          <button
            type="button"
            onClick={() => handleSelect('laranja')}
            className={`w-full py-4 px-6 sm:px-8 rounded-full bg-orange-400 hover:bg-orange-300 active:bg-orange-500 text-white font-extrabold text-base sm:text-xl flex items-center justify-center gap-3 sm:gap-4 shadow-lg shadow-orange-400/30 border-3 border-white transform hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer ${
              selectedChoice === 'laranja'
                ? 'ring-4 ring-offset-2 ring-orange-500 bg-orange-500 scale-[1.02]'
                : ''
            }`}
            aria-label="Opção 2: Comprar um sorvete"
          >
            <IceCream className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-orange-100" />
            <span className="tracking-wide">Comprar um sorvete</span>
          </button>

          {/* 3. Verde (bg-green-400), Bot, 'Comprar um brinquedo' */}
          <button
            type="button"
            onClick={() => handleSelect('verde')}
            className={`w-full py-4 px-6 sm:px-8 rounded-full bg-green-400 hover:bg-green-300 active:bg-green-500 text-white font-extrabold text-base sm:text-xl flex items-center justify-center gap-3 sm:gap-4 shadow-lg shadow-green-400/30 border-3 border-white transform hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer ${
              selectedChoice === 'verde'
                ? 'ring-4 ring-offset-2 ring-green-500 bg-green-500 scale-[1.02]'
                : ''
            }`}
            aria-label="Opção 3: Comprar um brinquedo"
          >
            <Bot className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-green-100" />
            <span className="tracking-wide">Comprar um brinquedo</span>
          </button>
        </div>
      </div>

      {/* Footer Navigation: 'Próximo' to advance to Tela 3 + optional 'Voltar' */}
      <div className="w-full max-w-2xl mt-6 pt-4 border-t border-emerald-200/80 flex items-center justify-between gap-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs sm:text-sm border border-emerald-200 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : (
          <div />
        )}

        {/* Botão 'Próximo' para avançar para a Tela 3 */}
        <button
          type="button"
          onClick={handleNextClick}
          className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-500/30 border-3 border-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all animate-pulse-gentle ml-auto"
          aria-label="Avançar para a Tela 3"
        >
          <span>Próximo</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
