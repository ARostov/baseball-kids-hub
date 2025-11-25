export interface Achievements {
    categories: AchievementCategory[];
    achievements: Achievement[];
}

export interface AchievementCategory {
    id: string;
    name: string;
}

export interface Achievement {
    id: number;
    name: string;
    description: string;
    category: string;
    icon: string;
    unlocked: boolean;
    progress?: {
        current: number;
        total: number;
    };
    reward?: {
        coins?: number;
        legendCard?: number;
    };
}