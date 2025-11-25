import React, { useState } from 'react';

interface CalendarProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
    events: string[]; // Массив дат с событиями в формате 'YYYY-MM-DD'
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Генерация дней месяца
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];
        const startDay = firstDay.getDay();

        // Пустые ячейки до первого дня
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Дни месяца
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const isDateInEvents = (date: Date) => {
        return events.includes(formatDate(date));
    };

    const isSelectedDate = (date: Date) => {
        return formatDate(date) === selectedDate;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4">
            {/* Заголовок календаря */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    ←
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    →
                </button>
            </div>

            {/* Дни недели */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Дни месяца */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    if (!day) {
                        return <div key={`empty-${index}`} className="h-8"></div>;
                    }

                    const dateStr = formatDate(day);
                    const hasEvent = isDateInEvents(day);
                    const isSelected = isSelectedDate(day);
                    const isToday = formatDate(new Date()) === dateStr;

                    return (
                        <button
                            key={dateStr}
                            onClick={() => onDateSelect(dateStr)}
                            className={`
                h-8 rounded-lg text-sm font-medium transition-all
                ${isSelected
                                ? 'bg-blue-500 text-white'
                                : isToday
                                    ? 'bg-blue-100 text-blue-800'
                                    : hasEvent
                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }
                ${hasEvent ? 'relative' : ''}
              `}
                        >
                            {day.getDate()}
                            {hasEvent && !isSelected && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};