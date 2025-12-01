// src/pages/ExercisesPage.tsx (только чтение)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingData } from '../hooks/useTrainingData';
import { ExerciseList } from '../components/ExerciseList';

export const ExercisesPage: React.FC = () => {
    const navigate = useNavigate();
    const { trainingData, loading, error } = useTrainingData();

    if (loading) {
        return (
            <div className="min-h-screen bg-mlb-light-gray p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mlb-blue mx-auto"></div>
                    <p className="mt-4 text-mlb-gray">Загрузка упражнений...</p>
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
                            <h1 className="text-3xl font-bold text-mlb-blue">💪 Упражнения</h1>
                            <p className="text-mlb-gray mt-2">
                                База упражнений для тренировок
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/trainings')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            🏃 К тренировкам
                        </button>
                    </div>
                </header>

                <ExerciseList
                    exercises={trainingData.exercises}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
            </div>
        </div>
    );
};