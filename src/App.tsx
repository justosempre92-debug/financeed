/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenMode, Achievement, JarType, SavingsGoal } from './types';
import { SkyBackground } from './components/SkyBackground';
import { HeaderNav } from './components/HeaderNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Tela2QuestionScreen } from './components/Tela2QuestionScreen';
import { Tela3AudioStoryScreen } from './components/Tela3AudioStoryScreen';
import { Tela4ChallengeScreen } from './components/Tela4ChallengeScreen';
import { Tela5ProgressScreen } from './components/Tela5ProgressScreen';
import { CofrinhoPlayground } from './components/CofrinhoPlayground';
import { RewardsPanel } from './components/RewardsPanel';
import { LessonsAndQuiz } from './components/LessonsAndQuiz';
import { CelebrationToast } from './components/CelebrationToast';
import { playStarSound, playAchievementSound, setSoundEnabled, isSoundEnabled } from './utils/sound';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'Primeiro Passo Mágico',
    description: 'Você clicou em VAMOS LÁ! e começou a sua grande jornada financeira!',
    emoji: '⭐',
    rewardStars: 1,
    unlocked: false,
  },
  {
    id: 'first_coin',
    title: 'Primeira Moedinha',
    description: 'Alimentou o Cofrinho com sua primeira moeda!',
    emoji: '🪙',
    rewardStars: 1,
    unlocked: false,
  },
  {
    id: 'three_jars',
    title: 'Mestre dos 3 Potes',
    description: 'Guardou dinheiro nos 3 potes: Guardar, Gastar e Ajudar!',
    emoji: '🏺',
    rewardStars: 2,
    unlocked: false,
  },
  {
    id: 'generous_heart',
    title: 'Coração Generoso',
    description: 'Separou moedinhas no pote de Ajudar para fazer o bem!',
    emoji: '💖',
    rewardStars: 1,
    unlocked: false,
  },
  {
    id: 'quiz_master',
    title: 'Detetive do Dinheiro',
    description: 'Completou a missão de Necessidade vs Desejo!',
    emoji: '🧠',
    rewardStars: 2,
    unlocked: false,
  },
  {
    id: 'goal_reached',
    title: 'Sonho Conquistado',
    description: 'Alcançou 100% da meta de economia no pote de Guardar!',
    emoji: '🎯',
    rewardStars: 3,
    unlocked: false,
  },
  {
    id: 'super_saver',
    title: 'Super Poupador',
    description: 'Juntou mais de R$ 25 no seu cofrinho!',
    emoji: '👑',
    rewardStars: 2,
    unlocked: false,
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('welcome');
  const [stars, setStars] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [childName, setChildName] = useState<string>(() => {
    try {
      return localStorage.getItem('cofrinho_child_name') || '';
    } catch {
      return '';
    }
  });

  // Jar Balances
  const [jarBalances, setJarBalances] = useState<Record<JarType, number>>({
    guardar: 0,
    gastar: 0,
    ajudar: 0,
  });

  // Active Savings Goal
  const [activeGoal, setActiveGoal] = useState<SavingsGoal>({
    id: 'g1',
    title: 'Robô Astronauta',
    targetAmount: 30,
    currentAmount: 0,
    emoji: '🤖',
    description: 'Um brinquedo super legal com luzes e sons!',
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Toast notifications for celebratory feedback
  const [toast, setToast] = useState<{
    title: string;
    message: string;
    starsAdded?: number;
    emoji?: string;
  } | null>(null);

  // Sound sync
  const handleToggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    setSoundEnabled(nextVal);
  };

  // Trigger celebration toast
  const showToast = (title: string, message: string, starsAdded?: number, emoji?: string) => {
    setToast({ title, message, starsAdded, emoji });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Helper to unlock an achievement
  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target || target.unlocked) return prev;

      playAchievementSound();
      setStars((s) => s + target.rewardStars);
      showToast(
        `Novo Selo: ${target.title}!`,
        target.description,
        target.rewardStars,
        target.emoji
      );

      return prev.map((a) =>
        a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : a
      );
    });
  };

  /**
   * onStart: Interactivity requirement
   * Stores the child name and transitions to the next screen,
   * awarding the initial star.
   */
  const handleStart = (name: string) => {
    setChildName(name);
    try {
      localStorage.setItem('cofrinho_child_name', name);
    } catch {
      // ignore
    }

    playStarSound();

    if (!hasStarted) {
      setHasStarted(true);
      // Award initial star
      setStars((prev) => prev + 1);

      // Unlock initial badge
      setAchievements((prev) =>
        prev.map((a) =>
          a.id === 'first_step'
            ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleTimeString() }
            : a
        )
      );

      showToast(
        `Bem-vindo(a), ${name}!`,
        'Você ganhou sua 1ª Estrela e desbloqueou o selo Primeiro Passo!',
        1,
        '⭐'
      );
    }

    // Switch screen to Tela 2 (O que você faria com 5 reais?)
    setCurrentScreen('tela2');
  };

  // Deposit coins into chosen jar
  const handleDeposit = (jar: JarType, amount: number) => {
    setJarBalances((prev) => {
      const updated = {
        ...prev,
        [jar]: prev[jar] + amount,
      };

      // Check "First Coin" achievement
      unlockAchievement('first_coin');

      // Check "Generous Heart" if deposited into 'ajudar'
      if (jar === 'ajudar') {
        unlockAchievement('generous_heart');
      }

      // Check "Three Jars" if all 3 have at least R$ 1
      if (updated.guardar > 0 && updated.gastar > 0 && updated.ajudar > 0) {
        unlockAchievement('three_jars');
      }

      // Check "Super Saver" if total exceeds R$ 25
      const total = updated.guardar + updated.gastar + updated.ajudar;
      if (total >= 25) {
        unlockAchievement('super_saver');
      }

      // Check "Goal Reached"
      if (updated.guardar >= activeGoal.targetAmount) {
        unlockAchievement('goal_reached');
      }

      return updated;
    });
  };

  const handleUpdateGoal = (newGoal: Partial<SavingsGoal>) => {
    setActiveGoal((prev) => {
      const updated = { ...prev, ...newGoal };
      if (jarBalances.guardar >= updated.targetAmount) {
        unlockAchievement('goal_reached');
      }
      return updated;
    });
    showToast('Meta atualizada!', `Nova meta: ${newGoal.title || activeGoal.title}`, undefined, '🎯');
  };

  const handleEarnStars = (count: number) => {
    setStars((prev) => prev + count);
    showToast('Estrelas conquistadas!', `Você ganhou +${count} estrelas no desafio!`, count, '✨');
  };

  const handleMissionReward = (starsToAdd: number, moneyToAdd: number) => {
    setStars((prev) => prev + starsToAdd);
    setJarBalances((prev) => {
      const updated = {
        ...prev,
        guardar: prev.guardar + moneyToAdd,
      };

      if (updated.guardar + updated.gastar + updated.ajudar >= 25) {
        unlockAchievement('super_saver');
      }
      if (updated.guardar >= activeGoal.targetAmount) {
        unlockAchievement('goal_reached');
      }

      return updated;
    });

    unlockAchievement('first_coin');
    showToast(
      'Recompensa de Missão!',
      `Você ganhou +${starsToAdd} Estrela e +R$ ${moneyToAdd.toFixed(2).replace('.', ',')} no cofrinho!`,
      starsToAdd,
      '🪙'
    );
  };

  const handleQuizCompleted = () => {
    unlockAchievement('quiz_master');
  };

  const totalMoney = jarBalances.guardar + jarBalances.gastar + jarBalances.ajudar;
  const unlockedBadgesCount = achievements.filter((a) => a.unlocked).length;

  return (
    <SkyBackground
      variant={
        currentScreen === 'tela4'
          ? 'orange'
          : currentScreen === 'tela2' || currentScreen === 'tela3'
          ? 'green'
          : 'sky'
      }
    >
      {/* Sticky Header Nav with Brand, Stats and Navigation */}
      <HeaderNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        stars={stars}
        totalMoney={totalMoney}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
        unlockedBadgesCount={unlockedBadgesCount}
        totalBadgesCount={achievements.length}
        childName={childName}
      />

      {/* Main Viewport Router */}
      <main className="flex-1 flex flex-col justify-center">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStart}
            earnedStars={stars}
            initialName={childName}
          />
        )}

        {currentScreen === 'tela2' && (
          <Tela2QuestionScreen
            childName={childName}
            onNext={() => setCurrentScreen('tela3')}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'tela3' && (
          <Tela3AudioStoryScreen
            childName={childName}
            onNext={() => setCurrentScreen('tela4')}
            onBack={() => setCurrentScreen('tela2')}
          />
        )}

        {currentScreen === 'tela4' && (
          <Tela4ChallengeScreen
            childName={childName}
            onNext={() => setCurrentScreen('tela5')}
            onBack={() => setCurrentScreen('tela3')}
          />
        )}

        {currentScreen === 'tela5' && (
          <Tela5ProgressScreen
            childName={childName}
            onNext={() => setCurrentScreen('cofrinho')}
            onBack={() => setCurrentScreen('tela4')}
          />
        )}

        {currentScreen === 'cofrinho' && (
          <CofrinhoPlayground
            jarBalances={jarBalances}
            onDeposit={handleDeposit}
            activeGoal={activeGoal}
            onUpdateGoal={handleUpdateGoal}
            onGoToRewards={() => setCurrentScreen('conquistas')}
            onGoToQuiz={() => setCurrentScreen('licoes')}
            childName={childName}
          />
        )}

        {currentScreen === 'conquistas' && (
          <RewardsPanel
            stars={stars}
            achievements={achievements}
            onBackToCofrinho={() => setCurrentScreen('cofrinho')}
            onNavigate={setCurrentScreen}
            childName={childName}
          />
        )}

        {currentScreen === 'licoes' && (
          <LessonsAndQuiz
            onEarnReward={handleMissionReward}
            onEarnStar={handleEarnStars}
            onQuizCompleted={handleQuizCompleted}
            onBackToCofrinho={() => setCurrentScreen('cofrinho')}
            childName={childName}
          />
        )}
      </main>

      {/* Celebration Notification Toast */}
      <CelebrationToast
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* Playful Footer */}
      <footer className="w-full text-center py-3 text-xs text-slate-600 font-bold bg-white/40 backdrop-blur-xs border-t border-sky-100/60 z-20">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🐷 Cofrinho Mágico · Educação Financeira Divertida para Crianças</span>
          <div className="flex items-center gap-2">
            <span>✨ Poupar é o superpoder de realizar sonhos!</span>
          </div>
        </div>
      </footer>
    </SkyBackground>
  );
}
