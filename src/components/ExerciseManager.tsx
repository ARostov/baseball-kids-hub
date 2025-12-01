// src/components/ExerciseManager.tsx
import React, { useState } from 'react';
import { Exercise } from '../types';
import { referenceData } from '../data/referenceData';

interface ExerciseManagerProps {
    exercise?: Exercise;
    onSave: (exercise: Exercise) => void;
    onCancel: () => void;
}

export const ExerciseManager: React.FC<ExerciseManagerProps> = ({ exercise, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Exercise>>(exercise || {
        name: '',
        description: '',
        image: '',
        difficulty: 'beginner',
        video_links: [],
        age_group_ids: [],
        category_ids: [],
        muscle_group_ids: [],
        contraindication_ids: [],
        equipment_ids: [],
        space_requirements: 'small_indoors',
        fatigue_level: 'low',
        partner_required: false,
        estimated_duration_minutes: 5
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Exercise);
    };

    const toggleArrayValue = (array: number[], value: number) => {
        return array.includes(value)
            ? array.filter(item => item !== value)
            : [...array, value];
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {exercise ? 'Редактировать упражнение' : 'Новое упражнение'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Основная информация */}
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Название *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Описание *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Сложность
                                    </label>
                                    <select
                                        value={formData.difficulty}
                                        onChange={e => setFormData({...formData, difficulty: e.target.value as any})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="beginner">Начинающий</option>
                                        <option value="intermediate">Продвинутый</option>
                                        <option value="advanced">Эксперт</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Длительность (мин)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.estimated_duration_minutes}
                                        onChange={e => setFormData({...formData, estimated_duration_minutes: parseInt(e.target.value)})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Категории и группы */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Возрастные группы
                                </label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {referenceData.age_groups.map(group => (
                                        <label key={group.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.age_group_ids?.includes(group.id)}
                                                onChange={() => setFormData({
                                                    ...formData,
                                                    age_group_ids: toggleArrayValue(formData.age_group_ids || [], group.id)
                                                })}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{group.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Категории
                                </label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {referenceData.categories.map(category => (
                                        <label key={category.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.category_ids?.includes(category.id)}
                                                onChange={() => setFormData({
                                                    ...formData,
                                                    category_ids: toggleArrayValue(formData.category_ids || [], category.id)
                                                })}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Группы мышц и противопоказания */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Группы мышц
                                </label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {referenceData.muscle_groups.map(group => (
                                        <label key={group.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.muscle_group_ids?.includes(group.id)}
                                                onChange={() => setFormData({
                                                    ...formData,
                                                    muscle_group_ids: toggleArrayValue(formData.muscle_group_ids || [], group.id)
                                                })}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{group.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Противопоказания
                                </label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {referenceData.contraindications.map(contra => (
                                        <label key={contra.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.contraindication_ids?.includes(contra.id)}
                                                onChange={() => setFormData({
                                                    ...formData,
                                                    contraindication_ids: toggleArrayValue(formData.contraindication_ids || [], contra.id)
                                                })}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{contra.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Дополнительные параметры */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Помещение
                                </label>
                                <select
                                    value={formData.space_requirements}
                                    onChange={e => setFormData({...formData, space_requirements: e.target.value as any})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {referenceData.space_requirements.map(space => (
                                        <option key={space.id} value={space.id}>{space.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Нагрузка
                                </label>
                                <select
                                    value={formData.fatigue_level}
                                    onChange={e => setFormData({...formData, fatigue_level: e.target.value as any})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {referenceData.fatigue_levels.map(level => (
                                        <option key={level.id} value={level.id}>{level.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.partner_required}
                                        onChange={e => setFormData({...formData, partner_required: e.target.checked})}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Нужен партнер</span>
                                </label>
                            </div>
                        </div>

                        {/* Кнопки */}
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};