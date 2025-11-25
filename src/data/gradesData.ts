import { Grades } from '../types/grades';

export const gradesData: Grades = {
    student: {
        name: "Бейсболист",
        class: "5Б"
    },
    subjects: [
        {
            name: "Математика",
            quarter1: [5, 4, 5, 5, 4],
            quarter2: [5, 5, 4, 5, 5],
            quarter3: [5, 4, 5, 5, 4],
            quarter4: [5, 5, 5, 4, 5]
        },
        {
            name: "Русский язык",
            quarter1: [4, 5, 4, 4, 5],
            quarter2: [5, 4, 5, 4, 4],
            quarter3: [4, 5, 4, 5, 4],
            quarter4: [5, 5, 4, 5, 4]
        },
        {
            name: "Английский язык",
            quarter1: [5, 5, 5, 4, 5],
            quarter2: [5, 5, 5, 5, 4],
            quarter3: [5, 5, 4, 5, 5],
            quarter4: [5, 5, 5, 5, 5]
        },
        {
            name: "Физкультура",
            quarter1: [5, 5, 5, 5, 5],
            quarter2: [5, 5, 5, 5, 5],
            quarter3: [5, 5, 5, 5, 5],
            quarter4: [5, 5, 5, 5, 5]
        },
        {
            name: "История",
            quarter1: [4, 4, 5, 4, 4],
            quarter2: [5, 4, 4, 5, 4],
            quarter3: [4, 5, 4, 4, 5],
            quarter4: [5, 4, 5, 4, 5]
        },
        {
            name: "Биология",
            quarter1: [5, 4, 5, 4, 5],
            quarter2: [4, 5, 5, 4, 5],
            quarter3: [5, 5, 4, 5, 4],
            quarter4: [5, 5, 5, 4, 5]
        }
    ]
};