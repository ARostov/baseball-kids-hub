import { useParams, useNavigate } from 'react-router-dom';
import { legendsData } from '../data/legendsData';

export const LegendDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const legend = legendsData.find(l => l.id === Number(id));

    if (!legend) {
        return <div>Легенда не найдена</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/legends')}
                    className="mb-4 text-blue-600 hover:text-blue-800"
                >
                    ← Назад к коллекции
                </button>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <div className="text-8xl mb-4">⚾</div>
                            <div className={`px-4 py-2 rounded-full text-center font-medium ${
                                legend.owned ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {legend.owned ? 'В коллекции' : 'Не получена'}
                            </div>
                        </div>

                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{legend.name}</h1>
                            <p className="text-gray-600 mb-4">{legend.fullName}</p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="font-semibold text-gray-800">Позиция</h3>
                                    <p className="text-gray-600">{legend.position}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Эра</h3>
                                    <p className="text-gray-600">{legend.era}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2">Команды</h3>
                                {legend.teams.map((team, index) => (
                                    <div key={index} className="text-gray-600">
                                        {team.name} ({team.years}) #{team.number}
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2">Статистика</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>AVG: {legend.careerStats.battingAverage}</div>
                                    <div>HR: {legend.careerStats.homeRuns}</div>
                                    <div>RBI: {legend.careerStats.RBIs}</div>
                                    {legend.careerStats.stolenBases && (
                                        <div>SB: {legend.careerStats.stolenBases}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2">Достижения</h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm">
                                    {legend.trophies.map((trophy, index) => (
                                        <li key={index}>{trophy}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2">Интересный факт</h3>
                                <p className="text-gray-600">{legend.funFact}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};