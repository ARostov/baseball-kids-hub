export interface Quiz {
    questions: Question[];
    categories: Category[];
}

export interface Question {
    id: number;
    question: string;
    category: string;
    difficulty: number; // 1-3 звезды
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface Category {
    id: string;
    name: string;
    count: number;
}
