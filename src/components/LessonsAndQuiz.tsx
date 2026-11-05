import React, { useState } from 'react';
import { Star, ArrowRight, RotateCcw, Target, Sparkles, ShieldCheck, Gift, Coins, CheckCircle, HelpCircle } from 'lucide-react';
import { playStarSound, playCoinSound, playPopSound } from '../utils/sound';

interface MissionItem {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  type: 'necessidade' | 'desejo';
  correctFeedback: string;
  incorrectFeedback: string;
}

interface LessonsAndQuizProps {
  onEarnStar?: (starsToAdd: number) => void;
  onRewardEarned?: (stars: number, money: number) => void;
  onEarnReward?: (stars: number, money: number) => void;
  onQuizCompleted: () => void;
  onBackToCofrinho: () => void;
  childName?: string;
}

const MISSION_ITEMS: MissionItem[] = [
  {
    id: 'm1',
    name: 'Escova de dentes',
    subtitle: 'Para escovar os dentinhos após o café, almoço e jantar.',
    emoji: '🪥',
    type: 'necessidade',
    correctFeedback: 'Muito bem! Escova de dentes é uma necessidade! Ela cuida da saúde da nossa boquinha e previne cáries!',
    incorrectFeedback: 'Quase lá! Escova de dentes é uma necessidade! Precisamos dela todos os dias para cuidar da nossa saúde bucal.',
  },
  {
    id: 'm2',
    name: 'Videogame',
    subtitle: 'Um console ou joguinho super divertido para brincar com os amigos.',
    emoji: '🎮',
    type: 'desejo',
    correctFeedback: 'Muito bem! Videogame é um desejo! É super divertido, mas podemos juntar moedinhas no cofrinho para comprar!',
    incorrectFeedback: 'Quase! Videogame é super legal, mas é um desejo: nós não precisamos dele para viver ou ter saúde.',
  },
  {
    id: 'm3',
    name: 'Casaco no frio',
    subtitle: 'Uma blusa quentinha para quando bater aquele vento gelado de inverno.',
    emoji: '🧥',
    type: 'necessidade',
    correctFeedback: 'Muito bem! Casaco no frio é uma necessidade! Ele nos mantém aquecidos e nos protege de ficar doentes!',
    incorrectFeedback: 'Quase lá! Casaco no frio é uma necessidade para não passar frio e proteger nossa saúde!',
  },
  {
    id: 'm4',
    name: 'Sorvete',
    subtitle: 'Uma casquinha ou picolé delicioso num dia bem quente de sol.',
    emoji: '🍦',
    type: 'desejo',
    correctFeedback: 'Muito bem! Sorvete é gostoso, mas é um desejo: uma sobremesa especial que saboreamos de vez em quando!',
    incorrectFeedback: 'Quase! Sorvete é gostoso, mas é um desejo, não precisamos dele para viver.',
  },
  {
    id: 'm5',
    name: 'Comida saudável e água',
    subtitle: 'Arroz, feijão, frutinhas e água pura para crescer forte e esperto.',
    emoji: '🥗',
    type: 'necessidade',
    correctFeedback: 'Muito bem! Alimentação saudável e água são necessidades para termos energia e vida!',
    incorrectFeedback: 'Quase lá! Comida nutritiva e água fresca são necessidades fundamentais para nosso corpinho continuar forte!',
  },
  {
    id: 'm6',
    name: 'Brinquedo caro da TV',
    subtitle: 'Aquele brinquedo com luzes e sons que apareceu na propaganda.',
    emoji: '🤖',
    type: 'desejo',
    correctFeedback: 'Muito bem! É um desejo! Podemos guardar moedinhas no pote de Guardar até conseguir comprar sem pressa!',
    incorrectFeedback: 'Quase! Brinquedos são super divertidos, mas são desejos que podemos planejar no cofrinho.',
  },
];

