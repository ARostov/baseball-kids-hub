export interface Tips {
    categories: TipCategory[];
    tips: Tip[];
}

export interface TipCategory {
    id: string;
    name: string;
    description: string;
    tipCount: number;
}

export interface Tip {
    id: number;
    category: string;
    emoji: string;
    title: string;
    description: string;
    steps?: string[];
    proTip?: string;
    commonMistakes?: string[];
}