import { useNavigate } from 'react-router-dom';
import { legendsData } from '../data/legendsData';
import { LegendCard } from '../components/LegendCard';
import { Legend } from '../types/legend';
import {useState} from "react";

export const LegendsPage: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'owned' | 'not-owned'>('all');

    const filteredLegends = legendsData.filter(legend => {
        if (filter === 'owned') return legend.owned;
        if (filter === 'not-owned') return !legend.owned;
        return true;
    });

    const handleCardClick = (legend: Legend) => {
        navigate(`/legend/${legend.id}`);
    };

    const ownedCount = legendsData.filter(l => l.owned).length;
    const totalCount = legendsData.length;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🌟 Легенды бейсбола</h1>
                    <p className="text-gray-600 mt-2">
                        Коллекция великих игроков ({ownedCount}/{totalCount})
                    </p>
                </header>

                {/* Фильтры */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'
                        }`}
                    >
                        Все
                    </button>
                    <button
                        onClick={() => setFilter('owned')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'owned' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 border'
                        }`}
                    >
                        В коллекции
                    </button>
                    <button
                        onClick={() => setFilter('not-owned')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'not-owned' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 border'
                        }`}
                    >
                        Не получены
                    </button>
                </div>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredLegends.map(legend => (
                        <LegendCard
                            key={legend.id}
                            legend={legend}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>

                {filteredLegends.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ничего не найдено</h3>
                        <p className="text-gray-600">Попробуйте изменить фильтр</p>
                    </div>
                )}
            </div>
        </div>
    );
};