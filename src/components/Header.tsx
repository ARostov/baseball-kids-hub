import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Не показывать хедер на главной странице
    if (location.pathname === '/') {
        return null;
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Логотип и название */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="text-2xl">⚾</div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Baseball Kids Hub</h1>
                            <p className="text-xs text-gray-500">Твой путь к величию</p>
                        </div>
                    </button>

                    {/* Навигация */}
                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => navigate('/trainings')}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Тренировки
                        </button>
                        <button
                            onClick={() => navigate('/schedule')}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Расписание
                        </button>
                        <button
                            onClick={() => navigate('/legends')}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Легенды
                        </button>
                        <button
                            onClick={() => navigate('/quiz')}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Викторина
                        </button>
                    </nav>

                    {/* Профиль */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm">👤</span>
                        </div>
                        <span className="hidden sm:block">Профиль</span>
                    </button>
                </div>
            </div>
        </header>
    );
};