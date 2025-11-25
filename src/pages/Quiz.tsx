import React, { useState } from 'react';
import { quizData } from '../data/quizData';

export const QuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
        setSelectedAnswer(null);

        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
        setAnsweredQuestions([]);
    };

    const getDifficultyStars = (difficulty: number) => {
        return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
    };

    if (showResult) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Викторина завершена!</h1>
                        <div className="text-4xl font-bold text-blue-600 mb-4">
                            {score} / {quizData.questions.length}
                        </div>
                        <p className="text-gray-600 mb-6">
                            {score === quizData.questions.length ? 'Идеальный результат! Ты настоящий эксперт!' :
                                score >= quizData.questions.length * 0.7 ? 'Отличный результат!' :
                                    'Хорошая попытка! Продолжай учиться!'}
                        </p>
                        <button
                            onClick={handleRestartQuiz}
                            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
                        >
                            Пройти ещё раз
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">❓ Викторина по бейсболу</h1>
                    <p className="text-gray-600 mt-2">Проверь свои знания правил и тактики</p>
                </header>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Прогресс */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-sm text-gray-600">
                            Вопрос {currentQuestionIndex + 1} из {quizData.questions.length}
                        </div>
                        <div className="text-sm font-semibold text-blue-600">
                            Счёт: {score}
                        </div>
                    </div>

                    {/* Прогресс-бар */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}
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
                        {currentQuestion.options.map((option, index) => (
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
                        {currentQuestionIndex < quizData.questions.length - 1 ? 'Следующий вопрос' : 'Завершить викторину'}
                    </button>
                </div>
            </div>
        </div>
    );
};