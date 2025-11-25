import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();

    return (
        <header className="mlb-header">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Логотип и название */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-4 hover:opacity-90 transition-opacity"
                    >
                        <div className="bg-white rounded-full p-2">
                            <span className="text-mlb-blue text-2xl font-bold">⚾</span>
                        </div>
                        <div className="text-left">
                            <h1 className="text-xl font-bold text-white leading-tight">
                                Baseball Kids
                            </h1>
                            <p className="text-mlb-light-gray text-sm">HUB</p>
                        </div>
                    </button>

                    {/* Навигация */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={() => navigate('/trainings')}
                            className="text-white hover:text-mlb-light-gray transition-colors font-medium text-sm uppercase tracking-wide"
                        >
                            Тренировки
                        </button>
                        <button
                            onClick={() => navigate('/legends')}
                            className="text-white hover:text-mlb-light-gray transition-colors font-medium text-sm uppercase tracking-wide"
                        >
                            Легенды
                        </button>
                        <button
                            onClick={() => navigate('/levels')}
                            className="text-white hover:text-mlb-light-gray transition-colors font-medium text-sm uppercase tracking-wide"
                        >
                            Уровни
                        </button>
                        <button
                            onClick={() => navigate('/achievements')}
                            className="text-white hover:text-mlb-light-gray transition-colors font-medium text-sm uppercase tracking-wide"
                        >
                            Достижения
                        </button>
                        <button
                            onClick={() => navigate('/profile')}
                            className="mlb-button-primary text-sm py-2 px-4"
                        >
                            Мой профиль
                        </button>
                    </nav>

                    {/* Мобильное меню (упрощённо) */}
                    <button className="md:hidden text-white">
                        <span className="text-2xl">☰</span>
                    </button>
                </div>
            </div>
        </header>
    );
}