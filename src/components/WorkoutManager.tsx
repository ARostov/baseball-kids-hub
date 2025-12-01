// src/components/WorkoutManager.tsx
import React, { useState } from 'react';
import { Workout, WorkoutExercise, Exercise } from '../types';
import { referenceData } from '../data/referenceData';

interface WorkoutManagerProps {
    workout?: Workout;
    exercises: Exercise[];
    onSave: (workout: Workout) => void;
    onCancel: () => void;
}

export const WorkoutManager: React.FC<WorkoutManagerProps> = ({
                                                                  workout,
                                                                  exercises,
                                                                  onSave,
                                                                  onCancel
                                                              }) => {
    const [formData, setFormData] = useState<Partial<Workout>>(workout || {
        title: '',
        description: '',
        difficulty: 'beginner',
        age_group_ids: [],
        warmup_exercises: [],
        warmup_block_type: 'straight_sets',
        main_exercises: [],
        main_block_type: 'straight_sets',
        cooldown_exercises: [],
        cooldown_block_type: 'straight_sets'
    });

    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [currentSection, setCurrentSection] = useState<'warmup' | 'main' | 'cooldown'>('warmup');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Workout);
    };

    const addExerciseToSection = (exercise: Exercise, scheme: string) => {
        const workoutExercise: WorkoutExercise = {
            exercise_id: exercise.id,
            scheme: scheme as any,
            estimated_duration_minutes: exercise.estimated_duration_minutes
        };

        setFormData(prev => ({
            ...prev,
            [`${currentSection}_exercises`]: [
                ...(prev[`${currentSection}_exercises`] as WorkoutExercise[] || []),
                workoutExercise
            ]
        }));
    };

    const removeExerciseFromSection = (index: number) => {
        setFormData(prev => ({
            ...prev,
            [`${currentSection}_exercises`]: (prev[`${currentSection}_exercises`] as WorkoutExercise[]).filter((_, i) => i !== index)
        }));
    };

    const getExerciseById = (id: number) => {
        return exercises.find(ex => ex.id === id);
    };

    const calculateTotalDuration = (sectionExercises: WorkoutExercise[]) => {
        return sectionExercises.reduce((total, ex) => total + ex.estimated_duration_minutes, 0);
    };

    const toggleArrayValue = (array: number[], value: number) => {
        return array.includes(value)
            ? array.filter(item => item !== value)
            : [...array, value];
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {workout ? 'Редактировать тренировку' : 'Новая тренировка'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Основная информация */}
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Название тренировки *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Описание
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    rows={2}
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
                                        Тип блока
                                    </label>
                                    <select
                                        value={formData[`${currentSection}_block_type`]}
                                        onChange={e => setFormData({...formData, [`${currentSection}_block_type`]: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {referenceData.block_types.map(block => (
                                            <option key={block.id} value={block.id}>{block.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Возрастные группы */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Возрастные группы
                            </label>
                            <div className="grid grid-cols-3 gap-2">
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

                        {/* Секции тренировки */}
                        <div className="border rounded-lg p-4">
                            <div className="flex gap-2 mb-4">
                                {(['warmup', 'main', 'cooldown'] as const).map(section => (
                                    <button
                                        key={section}
                                        type="button"
                                        onClick={() => setCurrentSection(section)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                            currentSection === section
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {section === 'warmup' && '💪 Разминка'}
                                        {section === 'main' && '🔥 Основная часть'}
                                        {section === 'cooldown' && '🧘 Заминка'}
                                    </button>
                                ))}
                            </div>

                            {/* Упражнения в секции */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-700">
                                    Упражнения в {currentSection === 'warmup' ? 'разминке' : currentSection === 'main' ? 'основной части' : 'заминке'}
                                    ({calculateTotalDuration(formData[`${currentSection}_exercises`] as WorkoutExercise[] || [])} мин)
                                </h4>

                                {(formData[`${currentSection}_exercises`] as WorkoutExercise[] || []).map((workoutEx, index) => {
                                    const exercise = getExerciseById(workoutEx.exercise_id);
                                    return exercise ? (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <span className="font-medium">{exercise.name}</span>
                                                <span className="ml-2 text-sm text-gray-600">
                          ({referenceData.scheme_types.find(s => s.id === workoutEx.scheme)?.name})
                        </span>
                                                <span className="ml-2 text-sm text-gray-500">{workoutEx.estimated_duration_minutes} мин</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeExerciseFromSection(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : null;
                                })}

                                {/* Добавление упражнения */}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                    <select
                                        onChange={(e) => {
                                            const exerciseId = parseInt(e.target.value);
                                            const exercise = exercises.find(ex => ex.id === exerciseId);
                                            if (exercise) {
                                                setSelectedExercises(prev => [...prev, exercise]);
                                            }
                                        }}
                                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Выберите упражнение</option>
                                        {exercises.map(exercise => (
                                            <option key={exercise.id} value={exercise.id}>
                                                {exercise.name} ({exercise.estimated_duration_minutes} мин)
                                            </option>
                                        ))}
                                    </select>

                                    {selectedExercises.length > 0 && (
                                        <div className="space-y-2">
                                            {selectedExercises.map(exercise => (
                                                <div key={exercise.id} className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                                                    <span className="flex-1 font-medium">{exercise.name}</span>
                                                    <select
                                                        onChange={(e) => {
                                                            addExerciseToSection(exercise, e.target.value);
                                                            setSelectedExercises(prev => prev.filter(ex => ex.id !== exercise.id));
                                                        }}
                                                        className="px-2 py-1 border border-gray-300 rounded"
                                                    >
                                                        <option value="">Схема</option>
                                                        {referenceData.scheme_types.map(scheme => (
                                                            <option key={scheme.id} value={scheme.id}>{scheme.name}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedExercises(prev => prev.filter(ex => ex.id !== exercise.id))}
                                                        className="text-red-600"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Общая статистика */}
                        <div className="grid grid-cols-3 gap-4 text-sm text-center">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <div className="font-medium text-green-800">Разминка</div>
                                <div className="text-green-600">
                                    {calculateTotalDuration(formData.warmup_exercises || [])} мин
                                </div>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="font-medium text-blue-800">Основная</div>
                                <div className="text-blue-600">
                                    {calculateTotalDuration(formData.main_exercises || [])} мин
                                </div>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="font-medium text-purple-800">Заминка</div>
                                <div className="text-purple-600">
                                    {calculateTotalDuration(formData.cooldown_exercises || [])} мин
                                </div>
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
                                Сохранить тренировку
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};