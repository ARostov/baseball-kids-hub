export interface AppSection {
    id: string;
    title: string;
    description: string;
    icon: string;
    path: string;
    comingSoon?: boolean;
}

export interface ProfileData {
    name: string;
    avatar: string;
    teamLogo: string;
    currentLevel: string;
    nextLevel: string;
    experience: number;
    experienceToNextLevel: number;
    baseCoins: number;
    stats: {
        trainingsCompleted: number;
        gamesPlayed: number;
        achievementsUnlocked: number;
        quizzesCompleted: number;
    };
}

export interface Training {
    id: number;
    name: string;
    type: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    completed: boolean;
    date?: string;
    sections: {
        warmup: TrainingSection;
        main: TrainingSection;
        cooldown: TrainingSection;
    };
}

export interface TrainingSection {
    title: string;
    duration: string;
    exercises: Exercise[];
}

export interface Exercise {
    id: number;
    name: string;
    description: string;
    duration: string;
    sets?: number;
    reps?: number;
    completed: boolean;
}

// Явно экспортируем типы чтобы избежать конфликтов имен
export type { Legend, Team, CareerStats } from './legend';
export type { LevelSystem, Level, LevelRequirements } from './level';
export type { Schedule, ScheduleEvent } from './schedule';
export type { Quiz, Question, Category as QuizCategory } from './quiz';
export type { Grades, Student, Subject } from './grades';
export type { Rules, Category as RulesCategory, Rule, Term } from './rules';