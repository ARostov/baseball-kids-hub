import { useParams, useNavigate } from 'react-router-dom';
import { mockTrainings } from '../data/mockData';

export const TrainingDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const training = mockTrainings.find(t => t.id === Number(id));

    if (!training) {
        return <div>Тренировка не найдена</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/trainings')}
                    className="mb-4 text-blue-600 hover:text-blue-800"
                >
                    ← Назад к тренировкам
                </button>

                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">{training.name}</h1>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Тип: {training.type}</span>
                        <span>Длительность: {training.duration}</span>
                        <span>Сложность: {training.difficulty}</span>
                    </div>
                </header>

                {/* Разминка */}
                <Section section={training.sections.warmup} />

                {/* Основные упражнения */}
                <Section section={training.sections.main} />

                {/* Заминка */}
                <Section section={training.sections.cooldown} />

                <div className="mt-8 text-center">
                    <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
                        Завершить тренировку
                    </button>
                </div>
            </div>
        </div>
    );
};

const Section: React.FC<{ section: any }> = ({ section }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
        <p className="text-gray-600 mb-4">Длительность: {section.duration}</p>

        <div className="space-y-4">
            {section.exercises.map((exercise: any) => (
                <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
                            <p className="text-sm text-gray-600">{exercise.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {exercise.duration}
                                {exercise.sets && ` • ${exercise.sets}×${exercise.reps}`}
                            </p>
                        </div>
                        <button className={`px-4 py-2 rounded-lg text-sm ${
                            exercise.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                            {exercise.completed ? '✓ Выполнено' : 'Отметить'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);