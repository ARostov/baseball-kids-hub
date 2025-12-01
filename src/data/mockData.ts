// src/data/mockData.ts (обновленная секция appSections)
import { AppSection, ProfileData, Training, Exercise, SimpleExercise } from '../types';

export const appSections: AppSection[] = [
    {
        id: 'profile',
        title: 'Мой Профиль',
        description: 'Статистика и прогресс',
        icon: '👤',
        path: '/profile'
    },
    {
        id: 'exercises',
        title: 'Тренировки',
        description: 'Упражнения и программы',
        icon: '🏃',
        path: '/exercises'
    },
    {
        id: 'schedule',
        title: 'Расписание',
        description: 'График занятий и игр',
        icon: '📅',
        path: '/schedule'
    },
    {
        id: 'levels',
        title: 'Уровни',
        description: 'Нормативы и аттестация',
        icon: '🎯',
        path: '/levels'
    },
    {
        id: 'achievements',
        title: 'Ачивки',
        description: 'Мои достижения',
        icon: '🏆',
        path: '/achievements'
    },
    {
        id: 'legends',
        title: 'Легенды',
        description: 'Коллекция карточек',
        icon: '🌟',
        path: '/legends'
    },
    {
        id: 'grades',
        title: 'Учёба',
        description: 'Успеваемость в школе',
        icon: '📚',
        path: '/grades'
    },
    {
        id: 'quiz',
        title: 'Викторина',
        description: 'Проверь знания бейсбола',
        icon: '❓',
        path: '/quiz'
    },
    {
        id: 'friends',
        title: 'Друзья',
        description: 'Сообщество бейсболистов',
        icon: '👥',
        path: '/friends',
        comingSoon: true
    },
    {
        id: 'shop',
        title: 'Магазин',
        description: 'Трать BaseCoin',
        icon: '🛍️',
        path: '/shop',
        comingSoon: true
    },
    {
        id: 'rules',
        title: 'Правила',
        description: 'Основы бейсбола',
        icon: '📖',
        path: '/rules'
    },
    {
        id: 'tips',
        title: 'Советы',
        description: 'Полезные подсказки',
        icon: '💡',
        path: '/tips'
    }
];

export const mockProfile: ProfileData = {
    name: "Бейсболист",
    avatar: "⚾",
    teamLogo: "🏆",
    currentLevel: "Мукки Беттс",
    nextLevel: "Бейб Рут",
    experience: 150,
    experienceToNextLevel: 300,
    baseCoins: 50,
    stats: {
        trainingsCompleted: 12,
        gamesPlayed: 8,
        achievementsUnlocked: 5,
        quizzesCompleted: 2
    }
};

// ... существующий код appSections и mockProfile ...

// Моковые данные для НОВОЙ системы (Exercise) - БЕЗ duration и completed
export const mockExercises: Exercise[] = [
    {
        id: 1,
        name: 'Бег на месте',
        description: 'Легкий бег для разогрева мышц',
        image: '/images/running.jpg',
        difficulty: 'beginner',
        video_links: [],
        age_group_ids: [1, 2],
        category_ids: [5],
        muscle_group_ids: [3, 6],
        contraindication_ids: [],
        equipment_ids: [],
        space_requirements: 'small_indoors',
        fatigue_level: 'low',
        partner_required: false,
        estimated_duration_minutes: 5
    },
    {
        id: 2,
        name: 'Вращения корпусом',
        description: 'Медленные вращения для гибкости',
        image: '/images/stretching.jpg',
        difficulty: 'beginner',
        video_links: [],
        age_group_ids: [1, 2, 3],
        category_ids: [6],
        muscle_group_ids: [4, 6],
        contraindication_ids: [4],
        equipment_ids: [],
        space_requirements: 'small_indoors',
        fatigue_level: 'low',
        partner_required: false,
        estimated_duration_minutes: 5
    }
    // ... можно добавить больше упражнений ...
];

// Хелпер для создания SimpleExercise (для старой системы)
const createSimpleExercise = (id: number, name: string, description: string, duration: string, completed: boolean = false, sets?: number, reps?: number): SimpleExercise => ({
    id,
    name,
    description,
    duration,
    completed,
    sets,
    reps
});

// Моковые данные для СТАРОЙ системы (Training с SimpleExercise)
export const mockTrainings: Training[] = [
    {
        id: 1,
        name: 'Бэттинг тренировка',
        type: 'Бэттинг',
        duration: '90 минут',
        difficulty: 'beginner',
        completed: false,
        date: '2024-01-20',
        sections: {
            warmup: {
                title: 'Разминка',
                duration: '15 минут',
                exercises: [
                    createSimpleExercise(1, 'Бег на месте', 'Легкий бег для разогрева мышц', '5 минут', false),
                    createSimpleExercise(2, 'Вращения корпусом', 'Медленные вращения для гибкости', '5 минут', false),
                    createSimpleExercise(3, 'Растяжка рук и плеч', 'Подготовка к замахам битой', '5 минут', false)
                ]
            },
            main: {
                title: 'Основные упражнения',
                duration: '60 минут',
                exercises: [
                    createSimpleExercise(4, 'Отработка стойки', 'Правильная позиция при бэттинге', '15 минут', false, 3, 10),
                    createSimpleExercise(5, 'Замах битой', 'Отработка техники замаха', '20 минут', false, 4, 15),
                    createSimpleExercise(6, 'Удар по мячу на стойке', 'Удары по неподвижному мячу', '25 минут', false, 5, 12)
                ]
            },
            cooldown: {
                title: 'Заминка',
                duration: '15 минут',
                exercises: [
                    createSimpleExercise(7, 'Медленная ходьба', 'Восстановление дыхания', '5 минут', false),
                    createSimpleExercise(8, 'Растяжка мышц', 'Растяжка рук, ног и корпуса', '10 минут', false)
                ]
            }
        }
    }
    // ... остальные тренировки ...
];