import React from 'react';
import { useNavigate } from 'react-router-dom';
import { levelsData } from '../data/levelsData';

export const LevelsPage: React.FC = () => {
    const navigate = useNavigate();
    const currentLevel = levelsData.levels.find(level => level.unlocked && !levelsData.levels.find(l => l.id === level.id + 1)?.unlocked) || levelsData.levels[0];

    const handleRequirementsClick = (levelId: number) => {
        navigate(`/level/${levelId}/requirements`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🎯 Система уровней</h1>
                    <p className="text-gray-600 mt-2">Прогрессируй от новичка до легенды</p>
                </header>

                {/* Текущий уровень */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Текущий уровень</h2>
                    <div className="flex items-center gap-6">
                        <div className="text-6xl">{currentLevel.image}</div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{currentLevel.name}</h3>
                            <p className="text-gray-600">{currentLevel.description}</p>
                            <div className="mt-2">
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Активный
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Прогресс уровней */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Все уровни</h2>
                    <div className="space-y-6">
                        {levelsData.levels.map((level, index) => (
                            <div key={level.id} className={`border-l-4 pl-6 py-4 ${
                                level.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                            }`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                                            level.unlocked ? 'bg-green-500' : 'bg-gray-400'
                                        }`}>
                                            {level.id}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{level.name}</h3>
                                            <p className="text-sm text-gray-600">{level.description}</p>
                                            {level.unlocked ? (
                                                <span className="text-green-600 text-sm">✓ Разблокирован</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleRequirementsClick(level.id)}
                                                    className="text-blue-600 text-sm hover:text-blue-800 mt-1"
                                                >
                                                    Посмотреть нормативы →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {!level.unlocked && index === levelsData.levels.findIndex(l => l.unlocked) + 1 && (
                                        <button
                                            onClick={() => handleRequirementsClick(level.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Изучить нормативы
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};