import React, { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';

interface AnsweredQuestion {
    question: string;
    userAnswer: number;
    correctAnswer: number;
    explanation: string;
    options: string[];
}

export const QuizPage: React.FC = () => {
    const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);

    // Выбираем случайные 10 вопросов при загрузке
    useEffect(() => {
        const shuffled = [...quizData.questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
        setSelectedQuestions(shuffled);
    }, []);

    const currentQuestion = selectedQuestions[currentQuestionIndex];

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = () => {
        if (currentQuestion && selectedAnswer !== null) {
            // Сохраняем информацию о вопросе и ответе
            const answeredQuestion: AnsweredQuestion = {
                question: currentQuestion.question,
                userAnswer: selectedAnswer,
                correctAnswer: currentQuestion.correctAnswer,
                explanation: currentQuestion.explanation,
                options: currentQuestion.options
            };

            // Проверяем правильность ответа
            if (selectedAnswer === currentQuestion.correctAnswer) {
                setScore(score + 1);
            }

            setAnsweredQuestions([...answeredQuestions, answeredQuestion]);
            setSelectedAnswer(null);

            if (currentQuestionIndex < selectedQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setShowResult(true);
            }
        }
    };

    const handleRestartQuiz = () => {
        // Перезапускаем с новыми случайными вопросами
        const shuffled = [...quizData.questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
        setSelectedQuestions(shuffled);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setAnsweredQuestions([]);
    };

    const getDifficultyStars = (difficulty: number) => {
        return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
    };

    // Получаем неправильно отвеченные вопросы
    const getIncorrectAnswers = () => {
        return answeredQuestions.filter(q => q.userAnswer !== q.correctAnswer);
    };

    if (showResult) {
        const incorrectAnswers = getIncorrectAnswers();

        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">🎉</div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Викторина завершена!</h1>
                            <div className="text-4xl font-bold text-blue-600 mb-4">
                                {score} / {selectedQuestions.length}
                            </div>
                            <p className="text-gray-600 mb-6">
                                {score === selectedQuestions.length ? 'Идеальный результат! Ты настоящий эксперт!' :
                                    score >= selectedQuestions.length * 0.7 ? 'Отличный результат!' :
                                        'Хорошая попытка! Продолжай учиться!'}
                            </p>
                        </div>

                        {/* Неправильные ответы */}
                        {incorrectAnswers.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span className="text-red-500">✗</span>
                                    Вопросы с неправильными ответами
                                </h2>

                                <div className="space-y-6">
                                    {incorrectAnswers.map((question, index) => (
                                        <div key={index} className="border-2 border-red-100 bg-red-50 rounded-xl p-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                                {index + 1}. {question.question}
                                            </h3>

                                            <div className="space-y-2 mb-4">
                                                <div className="text-sm text-gray-600">Ваш ответ:</div>
                                                <div className="bg-white border border-red-300 rounded-lg p-3 text-red-600">
                                                    {question.options[question.userAnswer]}
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="text-sm text-gray-600">Правильный ответ:</div>
                                                <div className="bg-white border border-green-300 rounded-lg p-3 text-green-600">
                                                    {question.options[question.correctAnswer]}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-sm text-gray-600">Объяснение:</div>
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-gray-700">
                                                    {question.explanation}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {incorrectAnswers.length === 0 && (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-semibold text-green-600 mb-2">
                                    Поздравляем! Все ответы правильные!
                                </h3>
                                <p className="text-gray-600">
                                    Вы отлично справились со всеми вопросами викторины.
                                </p>
                            </div>
                        )}

                        <div className="text-center mt-8">
                            <button
                                onClick={handleRestartQuiz}
                                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
                            >
                                Начать новую викторину
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Пока загружаются вопросы
    if (selectedQuestions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">⚾</div>
                    <h2 className="text-xl font-semibold text-gray-800">Загрузка вопросов...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">⚾ Викторина по бейсболу</h1>
                    <p className="text-gray-600 mt-2">10 случайных вопросов для проверки знаний</p>
                </header>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Прогресс */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-sm text-gray-600">
                            Вопрос {currentQuestionIndex + 1} из {selectedQuestions.length}
                        </div>
                        <div className="text-sm font-semibold text-blue-600">
                            Счёт: {score}
                        </div>
                    </div>

                    {/* Прогресс-бар */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Вопрос */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h2>
                            <div className="text-yellow-500 text-sm">
                                {getDifficultyStars(currentQuestion.difficulty)}
                            </div>
                        </div>

                        {/* Категория */}
                        <div className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mb-4">
                            {quizData.categories.find(cat => cat.id === currentQuestion.category)?.name}
                        </div>
                    </div>

                    {/* Варианты ответов */}
                    <div className="space-y-3 mb-8">
                        {currentQuestion.options.map((option: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    selectedAnswer === index
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                                        selectedAnswer === index
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : 'border-gray-300'
                                    }`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="text-gray-800">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Кнопка следующего вопроса */}
                    <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors ${
                            selectedAnswer === null
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        {currentQuestionIndex < selectedQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить викторину'}
                    </button>
                </div>
            </div>
        </div>
    );
};