import React from 'react';
import { Star, Trophy, Sparkles, CheckCircle2, Lock, ArrowLeft, Award } from 'lucide-react';
import { Achievement, ScreenMode } from '../types';
import { playPopSound } from '../utils/sound';

interface RewardsPanelProps {
  stars: number;
  achievements: Achievement[];
  onBackToCofrinho: () => void;
  onNavigate: (screen: ScreenMode) => void;
  childName?: string;
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({
  stars,
  achievements,
  onBackToCofrinho,
  onNavigate,
  childName,
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  // Compute kid rank
  let rankTitle = childName ? `${childName}, o Poupador Curioso 🌱` : 'Poupador Curioso 🌱';
  let rankDesc = 'Você está começando a descobrir o poder do seu cofrinho!';
  let nextRankReq = '3 estrelas para subir de nível';
  if (stars >= 10) {
    rankTitle = childName ? `Mestre do Cofrinho: ${childName} 👑` : 'Mestre do Cofrinho Mágico 👑';
    rankDesc = 'Incrível! Você já é um campeão ou campeã de cuidar do dinheiro!';
    nextRankReq = 'Nível Máximo Conquistado!';
  } else if (stars >= 6) {
    rankTitle = childName ? `${childName}, Super Economista 🚀` : 'Super Economista 🚀';
    rankDesc = 'Você sabe planejar, poupar e tomar ótimas decisões!';
    nextRankReq = '10 estrelas para o título de Mestre';
  } else if (stars >= 3) {
    rankTitle = childName ? `${childName}, Guardião de Moedinhas 🪙` : 'Guardião de Moedinhas 🪙';
    rankDesc = 'Muito bem! Suas moedinhas estão seguras e crescendo!';
    nextRankReq = '6 estrelas para o nível Super Economista';
  }

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
      {/* Top Banner Navigation & Title */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            playPopSound();
            onBackToCofrinho();
          }}
          className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-sky-800 px-4 py-2 rounded-full border border-sky-200 font-bold text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Cofrinho</span>
        </button>

        <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full border border-amber-300 font-extrabold text-sm sm:text-base shadow-xs">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{stars} Estrelas Mágicas</span>
        </div>
      </div>

      {/* Hero Rank Card */}
      <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-pink-100 rounded-3xl p-6 border-2 border-amber-200/80 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-200 border-2 border-white shadow-md flex items-center justify-center text-4xl shrink-0">
            🏆
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
              Seu Nível Atual
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {rankTitle}
            </h2>
            <p className="text-sm text-slate-700 mt-1 max-w-md">
              {rankDesc}
            </p>
          </div>
        </div>

        {/* Badge progress tracker */}
        <div className="bg-white/80 rounded-2xl p-4 border border-amber-200 min-w-[220px] text-center">
          <div className="text-xs font-bold text-slate-600 mb-1">
            Selos Desbloqueados
          </div>
          <div className="text-2xl font-black text-amber-600 tabular-nums">
            {unlockedCount} / {achievements.length}
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">
            {nextRankReq}
          </div>
        </div>
      </div>

      {/* Grid of Virtual Stickers / Conquistas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Álbum de Selos Mágicos</span>
          </h3>
          <span className="text-xs font-semibold text-slate-600 bg-white/80 px-3 py-1 rounded-full border border-sky-100">
            Toque nos selos para ver como desbloquear
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl p-4 transition-all duration-200 ${
                item.unlocked
                  ? 'bg-white/95 border-2 border-amber-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                  : 'bg-white/50 border border-slate-200 opacity-75'
              }`}
            >
              {/* Unlocked / Locked status indicator */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                    item.unlocked
                      ? 'bg-gradient-to-br from-amber-100 to-yellow-200 border-2 border-white'
                      : 'bg-slate-100 grayscale opacity-60'
                  }`}
                >
                  {item.emoji}
                </div>

                <div className="flex flex-col items-end">
                  {item.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Conquistado!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Bloqueado
                    </span>
                  )}
                  <span className="text-xs font-black text-amber-600 mt-1 flex items-center gap-0.5">
                    +{item.rewardStars} <Star className="w-3 h-3 fill-amber-400 text-amber-500 inline" />
                  </span>
                </div>
              </div>

              {/* Title and Description */}
              <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.description}
              </p>

              {item.unlocked && item.unlockedAt && (
                <div className="text-[10px] text-amber-800/80 font-medium mt-3 pt-2 border-t border-amber-100">
                  Desbloqueado hoje! ✨
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Hint to Earn More Stars */}
      <div className="mt-8 bg-sky-50/90 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">💡</div>
          <div className="text-left">
            <h4 className="font-bold text-sky-950 text-sm">Quer mais estrelas?</h4>
            <p className="text-xs text-sky-800">
              Guarde moedinhas no cofrinho ou responda o Quiz "Necessidade vs Desejo" para ganhar mais selos!
            </p>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onNavigate('licoes')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold rounded-full text-xs shadow-xs cursor-pointer transition-transform active:scale-95"
          >
            Jogar Quiz (+2 ⭐)
          </button>
          <button
            onClick={() => onNavigate('cofrinho')}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-white font-extrabold rounded-full text-xs shadow-xs cursor-pointer transition-transform active:scale-95"
          >
            Guardar Moedas
          </button>
        </div>
      </div>
    </div>
  );
};
