export interface Legend {
    id: number;
    name: string;
    fullName: string;
    image: string;
    description: string;
    era: string;
    position: string;
    teams: Team[];
    trophies: string[];
    careerStats: CareerStats;
    funFact: string;
    owned: boolean;
    obtainedFrom: 'achievement' | 'shop' | 'level';
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
    price?: number;
}

export interface Team {
    name: string;
    years: string;
    number: number;
}

export interface CareerStats {
    battingAverage: string;
    homeRuns: string;
    RBIs: string;
    stolenBases?: string;
    winsAsPitcher?: string;
}