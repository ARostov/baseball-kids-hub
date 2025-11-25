import { useState } from 'react';
import { gradesData } from '../data/gradesData';

export const GradesPage: React.FC = () => {
    const [selectedQuarter, setSelectedQuarter] = useState<number>(2);

    const calculateAverage = (grades: number[]) => {
        if (grades.length === 0) return 0;
        return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    };

    const getQuarterGrades = (quarter: number) => {
        const quarterKey = `quarter${quarter}` as keyof typeof gradesData.subjects[0];
        return gradesData.subjects.map(subject => ({
            ...subject,
            grades: subject[quarterKey] as number[],
            average: calculateAverage(subject[quarterKey] as number[])
        }));
    };

    const currentQuarterGrades = getQuarterGrades(selectedQuarter);
    const overallAverage = calculateAverage(currentQuarterGrades.map(subject => subject.average));

    const getGradeColor = (grade: number) => {
        if (grade >= 4.5) return 'text-green-600 bg-green-100';
        if (grade >= 3.5) return 'text-blue-600 bg-blue-100';
        if (grade >= 3) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">📚 Успеваемость в школе</h1>
                    <p className="text-gray-600 mt-2">
                        {gradesData.student.name} • {gradesData.student.class} класс
                    </p>
                </header>

                {/* Выбор четверти */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Выберите четверть</h2>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map(quarter => (
                            <button
                                key={quarter}
                                onClick={() => setSelectedQuarter(quarter)}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                    selectedQuarter === quarter
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {quarter} четверть
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Основные оценки */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Оценки за {selectedQuarter} четверть
                            </h2>

                            <div className="space-y-4">
                                {currentQuarterGrades.map(subject => (
                                    <div key={subject.name} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.average)}`}>
                                                Средний: {subject.average.toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 flex-wrap">
                                            {subject.grades.map((grade, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold ${
                                                        grade === 5 ? 'bg-green-100 text-green-800' :
                                                            grade === 4 ? 'bg-blue-100 text-blue-800' :
                                                                grade === 3 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {grade}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Статистика и общий прогресс */}
                    <div className="space-y-6">
                        {/* Общий средний балл */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Общий средний балл</h3>
                            <div className="text-center">
                                <div className={`text-4xl font-bold mb-2 ${getGradeColor(overallAverage)}`}>
                                    {overallAverage.toFixed(2)}
                                </div>
                                <p className="text-gray-600">за {selectedQuarter} четверть</p>
                            </div>
                        </div>

                        {/* Прогресс по четвертям */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Прогресс по четвертям</h3>
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(quarter => {
                                    const quarterGrades = getQuarterGrades(quarter);
                                    const quarterAverage = calculateAverage(quarterGrades.map(subject => subject.average));

                                    return (
                                        <div key={quarter} className="flex items-center justify-between">
                                            <span className="text-gray-600">{quarter} четверть</span>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-16 text-center px-2 py-1 rounded text-sm font-medium ${getGradeColor(quarterAverage)}`}>
                                                    {quarterAverage.toFixed(2)}
                                                </div>
                                                {quarter === selectedQuarter && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Лучшие предметы */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Лучшие предметы</h3>
                            <div className="space-y-2">
                                {currentQuarterGrades
                                    .sort((a, b) => b.average - a.average)
                                    .slice(0, 3)
                                    .map((subject) => (
                                        <div key={subject.name} className="flex items-center justify-between">
                                            <span className="text-gray-700">{subject.name}</span>
                                            <span className={`font-semibold ${getGradeColor(subject.average)}`}>
                        {subject.average.toFixed(2)}
                      </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};