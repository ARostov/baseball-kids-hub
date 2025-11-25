export interface Rules {
    categories: Category[];
    rules: Rule[];
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface Rule {
    id: number;
    category: string;
    title: string;
    description: string;
    examples?: string[];
    important?: string;
    terms?: Term[];
}

export interface Term {
    term: string;
    definition: string;
}