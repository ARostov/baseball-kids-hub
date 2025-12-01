// src/pages/WorkoutsPage.tsx
import React, { useState } from 'react';
import { useTrainingData } from '../hooks/useTrainingData';
import { WorkoutManager } from '../components/WorkoutManager';
import { Workout } from '../types';
import { referenceData } from '../data/referenceData';

export const WorkoutsPage: React.FC = () => {
    const {
        trainingData,
        loading,
        error,
        addWorkout,
        saveData
    } = useTrainingData();

    const [showWorkoutManager, setShowWorkoutManager] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState<Workout | undefined>();

    const handleSaveWorkout = async (workout: Workout) => {
        if (editingWorkout) {
            // TODO: Добавить функцию updateWorkout в хук
            console.log('Update workout:', workout);
        } else {
            addWorkout(workout);
        }
        setShowWorkoutManager(false);
        setEditingWorkout(undefined);
        await saveData();
    };

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
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Загрузка тренировок...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">📋 Тренировочные программы</h1>
                            <p className="text-gray-600 mt-2">
                                Создавайте и управляйте тренировочными программами
                            </p>
                        </div>
                        <button
                            onClick={() => setShowWorkoutManager(true)}
                            disabled={trainingData.exercises.length === 0}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            + Создать тренировку
                        </button>
                    </div>
                </header>

                {trainingData.exercises.length === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                        <p className="text-yellow-800 mb-4">
                            Для создания тренировок сначала добавьте упражнения
                        </p>
                        <a
                            href="/trainings-new"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Перейти к упражнениям
                        </a>
                    </div>
                )}

                {/* Список тренировок */}
                <div className="grid gap-6">
                    {trainingData.workouts.map(workout => (
                        <div key={workout.id} className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{workout.title}</h3>
                                    <p className="text-gray-600 mt-1">{workout.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingWorkout(workout);
                                            setShowWorkoutManager(true);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Редактировать
                                    </button>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        Начать
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                    <span className="font-medium text-gray-700">Сложность:</span>
                                    <span className="ml-2 text-gray-600 capitalize">{workout.difficulty}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Общее время:</span>
                                    <span className="ml-2 text-gray-600">{calculateTotalDuration(workout)} мин</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Разминка:</span>
                                    <span className="ml-2 text-gray-600">{workout.warmup_exercises.length} упр.</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Основная:</span>
                                    <span className="ml-2 text-gray-600">{workout.main_exercises.length} упр.</span>
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

                    {trainingData.workouts.length === 0 && trainingData.exercises.length > 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Тренировок пока нет</p>
                            <p className="text-gray-400 mt-2">Создайте первую тренировочную программу</p>
                        </div>
                    )}
                </div>

                {showWorkoutManager && (
                    <WorkoutManager
                        workout={editingWorkout}
                        exercises={trainingData.exercises}
                        onSave={handleSaveWorkout}
                        onCancel={() => {
                            setShowWorkoutManager(false);
                            setEditingWorkout(undefined);
                        }}
                    />
                )}
            </div>
        </div>
    );
};