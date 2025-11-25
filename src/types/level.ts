export interface LevelSystem {
    levels: Level[];
}

export interface Level {
    id: number;
    name: string;
    description: string;
    image: string;
    unlocked: boolean;
    requirements: LevelRequirements;
}

export interface LevelRequirements {
    fitness?: string[];
    accuracy?: string[];
    knowledge?: string[];
    skills?: string[];
}