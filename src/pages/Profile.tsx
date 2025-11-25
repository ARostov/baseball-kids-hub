import { mockProfile } from '../data/mockData';

export const ProfilePage: React.FC = () => {
    const progress = (mockProfile.experience / mockProfile.experienceToNextLevel) * 100;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">👤 Мой Профиль</h1>
                </header>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">{mockProfile.avatar}</div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{mockProfile.name}</h2>
                            <p className="text-gray-600">Команда: {mockProfile.teamLogo}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{mockProfile.stats.trainingsCompleted}</div>
                            <div className="text-sm text-gray-600">Тренировок</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{mockProfile.stats.gamesPlayed}</div>
                            <div className="text-sm text-gray-600">Игр</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">{mockProfile.stats.achievementsUnlocked}</div>
                            <div className="text-sm text-gray-600">Ачивок</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{mockProfile.baseCoins}</div>
                            <div className="text-sm text-gray-600">BaseCoin</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Уровень: {mockProfile.currentLevel}</span>
                            <span>Следующий: {mockProfile.nextLevel}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="text-right text-sm text-gray-600 mt-1">
                            {mockProfile.experience} / {mockProfile.experienceToNextLevel} опыта
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};