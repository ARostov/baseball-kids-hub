export interface Team {
    name: string;
    years: string;
    number: number;
}

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
    careerStats: {
        battingAverage?: string;
        homeRuns?: string;
        RBIs?: string;
        stolenBases?: string;
        wins?: string;
        strikeouts?: string;
        ERA?: string;
    };
    funFact: string;
    owned: boolean;
    obtainedFrom: 'achievement' | 'level' | 'shop' | 'special';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    price: number;
}

export interface CareerStats {
    battingAverage: string;
    homeRuns: string;
    RBIs: string;
    stolenBases?: string;
    winsAsPitcher?: string;
}