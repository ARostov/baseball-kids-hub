import { AppSection } from '../types';
import { appSections } from '../data/mockData';

interface HomePageProps {
    onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    ⚾ Baseball Kids Hub
                </h1>
                <p className="text-lg text-gray-600">
                    Твой путь к бейсбольному величию!
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {appSections.map((section: AppSection) => (
                    <div
                        key={section.id}
                        onClick={() => !section.comingSoon && onNavigate(section.path)}
                        className={`
              bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 
              cursor-pointer transition-all duration-300 hover:scale-105 
              hover:shadow-xl hover:border-blue-300
              ${section.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}
            `}
                    >
                        <div className="text-center">
                            <div className="text-4xl mb-3">{section.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {section.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                {section.description}
                            </p>
                            {section.comingSoon && (
                                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Скоро
                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};