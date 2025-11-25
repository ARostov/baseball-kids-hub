import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ProfilePage } from './pages/Profile';
import { TrainingsPage } from './pages/Trainings';
import { TrainingDetail } from './pages/TrainingDetail';

function AppContent() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<HomePage onNavigate={navigate} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/trainings" element={<TrainingsPage />} />
                <Route path="/schedule" element={<div className="p-8">Расписание - в разработке</div>} />
                <Route path="/levels" element={<div className="p-8">Уровни - в разработке</div>} />
                <Route path="/achievements" element={<div className="p-8">Ачивки - в разработке</div>} />
                <Route path="/legends" element={<div className="p-8">Легенды - в разработке</div>} />
                <Route path="/grades" element={<div className="p-8">Учёба - в разработке</div>} />
                <Route path="/quiz" element={<div className="p-8">Викторина - в разработке</div>} />
                <Route path="/friends" element={<div className="p-8">Друзья - в разработке</div>} />
                <Route path="/shop" element={<div className="p-8">Магазин - в разработке</div>} />
                <Route path="/rules" element={<div className="p-8">Правила - в разработке</div>} />
                <Route path="/tips" element={<div className="p-8">Советы - в разработке</div>} />
                <Route path="/training/:id" element={<TrainingDetail />} />
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