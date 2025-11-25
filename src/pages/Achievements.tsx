import React, { useState } from 'react';
import { achievementsData } from '../data/achievementsData';

export const AchievementsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredAchievements = selectedCategory === 'all'
        ? achievementsData.achievements
        : achievementsData.achievements.filter(ach => ach.category === selectedCategory);

    const unlockedCount = achievementsData.achievements.filter(ach => ach.unlocked).length;
    const totalCount = achievementsData.achievements.length;

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'training': return '💪';
            case 'game': return '⚾';
            case 'knowledge': return '📚';
            case 'levels': return '⭐';
            case 'streak': return '🔥';
            default: return '🏆';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'training': return 'Тренировки';
            case 'game': return 'Игры';
            case 'knowledge': return 'Знания';
            case 'levels': return 'Уровни';
            case 'streak': return 'Серии';
            default: return 'Все';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🏆 Система ачивок</h1>
                    <p className="text-gray-600 mt-2">
                        Собирай достижения и становись лучше! ({unlockedCount}/{totalCount})
                    </p>
                </header>

                {/* Прогресс */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Общий прогресс</h2>
                        <span className="text-lg font-semibold text-blue-600">
              {unlockedCount}/{totalCount}
            </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Фильтры по категориям */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Категории</h2>
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                        selectedCategory === 'all'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="font-medium">Все ачивки</div>
                                    <div className="text-sm opacity-75">{totalCount} ачивок</div>
                                </button>

                                {achievementsData.categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                            selectedCategory === category.id
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{getCategoryIcon(category.id)}</span>
                                            <div>
                                                <div className="font-medium">{category.name}</div>
                                                <div className="text-sm opacity-75">
                                                    {achievementsData.achievements.filter(ach => ach.category === category.id && ach.unlocked).length}/
                                                    {achievementsData.achievements.filter(ach => ach.category === category.id).length}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Сетка ачивок */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {selectedCategory === 'all' ? 'Все ачивки' : getCategoryName(selectedCategory)}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredAchievements.map(achievement => (
                                    <div
                                        key={achievement.id}
                                        className={`border-2 rounded-xl p-6 transition-all ${
                                            achievement.unlocked
                                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 opacity-60'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                                                {achievement.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {achievement.name}
                                                    </h3>
                                                    {achievement.unlocked && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Получена
                            </span>
                                                    )}
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3">
                                                    {achievement.description}
                                                </p>

                                                {achievement.progress && (
                                                    <div className="mb-3">
                                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                            <span>Прогресс</span>
                                                            <span>{achievement.progress.current}/{achievement.progress.total}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                                style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}

                                                {achievement.reward && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span>Награда:</span>
                                                        {achievement.reward.coins && (
                                                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                {achievement.reward.coins} BaseCoin
                              </span>
                                                        )}
                                                        {achievement.reward.legendCard && (
                                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                Карточка легенды
                              </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredAchievements.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ачивок не найдено</h3>
                                    <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};