export const LessonsAndQuiz: React.FC<LessonsAndQuizProps> = ({
  onEarnStar,
  onRewardEarned,
  onEarnReward,
  onQuizCompleted,
  onBackToCofrinho,
  childName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredState, setAnsweredState] = useState<{
    selected: 'necessidade' | 'desejo';
    isCorrect: boolean;
  } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionStars, setSessionStars] = useState(0);
  const [sessionMoney, setSessionMoney] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = MISSION_ITEMS[currentIndex];

  const handleChoice = (choice: 'necessidade' | 'desejo') => {
    if (answeredState !== null) return;

    const isCorrect = choice === currentItem.type;
    setAnsweredState({ selected: choice, isCorrect });

    if (isCorrect) {
      playStarSound();
      playCoinSound();
      setShowCelebration(true);
      setCorrectCount((prev) => prev + 1);
      setSessionStars((prev) => prev + 1);
      setSessionMoney((prev) => prev + 1.0);

      // Award 1 Star and R$ 1,00
      const rewardCb = onEarnReward || onRewardEarned;
      if (rewardCb) {
        rewardCb(1, 1.0);
      } else if (onEarnStar) {
        onEarnStar(1);
      }

      // Hide active particle celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } else {
      playPopSound();
    }
  };

  const handleNext = () => {
    playPopSound();
    setShowCelebration(false);

    if (currentIndex < MISSION_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnsweredState(null);
    } else {
      setIsFinished(true);
      onQuizCompleted();
    }
  };

  const handleRestart = () => {
    playPopSound();
    setCurrentIndex(0);
    setAnsweredState(null);
    setShowCelebration(false);
    setCorrectCount(0);
    setSessionStars(0);
    setSessionMoney(0);
    setIsFinished(false);
  };

  return (
    <div className="relative flex-1 max-w-4xl mx-auto w-full px-4 py-5 flex flex-col justify-center">
      {/* Floating Animated Coins Falling & Stars Rising Overlay */}
      {showCelebration && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          {/* Shower of Coins Falling Down */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={`coin-${i}`}
                className="absolute animate-coin-fall-shower flex items-center justify-center"
                style={{
                  top: `${Math.random() * 20}%`,
                  left: `${6 + (i * 7.5) + (Math.random() * 4 - 2)}%`,
                  animationDelay: `${(i % 5) * 0.18}s`,
                  animationDuration: `${2 + Math.random() * 0.8}s`,
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 border-2 border-amber-600 shadow-lg flex items-center justify-center font-black text-amber-900 text-xs sm:text-sm">
                  R$ 1
                </div>
              </div>
            ))}
          </div>

          {/* Stars Rising to the Sky */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute animate-star-rise flex items-center justify-center"
                style={{
                  bottom: `${15 + Math.random() * 25}%`,
                  left: `${10 + (i * 8.5) + (Math.random() * 6 - 3)}%`,
                  animationDelay: `${(i % 4) * 0.22}s`,
                  animationDuration: `${1.8 + Math.random() * 0.7}s`,
                }}
              >
                <span className="text-3xl sm:text-4xl filter drop-shadow-md">⭐</span>
              </div>
            ))}
          </div>

          {/* Floating Reward Card Announcement */}
          <div className="animate-bounce z-50 bg-white/95 backdrop-blur-md px-6 py-4 rounded-3xl border-4 border-amber-400 shadow-2xl flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">🎉</span>
            <div>
              <div className="text-sm font-extrabold text-amber-800 uppercase tracking-wider">
                Recompensa Mágica Ganha!
              </div>
              <div className="flex items-center gap-2 mt-0.5 font-black text-base sm:text-lg text-slate-900">
                <span className="inline-flex items-center gap-1 text-amber-600">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  +1 Estrela
                </span>
                <span className="text-slate-300">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <Coins className="w-5 h-5 text-emerald-600" />
                  +R$ 1,00 no Cofrinho!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Mission Header */}
      <div className="bg-white/85 backdrop-blur-xs rounded-3xl p-4 sm:p-5 border border-sky-200 shadow-xs mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-black shadow-xs mb-1">
            <Target className="w-3.5 h-3.5 text-purple-700" />
            <span>{childName ? `Missão Especial de ${childName}` : 'Missão Especial'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Missão: Necessidade ou Desejo?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Descubra o que a gente precisa para viver bem e o que é um desejo que podemos planejar e poupar!
          </p>
        </div>

        {/* Current score tracker */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 font-extrabold text-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>+{sessionStars}</span>
          </div>
          <div className="flex items-center gap-1 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300 font-extrabold text-xs">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>+R$ {sessionMoney.toFixed(2).replace('.', ',')}</span>
          </div>
          <button
            onClick={onBackToCofrinho}
            className="text-xs font-bold text-sky-800 bg-sky-100 hover:bg-sky-200 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
          >
            Ver Cofrinho 🐷
          </button>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 sm:p-8 border-2 border-purple-200 shadow-lg text-center max-w-2xl mx-auto w-full transition-all">
          {/* Progress dots */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-5">
            <span>Item {currentIndex + 1} de {MISSION_ITEMS.length}</span>
            <div className="flex items-center gap-1.5">
              {MISSION_ITEMS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-purple-600'
                      : idx < currentIndex
                      ? 'w-2.5 bg-purple-300'
                      : 'w-2.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Item Card */}
          <div className="py-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-sky-100 to-purple-100 border-2 border-purple-200 flex items-center justify-center text-5xl sm:text-6xl shadow-md animate-bounce" style={{ animationDuration: '3.5s' }}>
              {currentItem.emoji}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 tracking-tight">
              {currentItem.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mt-1 font-medium">
              {currentItem.subtitle}
            </p>
          </div>

          {/* Decision Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* NECESSIDADE (AZUL) */}
            <button
              disabled={answeredState !== null}
              onClick={() => handleChoice('necessidade')}
              className={`p-4 sm:p-5 rounded-2xl font-black text-base sm:text-lg flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-b-4 shadow-md ${
                answeredState === null
                  ? 'bg-blue-500 hover:bg-blue-600 active:scale-95 text-white border-blue-700 hover:shadow-lg'
                  : currentItem.type === 'necessidade'
                  ? 'bg-blue-600 text-white border-blue-800 ring-4 ring-blue-200'
                  : 'bg-slate-100 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span>É uma Necessidade</span>
              </div>
              <span className="text-xs font-semibold opacity-90">
                (Azul · Essencial para viver bem)
              </span>
            </button>

            {/* DESEJO (LARANJA) */}
            <button
              disabled={answeredState !== null}
              onClick={() => handleChoice('desejo')}
              className={`p-4 sm:p-5 rounded-2xl font-black text-base sm:text-lg flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-b-4 shadow-md ${
                answeredState === null
                  ? 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white border-orange-700 hover:shadow-lg'
                  : currentItem.type === 'desejo'
                  ? 'bg-orange-600 text-white border-orange-800 ring-4 ring-orange-200'
                  : 'bg-slate-100 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Gift className="w-6 h-6" />
                <span>É um Desejo</span>
              </div>
              <span className="text-xs font-semibold opacity-90">
                (Laranja · Muito legal, dá pra poupar)
              </span>
            </button>
          </div>

          {/* Feedback & Recompensa Box */}
          {answeredState && (
            <div
              className={`mt-6 p-4 sm:p-5 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all shadow-sm ${
                answeredState.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="text-3xl shrink-0">
                {answeredState.isCorrect ? '🌟' : '💡'}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="font-black text-sm sm:text-base">
                    {answeredState.isCorrect ? (
                      <span className="text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        {currentItem.correctFeedback}
                      </span>
                    ) : (
                      <span className="text-amber-800 flex items-center gap-1.5">
                        <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        {currentItem.incorrectFeedback}
                      </span>
                    )}
                  </div>
                </div>

                {answeredState.isCorrect && (
                  <div className="mt-2 inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-900 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-200">
                    <span>✨ Recompensa creditada: +1 Estrela & +R$ 1,00 no seu Cofrinho!</span>
                  </div>
                )}

                <div className="mt-4 text-right">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm rounded-full shadow-md cursor-pointer transition-transform active:scale-95"
                  >
                    <span>{currentIndex < MISSION_ITEMS.length - 1 ? 'Próximo Item' : 'Concluir Missão'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mission Finished Summary */
        <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl text-center max-w-lg mx-auto w-full">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-300 via-yellow-300 to-amber-200 flex items-center justify-center text-5xl shadow-md mb-4 animate-bounce">
            🎉
          </div>

          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Missão Cumprida com Sucesso!
          </span>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {childName ? `Sensacional, ${childName}!` : 'Sensacional!'}
          </h3>

          <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Você classificou todos os itens e aprendeu a cuidar do seu dinheiro como um verdadeiro campeão!
          </p>

          {/* Summary Box with Earned Rewards */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200 flex items-center justify-around gap-2">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-500 uppercase">Acertos</div>
              <div className="text-xl sm:text-2xl font-black text-purple-700">
                {correctCount} / {MISSION_ITEMS.length}
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div className="text-center">
              <div className="text-xs font-bold text-slate-500 uppercase">Estrelas</div>
              <div className="text-xl sm:text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                +{sessionStars}
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div className="text-center">
              <div className="text-xs font-bold text-slate-500 uppercase">Dinheiro Ganho</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 flex items-center justify-center gap-1">
                <Coins className="w-5 h-5 text-emerald-600" />
                R$ {sessionMoney.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-full text-sm cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </button>

            <button
              onClick={onBackToCofrinho}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-full text-sm shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <span>Ver Meu Cofrinho</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
