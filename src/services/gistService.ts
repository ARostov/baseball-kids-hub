export interface Subject {
    name: string;
    quarter1: number[];
    quarter2: number[];
    quarter3: number[];
    quarter4: number[];
}

export interface GradesData {
    student: {
        name: string;
        class: string;
    };
    subjects: Subject[];
}

export class GistService {
    private static readonly GIST_ID = '3e46d23e1d9fe2b4e9d32189f6ffb49b';
    private static readonly GIST_FILENAME = 'grades.json';

    static async loadGrades(): Promise<GradesData> {
        try {
            const response = await fetch(`https://api.github.com/gists/${this.GIST_ID}`);

            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }

            const gistData = await response.json();
            const gradesContent = gistData.files[this.GIST_FILENAME]?.content;

            if (!gradesContent) {
                throw new Error('Файл с оценками не найден в Gist');
            }

            const parsedData = JSON.parse(gradesContent);

            // Валидация данных
            return this.validateGradesData(parsedData);
        } catch (error) {
            console.error('Ошибка загрузки оценок:', error);
            return this.getDefaultGrades();
        }
    }

    private static validateGradesData(data: any): GradesData {
        // Проверяем базовую структуру
        if (!data.student || !data.subjects || !Array.isArray(data.subjects)) {
            console.warn('Некорректная структура данных, используем данные по умолчанию');
            return this.getDefaultGrades();
        }

        // Валидируем каждый предмет
        const validSubjects = data.subjects.filter((subject: any) =>
            subject &&
            typeof subject.name === 'string' &&
            Array.isArray(subject.quarter1) &&
            Array.isArray(subject.quarter2) &&
            Array.isArray(subject.quarter3) &&
            Array.isArray(subject.quarter4)
        );

        if (validSubjects.length === 0) {
            console.warn('Не найдено валидных предметов, используем данные по умолчанию');
            return this.getDefaultGrades();
        }

        return {
            student: data.student,
            subjects: validSubjects
        };
    }

    private static getDefaultGrades(): GradesData {
        return {
            student: {
                name: 'Иван Петров',
                class: '5А'
            },
            subjects: [
                {
                    name: 'Математика',
                    quarter1: [5, 4, 5],
                    quarter2: [5, 5, 4],
                    quarter3: [4, 5, 5],
                    quarter4: [5, 5, 5]
                },
                {
                    name: 'Русский язык',
                    quarter1: [4, 4, 5],
                    quarter2: [4, 5, 4],
                    quarter3: [5, 4, 4],
                    quarter4: [5, 5, 4]
                }
            ]
        };
    }
}