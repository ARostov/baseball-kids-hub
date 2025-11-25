import React, { useState } from 'react';
import { tipsData } from '../data/tipsData';

export const TipsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>(tipsData.categories[0].id);

    const currentCategory = tipsData.categories.find(cat => cat.id === selectedCategory);
    const tipsInCategory = tipsData.tips.filter(tip => tip.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">💡 Советы по бейсболу</h1>
                    <p className="text-gray-600 mt-2">Полезные подсказки от профессионалов</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Навигация по категориям */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Категории советов</h2>
                            <nav className="space-y-2">
                                {tipsData.categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                            selectedCategory === category.id
                                                ? 'bg-green-500 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="font-medium">{category.name}</div>
                                        <div className="text-sm opacity-75">{category.tipCount} советов</div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Контент советов */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {currentCategory?.name}
                            </h2>
                            <p className="text-gray-600 mb-8">{currentCategory?.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tipsInCategory.map((tip) => (
                                    <div key={tip.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg">
                                                {tip.emoji}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                                    {tip.title}
                                                </h3>
                                                <p className="text-gray-700 mb-4 leading-relaxed">
                                                    {tip.description}
                                                </p>

                                                {tip.steps && tip.steps.length > 0 && (
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Как делать:</h4>
                                                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                                            {tip.steps.map((step, stepIndex) => (
                                                                <li key={stepIndex}>{step}</li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                )}

                                                {tip.proTip && (
                                                    <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                                                        <div className="flex">
                                                            <div className="flex-shrink-0">💎</div>
                                                            <div className="ml-3">
                                                                <p className="text-sm text-yellow-700">
                                                                    <span className="font-semibold">Про-совет:</span> {tip.proTip}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {tip.commonMistakes && tip.commonMistakes.length > 0 && (
                                                    <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-3">
                                                        <h4 className="font-semibold text-red-800 mb-1 text-sm">Избегай:</h4>
                                                        <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                                                            {tip.commonMistakes.map((mistake, mistakeIndex) => (
                                                                <li key={mistakeIndex}>{mistake}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {tipsInCategory.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Советы в разработке</h3>
                                    <p className="text-gray-600">Скоро здесь появятся полезные советы</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};