import { useNavigate } from 'react-router-dom';
import { mockTrainings } from '../data/mockData';

export const TrainingsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🏃 Тренировки</h1>
                </header>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="space-y-4">
                        {mockTrainings.map(training => (
                            <div
                                key={training.id}
                                onClick={() => navigate(`/training/${training.id}`)}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${training.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{training.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {training.date} • {training.duration} • {training.type}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    training.completed
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {training.completed ? 'Завершено' : 'Начать'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};