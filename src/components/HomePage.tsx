import { AppSection } from '../types';
import { appSections } from '../data/mockData';

interface HomePageProps {
    onNavigate: (path: string) => void;
}

// type SectionId = 'profile' | 'trainings' | 'schedule' | 'levels' | 'achievements' |
//     'legends' | 'grades' | 'quiz' | 'rules' | 'tips' | 'friends' | 'shop';

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Герой-секция */}
            <section className="bg-gradient-to-r from-mlb-blue to-mlb-light-blue text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-6xl mb-6">⚾</div>
                    <h1 className="text-5xl font-bold mb-4">Baseball Kids Hub</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Платформа для развития юных бейсболистов
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => onNavigate('/trainings')}
                            className="mlb-button-primary text-lg"
                        >
                            Начать тренировки
                        </button>
                        <button
                            onClick={() => onNavigate('/legends')}
                            className="mlb-button-secondary text-lg border-white text-mlb-blue hover:bg-white hover:text-mlb-blue"
                        >
                            Изучить легенды
                        </button>
                    </div>
                </div>
            </section>

            {/* Основные разделы */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mlb-section-title text-center">Все разделы платформы</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {appSections.map((section: AppSection) => (
                            <div
                                key={section.id}
                                onClick={() => !section.comingSoon && onNavigate(section.path)}
                                className={`
                                    mlb-card p-6 cursor-pointer transition-all duration-300
                                    ${section.comingSoon
                                    ? 'opacity-60 cursor-not-allowed'
                                    : 'hover:shadow-xl'
                                }
                                `}
                            >
                                {section.comingSoon && (
                                    <div className="absolute -top-2 -right-2 bg-mlb-gray text-white text-xs font-bold px-2 py-1 rounded">
                                        СКОРО
                                    </div>
                                )}

                                <div className="text-center">
                                    <div className="text-4xl mb-4 text-mlb-blue">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-mlb-blue mb-2">
                                        {section.title}
                                    </h3>
                                    <p className="text-mlb-gray text-sm mb-4">
                                        {section.description}
                                    </p>

                                    {!section.comingSoon && (
                                        <button className="text-mlb-red font-medium text-sm hover:underline">
                                            Перейти →
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Статистика */}
            <section className="bg-mlb-light-gray py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mlb-section-title text-center">Наша платформа в цифрах</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-mlb-blue mb-2">1+</div>
                            <div className="text-mlb-gray">Юных бейсболистов</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-mlb-blue mb-2">30+</div>
                            <div className="text-mlb-gray">Легенд MLB</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-mlb-blue mb-2">25+</div>
                            <div className="text-mlb-gray">Тренировочных программ</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-mlb-blue mb-2">10</div>
                            <div className="text-mlb-gray">Уровней мастерства</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};