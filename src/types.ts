export type ScreenMode = 'welcome' | 'tela2' | 'tela3' | 'tela4' | 'tela5' | 'cofrinho' | 'conquistas' | 'licoes';

export type JarType = 'guardar' | 'gastar' | 'ajudar';

export interface JarInfo {
  id: JarType;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  amount: number;
  description: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  emoji: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  rewardStars: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface MissionItem {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  type: 'necessidade' | 'desejo';
  explanationCorrect: string;
  explanationIncorrect: string;
}

export type QuizQuestion = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  type: 'necessidade' | 'desejo';
  explanation: string;
};
