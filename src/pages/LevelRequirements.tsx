import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levelsData } from '../data/levelsData';

export const LevelRequirementsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const level = levelsData.levels.find(l => l.id === Number(id));

    if (!level) {
        return <div>Уровень не найден</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/levels')}
                    className="mb-4 text-blue-600 hover:text-blue-800"
                >
                    ← Назад к уровням
                </button>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{level.image}</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{level.name}</h1>
                        <p className="text-gray-600 text-lg">{level.description}</p>
                        <div className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                            level.unlocked ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {level.unlocked ? '✓ Уровень разблокирован' : 'Нормативы для перехода'}
                        </div>
                    </div>

                    {/* Нормативы */}
                    {Object.keys(level.requirements).length > 0 ? (
                        <div className="space-y-6">
                            {level.requirements.fitness && (
                                <RequirementSection
                                    title="💪 Физическая подготовка"
                                    requirements={level.requirements.fitness}
                                />
                            )}
                            {level.requirements.accuracy && (
                                <RequirementSection
                                    title="🎯 Точность"
                                    requirements={level.requirements.accuracy}
                                />
                            )}
                            {level.requirements.knowledge && (
                                <RequirementSection
                                    title="📚 Знания"
                                    requirements={level.requirements.knowledge}
                                />
                            )}
                            {level.requirements.skills && (
                                <RequirementSection
                                    title="⚾ Навыки"
                                    requirements={level.requirements.skills}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">🎉</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Первый уровень!</h3>
                            <p className="text-gray-600">Ты уже на пути к величию. Продолжай тренировки!</p>
                        </div>
                    )}

                    {!level.unlocked && (
                        <div className="mt-8 text-center">
                            <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
                                Отметить выполнение
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const RequirementSection: React.FC<{ title: string; requirements: string[] }> = ({
                                                                                     title,
                                                                                     requirements
                                                                                 }) => (
    <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <ul className="space-y-3">
            {requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{req}</span>
                </li>
            ))}
        </ul>
    </div>
);