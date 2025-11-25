import { AppSection, ProfileData, Training } from '../types';

export const appSections: AppSection[] = [
    {
        id: 'profile',
        title: 'Мой Профиль',
        description: 'Статистика и прогресс',
        icon: '👤',
        path: '/profile'
    },
    {
        id: 'trainings',
        title: 'Тренировки',
        description: 'План и расписание',
        icon: '🏃',
        path: '/trainings'
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
                    {
                        id: 1,
                        name: 'Бег на месте',
                        description: 'Легкий бег для разогрева мышц',
                        duration: '5 минут',
                        completed: false
                    },
                    {
                        id: 2,
                        name: 'Вращения корпусом',
                        description: 'Медленные вращения для гибкости',
                        duration: '5 минут',
                        completed: false
                    },
                    {
                        id: 3,
                        name: 'Растяжка рук и плеч',
                        description: 'Подготовка к замахам битой',
                        duration: '5 минут',
                        completed: false
                    }
                ]
            },
            main: {
                title: 'Основные упражнения',
                duration: '60 минут',
                exercises: [
                    {
                        id: 4,
                        name: 'Отработка стойки',
                        description: 'Правильная позиция при бэттинге',
                        duration: '15 минут',
                        sets: 3,
                        reps: 10,
                        completed: false
                    },
                    {
                        id: 5,
                        name: 'Замах битой',
                        description: 'Отработка техники замаха',
                        duration: '20 минут',
                        sets: 4,
                        reps: 15,
                        completed: false
                    },
                    {
                        id: 6,
                        name: 'Удар по мячу на стойке',
                        description: 'Удары по неподвижному мячу',
                        duration: '25 минут',
                        sets: 5,
                        reps: 12,
                        completed: false
                    }
                ]
            },
            cooldown: {
                title: 'Заминка',
                duration: '15 минут',
                exercises: [
                    {
                        id: 7,
                        name: 'Медленная ходьба',
                        description: 'Восстановление дыхания',
                        duration: '5 минут',
                        completed: false
                    },
                    {
                        id: 8,
                        name: 'Растяжка мышц',
                        description: 'Растяжка рук, ног и корпуса',
                        duration: '10 минут',
                        completed: false
                    }
                ]
            }
        }
    },
    {
        id: 2,
        name: 'Питчинг тренировка',
        type: 'Питчинг',
        duration: '60 минут',
        difficulty: 'beginner',
        completed: true,
        date: '2024-01-18',
        sections: {
            warmup: {
                title: 'Разминка для питчера',
                duration: '10 минут',
                exercises: [
                    {
                        id: 9,
                        name: 'Вращения плечами',
                        description: 'Подготовка плечевых суставов',
                        duration: '5 минут',
                        completed: true
                    },
                    {
                        id: 10,
                        name: 'Легкий бег',
                        description: 'Разогрев всего тела',
                        duration: '5 минут',
                        completed: true
                    }
                ]
            },
            main: {
                title: 'Основные упражнения',
                duration: '45 минут',
                exercises: [
                    {
                        id: 11,
                        name: 'Отработка стойки питчера',
                        description: 'Правильная позиция на насыпи',
                        duration: '15 минут',
                        sets: 3,
                        reps: 8,
                        completed: true
                    },
                    {
                        id: 12,
                        name: 'Броски с разной дистанции',
                        description: 'Точность бросков на разные расстояния',
                        duration: '20 минут',
                        sets: 4,
                        reps: 10,
                        completed: true
                    },
                    {
                        id: 13,
                        name: 'Разные типы подач',
                        description: 'Фастбол, чейндж-ап, слайдер',
                        duration: '10 минут',
                        sets: 2,
                        reps: 5,
                        completed: true
                    }
                ]
            },
            cooldown: {
                title: 'Заминка',
                duration: '5 минут',
                exercises: [
                    {
                        id: 14,
                        name: 'Растяжка рук',
                        description: 'Растяжка мышц бросающей руки',
                        duration: '5 минут',
                        completed: true
                    }
                ]
            }
        }
    }
];