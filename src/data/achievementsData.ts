import { Achievements } from '../types/achievements';

export const achievementsData: Achievements = {
    categories: [
        { id: 'training', name: 'Тренировки' },
        { id: 'game', name: 'Игры' },
        { id: 'knowledge', name: 'Знания' },
        { id: 'levels', name: 'Уровни' },
        { id: 'streak', name: 'Серии' }
    ],
    achievements: [
        {
            id: 1,
            name: 'Первый шаг',
            description: 'Выполни свою первую тренировку',
            category: 'training',
            icon: '🚶',
            unlocked: true,
            reward: {
                coins: 10
            }
        },
        {
            id: 2,
            name: 'Тренировочный маньяк',
            description: 'Выполни 10 тренировок',
            category: 'training',
            icon: '💪',
            unlocked: false,
            progress: {
                current: 7,
                total: 10
            },
            reward: {
                coins: 50,
                legendCard: 3
            }
        },
        {
            id: 3,
            name: 'Игрок недели',
            description: 'Прими участие в 5 играх',
            category: 'game',
            icon: '⭐',
            unlocked: false,
            progress: {
                current: 3,
                total: 5
            },
            reward: {
                coins: 75
            }
        },
        {
            id: 4,
            name: 'Знаток правил',
            description: 'Пройди викторину без ошибок',
            category: 'knowledge',
            icon: '📚',
            unlocked: false,
            reward: {
                coins: 25,
                legendCard: 2
            }
        },
        {
            id: 5,
            name: 'Восходящая звезда',
            description: 'Достигни уровня Бейб Рут',
            category: 'levels',
            icon: '🌟',
            unlocked: false,
            reward: {
                coins: 100
            }
        },
        {
            id: 6,
            name: 'Неудержимый',
            description: 'Занимайся 7 дней подряд',
            category: 'streak',
            icon: '🔥',
            unlocked: false,
            progress: {
                current: 2,
                total: 7
            },
            reward: {
                coins: 60
            }
        },
        {
            id: 7,
            name: 'Отличник',
            description: 'Получи средний балл 4.5 за четверть',
            category: 'knowledge',
            icon: '🏅',
            unlocked: true,
            reward: {
                coins: 40
            }
        },
        {
            id: 8,
            name: 'Коллекционер',
            description: 'Собери 5 карточек легенд',
            category: 'levels',
            icon: '🃏',
            unlocked: false,
            progress: {
                current: 2,
                total: 5
            },
            reward: {
                coins: 80,
                legendCard: 5
            }
        }
    ]
};