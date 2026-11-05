import React, { useState } from 'react';
import { PiggyBank, Heart, Sparkles, Plus, Coins, ArrowRight, Target, CheckCircle2 } from 'lucide-react';
import { CutePiggy } from './CutePiggy';
import { JarType, SavingsGoal } from '../types';
import { playCoinSound, playPopSound, playStarSound } from '../utils/sound';

interface CofrinhoPlaygroundProps {
  jarBalances: Record<JarType, number>;
  onDeposit: (jar: JarType, amount: number) => void;
  activeGoal: SavingsGoal;
  onUpdateGoal: (newGoal: Partial<SavingsGoal>) => void;
  onGoToRewards: () => void;
  onGoToQuiz: () => void;
  childName?: string;
}

export const CofrinhoPlayground: React.FC<CofrinhoPlaygroundProps> = ({
  jarBalances,
  onDeposit,
  activeGoal,
  onUpdateGoal,
  onGoToRewards,
  onGoToQuiz,
  childName,
}) => {
  const [selectedJar, setSelectedJar] = useState<JarType>('guardar');
  const [recentDepositNote, setRecentDepositNote] = useState<string | null>(null);
  const [coinAnimating, setCoinAnimating] = useState(false);

  const totalMoney = jarBalances.guardar + jarBalances.gastar + jarBalances.ajudar;

  const handleAddCoin = (amount: number) => {
    setCoinAnimating(true);
    playCoinSound();
    onDeposit(selectedJar, amount);

    const jarLabels: Record<JarType, string> = {
      guardar: 'Cofrinho de Guardar',
      gastar: 'Cofrinho de Gastar',
      ajudar: 'Cofrinho de Ajudar',
    };

    setRecentDepositNote(`+ R$ ${amount.toFixed(2).replace('.', ',')} no ${jarLabels[selectedJar]}!`);
    setTimeout(() => setCoinAnimating(false), 600);
    setTimeout(() => setRecentDepositNote(null), 2500);
  };

  const goalProgress = Math.min(
    100,
    Math.round((jarBalances.guardar / activeGoal.targetAmount) * 100)
  );

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
      {/* Motivational Child Greeting Banner */}
      <div className="bg-white/80 backdrop-blur-xs border border-sky-200 rounded-3xl p-4 sm:p-5 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl shrink-0">
            🐷
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {childName ? `Olá, ${childName}! Seu Cofrinho Mágico está pronto!` : 'Seu Cofrinho Mágico está pronto!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {childName
                ? `Vamos cuidar bem do seu dinheirinho, ${childName}? Escolha uma moeda para começar!`
                : 'Escolha uma moedinha abaixo para alimentar o porquinho e ver suas metas crescerem!'}
            </p>
          </div>
        </div>

        {/* Quick action shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playPopSound();
              onGoToQuiz();
            }}
            className="px-3.5 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 border border-purple-200 shadow-xs"
          >
            <span>🎯 Missão: Necessidade ou Desejo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Piggy & Deposit Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white/85 backdrop-blur-xs rounded-3xl p-5 sm:p-6 border-2 border-pink-100 shadow-md flex flex-col items-center">
          {/* Jar Selector Tabs */}
          <div className="w-full mb-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide text-center mb-2">
              Escolha onde quer guardar sua moedinha:
            </div>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/90 rounded-2xl">
              <button
                onClick={() => {
                  playPopSound();
                  setSelectedJar('guardar');
                }}
                className={`py-2 px-2 rounded-xl font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer ${
                  selectedJar === 'guardar'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🐷</span>
                <span>Guardar (Sonhos)</span>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setSelectedJar('gastar');
                }}
                className={`py-2 px-2 rounded-xl font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer ${
                  selectedJar === 'gastar'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🍦</span>
                <span>Gastar (Dia a Dia)</span>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setSelectedJar('ajudar');
                }}
                className={`py-2 px-2 rounded-xl font-bold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all cursor-pointer ${
                  selectedJar === 'ajudar'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>💖</span>
                <span>Ajudar (Doar)</span>
              </button>
            </div>
          </div>

          {/* Central Cute Piggy with live money feedback */}
          <div className="my-2 relative flex flex-col items-center">
            {recentDepositNote && (
              <div className="absolute -top-8 z-20 bg-emerald-500 text-white font-black text-sm px-4 py-1.5 rounded-full shadow-lg animate-bounce">
                {recentDepositNote}
              </div>
            )}
            <CutePiggy
              size="large"
              interactive={true}
              showCoinAnimation={coinAnimating}
            />

            {/* Total Display under Piggy */}
            <div className="mt-2 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total acumulado em todos os cofrinhos
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 tabular-nums">
                R$ {totalMoney.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>

          {/* Coin Deposit Buttons */}
          <div className="w-full mt-4 pt-4 border-t border-slate-100">
            <div className="text-center text-xs font-bold text-slate-600 mb-3">
              Toque em uma moeda para colocar no Cofrinho:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* R$ 1,00 */}
              <button
                onClick={() => handleAddCoin(1)}
                className="group relative p-3 rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 border-2 border-amber-300 shadow-xs hover:shadow-md active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-amber-500 text-amber-950 font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  1
                </div>
                <span className="text-xs font-extrabold text-amber-900 mt-1.5">+ R$ 1,00</span>
              </button>

              {/* R$ 2,00 */}
              <button
                onClick={() => handleAddCoin(2)}
                className="group relative p-3 rounded-2xl bg-gradient-to-b from-sky-100 to-sky-200 hover:from-sky-200 hover:to-sky-300 border-2 border-sky-300 shadow-xs hover:shadow-md active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-sky-400 border-2 border-sky-500 text-sky-950 font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  2
                </div>
                <span className="text-xs font-extrabold text-sky-900 mt-1.5">+ R$ 2,00</span>
              </button>

              {/* R$ 5,00 */}
              <button
                onClick={() => handleAddCoin(5)}
                className="group relative p-3 rounded-2xl bg-gradient-to-b from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 border-2 border-purple-300 shadow-xs hover:shadow-md active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-purple-500 text-purple-950 font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  5
                </div>
                <span className="text-xs font-extrabold text-purple-900 mt-1.5">+ R$ 5,00</span>
              </button>

              {/* R$ 10,00 */}
              <button
                onClick={() => handleAddCoin(10)}
                className="group relative p-3 rounded-2xl bg-gradient-to-b from-rose-100 to-rose-200 hover:from-rose-200 hover:to-rose-300 border-2 border-rose-300 shadow-xs hover:shadow-md active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-rose-400 border-2 border-rose-500 text-rose-950 font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  10
                </div>
                <span className="text-xs font-extrabold text-rose-900 mt-1.5">+ R$ 10,00</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: The 3 Magic Pots + Active Goal (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Goal Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeGoal.emoji}</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800">
                    Sua Meta dos Sonhos
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {activeGoal.title}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-700">Meta</span>
                <div className="text-sm font-black text-slate-900">
                  R$ {activeGoal.targetAmount.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Guardado para o sonho:</span>
                <span className="text-amber-800 font-extrabold tabular-nums">
                  R$ {jarBalances.guardar.toFixed(2).replace('.', ',')} ({goalProgress}%)
                </span>
              </div>
              <div className="w-full bg-amber-200/60 h-4 rounded-full overflow-hidden p-0.5 border border-amber-300">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                  style={{ width: `${Math.max(5, goalProgress)}%` }}
                >
                  {goalProgress >= 100 && <span className="text-[10px]">✨</span>}
                </div>
              </div>
            </div>

            {/* Goal achieved celebration */}
            {goalProgress >= 100 ? (
              <div className="mt-3 bg-emerald-100 border border-emerald-300 rounded-xl p-2.5 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Parabéns! Você alcançou o seu sonho! 🎉</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-600 mt-2">
                Faltam apenas R$ {Math.max(0, activeGoal.targetAmount - jarBalances.guardar).toFixed(2).replace('.', ',')} para alcançar esse objetivo!
              </p>
            )}

            {/* Quick goal selector presets */}
            <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600">Trocar meta:</span>
              <button
                onClick={() =>
                  onUpdateGoal({
                    title: 'Bicicleta Veloz',
                    targetAmount: 40,
                    emoji: '🚲',
                    description: 'Uma linda bicicleta para passear no parque!',
                  })
                }
                className="text-xs bg-white px-2 py-0.5 rounded-lg border border-amber-300 font-medium hover:bg-amber-100 cursor-pointer"
              >
                🚲 Bicicleta (R$40)
              </button>
              <button
                onClick={() =>
                  onUpdateGoal({
                    title: 'Super Jogo',
                    targetAmount: 20,
                    emoji: '🎲',
                    description: 'Jogo de tabuleiro divertido com amigos!',
                  })
                }
                className="text-xs bg-white px-2 py-0.5 rounded-lg border border-amber-300 font-medium hover:bg-amber-100 cursor-pointer"
              >
                🎲 Jogo (R$20)
              </button>
            </div>
          </div>

          {/* The 3 Potes Breakdown Cards */}
          <div className="bg-white/80 rounded-3xl p-5 border border-sky-100 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>O Segredo dos 3 Potes Mágicos</span>
            </h4>

            {/* Pote 1: Guardar */}
            <div
              onClick={() => setSelectedJar('guardar')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedJar === 'guardar'
                  ? 'bg-pink-50 border-pink-400 ring-2 ring-pink-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-pink-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center text-lg">
                  🐷
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    1. Pote de Guardar (Poupar)
                  </div>
                  <div className="text-[11px] text-slate-500">Para sonhos maiores no futuro</div>
                </div>
              </div>
              <div className="text-right font-extrabold text-pink-700 text-sm tabular-nums">
                R$ {jarBalances.guardar.toFixed(2).replace('.', ',')}
              </div>
            </div>

            {/* Pote 2: Gastar */}
            <div
              onClick={() => setSelectedJar('gastar')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedJar === 'gastar'
                  ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-sky-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-lg">
                  🍦
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    2. Pote de Gastar (Desejos)
                  </div>
                  <div className="text-[11px] text-slate-500">Para um sorvete, gibi ou gibi</div>
                </div>
              </div>
              <div className="text-right font-extrabold text-sky-700 text-sm tabular-nums">
                R$ {jarBalances.gastar.toFixed(2).replace('.', ',')}
              </div>
            </div>

            {/* Pote 3: Ajudar */}
            <div
              onClick={() => setSelectedJar('ajudar')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedJar === 'ajudar'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
                  💖
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    3. Pote de Ajudar (Doar)
                  </div>
                  <div className="text-[11px] text-slate-500">Para fazer o bem a outras pessoas</div>
                </div>
              </div>
              <div className="text-right font-extrabold text-emerald-700 text-sm tabular-nums">
                R$ {jarBalances.ajudar.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
