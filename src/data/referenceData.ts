// src/data/referenceData.ts
import { ReferenceData } from '../types';

export const referenceData: ReferenceData = {
    age_groups: [
        { id: 1, name: '7-9 лет' },
        { id: 2, name: '10-12 лет' },
        { id: 3, name: '13-15 лет' }
    ],
    categories: [
        { id: 1, name: 'Броски' },
        { id: 2, name: 'Ловля' },
        { id: 3, name: 'Бита' },
        { id: 4, name: 'Бег' },
        { id: 5, name: 'ОФП' },
        { id: 6, name: 'Растяжка' }
    ],
    muscle_groups: [
        { id: 1, name: 'Плечевой пояс' },
        { id: 2, name: 'Руки' },
        { id: 3, name: 'Ноги' },
        { id: 4, name: 'Корпус' },
        { id: 5, name: 'Спина' },
        { id: 6, name: 'Координация' }
    ],
    contraindications: [
        { id: 1, name: 'Проблемы с локтем' },
        { id: 2, name: 'Травмы плеча' },
        { id: 3, name: 'Проблемы с коленями' },
        { id: 4, name: 'Проблемы со спиной' }
    ],
    equipment: [
        { id: 1, name: 'Бейсбольный мяч' },
        { id: 2, name: 'Бита' },
        { id: 3, name: 'Перчатка' },
        { id: 4, name: 'Скакалка' },
        { id: 5, name: 'Мягкий мяч' },
        { id: 6, name: 'Конусы' },
        { id: 7, name: 'Эспандер' }
    ],
    scheme_types: [
        { id: '1x10', name: '1 подход × 10 повторений', description: 'Базовое выполнение' },
        { id: '3x10_r60', name: '3×10 (отдых 60 сек)', description: 'Объемная работа' },
        { id: '3x12_r45', name: '3×12 (отдых 45 сек)', description: 'Интенсивная работа' },
        { id: '5x5_r90', name: '5×5 (отдых 90 сек)', description: 'Силовая работа' },
        { id: '2x15_r30', name: '2×15 (отдых 30 сек)', description: 'На выносливость' },
        { id: 'circuit', name: 'Круговая тренировка', description: 'В круговом формате' },
        { id: 'timed_30s', name: '30 секунд', description: 'Выполнение на время' },
        { id: 'technique', name: 'Отработка техники', description: 'Без четких сетов' }
    ],
    block_types: [
        { id: 'straight_sets', name: 'Классические подходы', description: 'Все подходы одного упражнения, потом следующее' },
        { id: 'circuit', name: 'Круговая тренировка', description: 'Упражнения по кругу' },
        { id: 'circuit_per_side', name: 'Круг на каждую сторону', description: 'Отдельно на правую и левую сторону' },
        { id: 'superset', name: 'Суперсет', description: 'Упражнения без отдыха между ними' }
    ],
    space_requirements: [
        { id: 'small_indoors', name: 'Малое помещение' },
        { id: 'large_indoors', name: 'Большое помещение' },
        { id: 'outdoors_only', name: 'Только улица' }
    ],
    fatigue_levels: [
        { id: 'low', name: 'Низкая' },
        { id: 'medium', name: 'Средняя' },
        { id: 'high', name: 'Высокая' }
    ]
};