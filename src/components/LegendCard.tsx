import { Legend } from '../types';
import {ImageWithFallback} from "./ImageWithFallback.tsx";

interface LegendCardProps {
    legend: Legend;
    onCardClick: (legend: Legend) => void;
}

export const LegendCard: React.FC<LegendCardProps> = ({ legend, onCardClick }) => {
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'bg-gray-100 text-gray-800';
            case 'rare': return 'bg-blue-100 text-blue-800';
            case 'epic': return 'bg-purple-100 text-purple-800';
            case 'legendary': return 'bg-yellow-100 text-yellow-800';
            case 'mythic': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRarityText = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'Обычная';
            case 'rare': return 'Редкая';
            case 'epic': return 'Эпическая';
            case 'legendary': return 'Легендарная';
            case 'mythic': return 'Мифическая';
            default: return 'Обычная';
        }
    };

    return (
        <div
            onClick={() => onCardClick(legend)}
            className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                !legend.owned ? 'opacity-60' : ''
            }`}
        >
            <div className="text-center">
                <div className="w-[222px] h-[285px] mx-auto mb-4">
                    <ImageWithFallback
                        src={legend.image}
                        alt={legend.name}
                        fallback={
                            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                <div className="text-4xl">⚾</div>
                            </div>
                        }
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{legend.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{legend.position}</p>
                <p className="text-xs text-gray-500 mb-4">{legend.era}</p>

                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRarityColor(legend.rarity)}`}>
                    {getRarityText(legend.rarity)}
                </div>

                {!legend.owned && (
                    <div className="mt-4">
                        <div className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                            Не получена
                        </div>
                        {legend.price && (
                            <div className="text-sm text-gray-600 mt-2">
                                Цена: {legend.price} BaseCoin
                            </div>
                        )}
                    </div>
                )}

                {legend.owned && (
                    <div className="mt-4">
                        <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            В коллекции
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};