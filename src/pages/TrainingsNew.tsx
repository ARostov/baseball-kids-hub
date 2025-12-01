// src/pages/TrainingsNew.tsx (только чтение)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingData } from '../hooks/useTrainingData';
import { Workout } from '../types';
import { referenceData } from '../data/referenceData';

export const TrainingsNewPage: React.FC = () => {
    const navigate = useNavigate();
    const { trainingData, loading, error } = useTrainingData();

    const getReferenceName = (type: keyof typeof referenceData, id: number) => {
        const items = referenceData[type] as Array<{id: number, name: string}>;
        return items.find(item => item.id === id)?.name || '';
    };

    const calculateTotalDuration = (workout: Workout) => {
        const warmup = workout.warmup_exercises.reduce((sum, ex) => sum + ex.estimated_duration_minutes, 0);
        const main = workout.main_exercises.reduce((sum, ex) => sum + ex.estimated_duration_minutes, 0);
        const cooldown = workout.cooldown_exercises.reduce((sum, ex) => sum + ex.estimated_duration_minutes, 0);
        return warmup + main + cooldown;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-mlb-light-gray p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mlb-blue mx-auto"></div>
                    <p className="mt-4 text-mlb-gray">Загрузка тренировок...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-mlb-light-gray p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-mlb-blue text-white rounded-lg hover:bg-blue-700"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mlb-light-gray p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-mlb-blue">🏃 Тренировки</h1>
                            <p className="text-mlb-gray mt-2">
                                Готовые тренировочные программы
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/exercises')}
                                className="px-4 py-2 bg-mlb-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                💪 К упражнениям
                            </button>
                        </div>
                    </div>
                </header>

                {/* Список тренировок */}
                <div className="grid gap-6">
                    {trainingData.workouts.map(workout => (
                        <div key={workout.id} className="mlb-card p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-mlb-blue">{workout.title}</h3>
                                    <p className="text-mlb-gray mt-1">{workout.description}</p>
                                </div>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Начать тренировку
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                    <span className="font-medium text-mlb-blue">Сложность:</span>
                                    <span className="ml-2 text-mlb-gray capitalize">{workout.difficulty}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-mlb-blue">Общее время:</span>
                                    <span className="ml-2 text-mlb-gray">{calculateTotalDuration(workout)} мин</span>
                                </div>
                                <div>
                                    <span className="font-medium text-mlb-blue">Разминка:</span>
                                    <span className="ml-2 text-mlb-gray">{workout.warmup_exercises.length} упр.</span>
                                </div>
                                <div>
                                    <span className="font-medium text-mlb-blue">Основная:</span>
                                    <span className="ml-2 text-mlb-gray">{workout.main_exercises.length} упр.</span>
                                </div>
                            </div>

                            {/* Возрастные группы */}
                            <div className="flex flex-wrap gap-2">
                                {workout.age_group_ids.map(ageId => (
                                    <span key={ageId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {getReferenceName('age_groups', ageId)}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {trainingData.workouts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-mlb-gray text-lg">Тренировок пока нет</p>
                            <p className="text-mlb-gray mt-2">Скоро появятся новые программы</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};