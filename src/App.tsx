// src/App.tsx (обновленная версия)
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './pages/Profile';
import { TrainingDetail } from './pages/TrainingDetail';
import { LegendsPage } from './pages/Legends';
import { LegendDetail } from './pages/LegendDetail';
import { LevelsPage } from './pages/Levels';
import { LevelRequirementsPage } from './pages/LevelRequirements';
import { SchedulePage } from './pages/Schedule';
import { QuizPage } from './pages/Quiz';
import { GradesPage } from './pages/Grades';
import { RulesPage } from './pages/Rules';
import { TipsPage } from './pages/Tips';
import { AchievementsPage } from './pages/Achievements';
import { Header } from './components/Header';
import { TrainingsNewPage } from './pages/TrainingsNew';
import { WorkoutsPage } from './pages/WorkoutsPage';
import {ExercisesPage} from "./pages/ExercisesPage.tsx";

function AppContent() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-mlb-light-gray font-montserrat">
            <Header />
            <main className="container mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<HomePage onNavigate={navigate} />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Старые маршруты тренировок (для обратной совместимости) */}
                    <Route path="/training/:id" element={<TrainingDetail />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                    <Route path="/trainings" element={<TrainingsNewPage />} /> {/* Теперь это страница тренировок */}

                    // В App.tsx заменить старый маршрут тренировок на новый
                    <Route path="/exercises" element={<TrainingsNewPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />

                    <Route path="/legends" element={<LegendsPage />} />
                    <Route path="/legend/:id" element={<LegendDetail />} />
                    <Route path="/levels" element={<LevelsPage />} />
                    <Route path="/level/:id/requirements" element={<LevelRequirementsPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/grades" element={<GradesPage />} />
                    <Route path="/rules" element={<RulesPage />} />
                    <Route path="/tips" element={<TipsPage />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route path="/friends" element={
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-mlb-blue mb-4">Друзья</h2>
                            <p className="text-mlb-gray">Функция появится в следующем обновлении</p>
                        </div>
                    } />
                    <Route path="/shop" element={
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-mlb-blue mb-4">Магазин</h2>
                            <p className="text-mlb-gray">Скоро открытие!</p>
                        </div>
                    } />
                </Routes>
            </main>

            {/* Футер в стиле MLB */}
            <footer className="bg-mlb-blue text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-3xl mb-4">⚾</div>
                    <p className="text-lg font-semibold mb-2">Baseball Kids Hub</p>
                    <p className="text-mlb-light-gray text-sm">Официальная образовательная платформа для юных бейсболистов</p>
                    <div className="mt-4 text-xs text-mlb-light-gray">
                        © 2024 Baseball Kids Hub. Все права защищены.
                    </div>
                </div>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;