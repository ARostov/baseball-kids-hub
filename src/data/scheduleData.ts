import { Schedule } from '../types/schedule';

export const scheduleData: Schedule = {
    events: [
        {
            id: 1,
            title: 'Бэттинг тренировка',
            type: 'training',
            date: '2024-01-20',
            time: '17:00',
            location: 'Стадион "Юность"',
            description: 'Отработка ударов и стойки',
            completed: false,
            trainingId: 1
        },
        {
            id: 2,
            title: 'Товарищеская игра',
            type: 'game',
            date: '2024-01-21',
            time: '15:00',
            location: 'Парк Победы',
            description: 'Игра с командой "Старс"',
            completed: false
        },
        {
            id: 3,
            title: 'Питчинг тренировка',
            type: 'training',
            date: '2024-01-22',
            time: '18:30',
            location: 'Зал "Мяч"',
            description: 'Работа над бросками',
            completed: true,
            trainingId: 2
        },
        {
            id: 4,
            title: 'Филдинг тренировка',
            type: 'training',
            date: '2024-01-24',
            time: '17:00',
            location: 'Стадион "Юность"',
            description: 'Ловля и передачи мяча',
            completed: false,
            trainingId: 3
        },
        {
            id: 5,
            title: 'Воскресная лига',
            type: 'game',
            date: '2024-01-28',
            time: '11:00',
            location: 'Центральный стадион',
            description: 'Турнирная игра',
            completed: false
        }
    ]
};