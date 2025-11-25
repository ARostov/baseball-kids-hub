export interface Grades {
    student: Student;
    subjects: Subject[];
}

export interface Student {
    name: string;
    class: string;
}

export interface Subject {
    name: string;
    quarter1: number[];
    quarter2: number[];
    quarter3: number[];
    quarter4: number[];
}