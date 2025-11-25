import React, { useState } from 'react';
import { rulesData } from '../data/rulesData';

export const RulesPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>(rulesData.categories[0].id);

    const currentCategory = rulesData.categories.find(cat => cat.id === selectedCategory);
    const rulesInCategory = rulesData.rules.filter(rule => rule.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">📖 Правила бейсбола</h1>
                    <p className="text-gray-600 mt-2">Изучи основы великой игры</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Навигация по категориям */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Разделы</h2>
                            <nav className="space-y-2">
                                {rulesData.categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                            selectedCategory === category.id
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="font-medium">{category.name}</div>
                                        <div className="text-sm opacity-75">{category.description}</div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Контент правил */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {currentCategory?.name}
                            </h2>
                            <p className="text-gray-600 mb-8">{currentCategory?.description}</p>

                            <div className="space-y-8">
                                {rulesInCategory.map((rule, index) => (
                                    <div key={rule.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                                    {rule.title}
                                                </h3>
                                                <div className="prose max-w-none">
                                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                                        {rule.description}
                                                    </p>

                                                    {rule.examples && rule.examples.length > 0 && (
                                                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                                            <h4 className="font-semibold text-blue-800 mb-2">Пример:</h4>
                                                            <ul className="list-disc list-inside space-y-1 text-blue-700">
                                                                {rule.examples.map((example, exampleIndex) => (
                                                                    <li key={exampleIndex}>{example}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {rule.important && (
                                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                                            <div className="flex">
                                                                <div className="flex-shrink-0">💡</div>
                                                                <div className="ml-3">
                                                                    <p className="text-sm text-yellow-700">
                                                                        <span className="font-semibold">Важно:</span> {rule.important}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rule.terms && rule.terms.length > 0 && (
                                                        <div className="bg-gray-50 rounded-lg p-4">
                                                            <h4 className="font-semibold text-gray-800 mb-2">Термины:</h4>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {rule.terms.map((term, termIndex) => (
                                                                    <div key={termIndex} className="text-sm">
                                                                        <span className="font-semibold text-gray-700">{term.term}:</span>
                                                                        <span className="text-gray-600 ml-1">{term.definition}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {rulesInCategory.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Раздел в разработке</h3>
                                    <p className="text-gray-600">Скоро здесь появятся правила</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};