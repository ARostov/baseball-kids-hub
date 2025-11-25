import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './pages/Profile';
import { TrainingsPage } from './pages/Trainings';
import { TrainingDetail } from './pages/TrainingDetail';
import { LegendsPage } from './pages/Legends';
import { LegendDetail } from './pages/LegendDetail';
import { LevelsPage } from './pages/Levels';
import { LevelRequirementsPage } from './pages/LevelRequirements';
import { SchedulePage } from './pages/Schedule';
import { QuizPage } from './pages/Quiz';
import { GradesPage } from './pages/Grades';
import { RulesPage } from './pages/Rules';
import { Header } from './components/Header';

function AppContent() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage onNavigate={navigate} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/trainings" element={<TrainingsPage />} />
                <Route path="/training/:id" element={<TrainingDetail />} />
                <Route path="/legends" element={<LegendsPage />} />
                <Route path="/legend/:id" element={<LegendDetail />} />
                <Route path="/levels" element={<LevelsPage />} />
                <Route path="/level/:id/requirements" element={<LevelRequirementsPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/grades" element={<GradesPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/achievements" element={<div className="p-8">Ачивки - в разработке</div>} />
                <Route path="/friends" element={<div className="p-8">Друзья - в разработке</div>} />
                <Route path="/shop" element={<div className="p-8">Магазин - в разработке</div>} />
                <Route path="/tips" element={<div className="p-8">Советы - в разработке</div>} />
            </Routes>
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