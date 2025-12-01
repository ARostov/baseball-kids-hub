// src/types/index.ts (полностью переписанный)
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

// Старая система тренировок - SimpleExercise для обратной совместимости
export interface SimpleExercise {
    id: number;
    name: string;
    description: string;
    duration: string;
    sets?: number;
    reps?: number;
    completed: boolean;
}

export interface TrainingSection {
    title: string;
    duration: string;
    exercises: SimpleExercise[];
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

// Новая система тренировок - Exercise БЕЗ duration и completed
export interface Exercise {
    id: number;
    name: string;
    description: string;
    image: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    video_links: Array<{
        url: string;
        title?: string;
    }>;
    age_group_ids: number[];
    category_ids: number[];
    muscle_group_ids: number[];
    contraindication_ids: number[];
    equipment_ids: number[];
    space_requirements: 'small_indoors' | 'large_indoors' | 'outdoors_only';
    fatigue_level: 'low' | 'medium' | 'high';
    partner_required: boolean;
    estimated_duration_minutes: number;
}

export interface WorkoutExercise {
    exercise_id: number;
    scheme: '1x10' | '3x10_r60' | '3x12_r45' | '5x5_r90' | '2x15_r30' | 'circuit' | 'timed_30s' | 'technique';
    estimated_duration_minutes: number;
}

export interface Workout {
    id: number;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    age_group_ids: number[];
    warmup_exercises: WorkoutExercise[];
    warmup_block_type: 'straight_sets' | 'circuit' | 'circuit_per_side' | 'superset';
    main_exercises: WorkoutExercise[];
    main_block_type: 'straight_sets' | 'circuit' | 'circuit_per_side' | 'superset';
    cooldown_exercises: WorkoutExercise[];
    cooldown_block_type: 'straight_sets' | 'circuit' | 'circuit_per_side' | 'superset';
}

export interface TrainingData {
    exercises: Exercise[];
    workouts: Workout[];
}

export interface ReferenceData {
    age_groups: Array<{ id: number; name: string }>;
    categories: Array<{ id: number; name: string }>;
    muscle_groups: Array<{ id: number; name: string }>;
    contraindications: Array<{ id: number; name: string }>;
    equipment: Array<{ id: number; name: string }>;
    scheme_types: Array<{ id: string; name: string; description: string }>;
    block_types: Array<{ id: string; name: string; description: string }>;
    space_requirements: Array<{ id: string; name: string }>;
    fatigue_levels: Array<{ id: string; name: string }>;
}

// Экспорты для других типов
export type { Legend, Team, CareerStats } from './legend';
export type { LevelSystem, Level, LevelRequirements } from './level';
export type { Schedule, ScheduleEvent } from './schedule';
export type { Quiz, Question, Category as QuizCategory } from './quiz';
export type { Grades, Student, Subject } from './grades';
export type { Rules, Category as RulesCategory, Rule, Term } from './rules';
export type { Tips, TipCategory, Tip } from './tips';
export type { Achievements, AchievementCategory, Achievement } from './achievements';