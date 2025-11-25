import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scheduleData } from '../data/scheduleData';
import { Calendar } from '../components/Calendar';

export const SchedulePage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>('2024-01-20');

    const eventsForSelectedDate = scheduleData.events.filter(event =>
        event.date === selectedDate
    );

    const upcomingEvents = scheduleData.events
        .filter(event => !event.completed)
        .slice(0, 5);

    const eventDates = scheduleData.events.map(event => event.date);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">📅 Расписание</h1>
                    <p className="text-gray-600 mt-2">Тренировки и игры</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ближайшие события */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {selectedDate === new Date().toISOString().split('T')[0]
                                    ? 'Сегодня'
                                    : `События на ${selectedDate}`}
                            </h2>

                            {eventsForSelectedDate.length > 0 ? (
                                <div className="space-y-4">
                                    {eventsForSelectedDate.map(event => (
                                        <div
                                            key={event.id}
                                            onClick={() => event.type === 'training' && navigate(`/training/${event.trainingId}`)}
                                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                                                event.type === 'training' ? 'hover:bg-blue-50 cursor-pointer' : ''
                                            } ${event.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    event.completed ? 'bg-green-500' :
                                                        event.type === 'training' ? 'bg-blue-500' : 'bg-red-500'
                                                }`}></div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {event.time} • {event.location}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{event.description}</p>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                event.completed
                                                    ? 'bg-green-100 text-green-800'
                                                    : event.type === 'training'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                            }`}>
                                                {event.completed ? 'Завершено' :
                                                    event.type === 'training' ? 'Тренировка' : 'Игра'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📅</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Событий нет</h3>
                                    <p className="text-gray-600">На выбранную дату событий не запланировано</p>
                                </div>
                            )}
                        </div>

                        {/* Ближайшие события */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ближайшие события</h2>
                            <div className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <div
                                        key={event.id}
                                        onClick={() => event.type === 'training' && navigate(`/training/${event.trainingId}`)}
                                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                                            event.type === 'training' ? 'hover:bg-blue-50 cursor-pointer' : ''
                                        } ${event.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${
                                                event.completed ? 'bg-green-500' :
                                                    event.type === 'training' ? 'bg-blue-500' : 'bg-red-500'
                                            }`}></div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {event.date} • {event.time} • {event.location}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            event.completed
                                                ? 'bg-green-100 text-green-800'
                                                : event.type === 'training'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-red-100 text-red-800'
                                        }`}>
                                            {event.completed ? 'Завершено' :
                                                event.type === 'training' ? 'Тренировка' : 'Игра'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Календарь и статистика */}
                    <div className="space-y-6">
                        {/* Календарь */}
                        <Calendar
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                            events={eventDates}
                        />

                        {/* Статистика */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Статистика</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Тренировок:</span>
                                    <span className="font-semibold">
                    {scheduleData.events.filter(e => e.type === 'training').length}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Игр:</span>
                                    <span className="font-semibold">
                    {scheduleData.events.filter(e => e.type === 'game').length}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Завершено:</span>
                                    <span className="font-semibold text-green-600">
                    {scheduleData.events.filter(e => e.completed).length}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};