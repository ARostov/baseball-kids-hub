// src/components/ExerciseList.tsx
import { useState, useMemo } from 'react';
import { Exercise } from '../types';
import { referenceData } from '../data/referenceData';

interface ExerciseListProps {
    exercises: Exercise[];
    onEdit: (exercise: Exercise) => void;
    onDelete: (id: number) => void;
    onSelect?: (exercise: Exercise) => void;
    selectMode?: boolean;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
                                                              exercises,
                                                              onEdit,
                                                              onDelete,
                                                              onSelect,
                                                              selectMode = false
                                                          }) => {
    const [filters, setFilters] = useState({
        ageGroup: '',
        category: '',
        muscleGroup: '',
        difficulty: '',
        space: '',
        fatigue: '',
        partnerRequired: false,
        search: ''
    });

    const filteredExercises = useMemo(() => {
        return exercises.filter(exercise => {
            // Поиск по названию
            if (filters.search && !exercise.name.toLowerCase().includes(filters.search)) {
                return false;
            }

            // Фильтр по возрастной группе
            if (filters.ageGroup && !exercise.age_group_ids.includes(parseInt(filters.ageGroup))) {
                return false;
            }

            // Фильтр по категории
            if (filters.category && !exercise.category_ids.includes(parseInt(filters.category))) {
                return false;
            }

            // Фильтр по группе мышц
            if (filters.muscleGroup && !exercise.muscle_group_ids.includes(parseInt(filters.muscleGroup))) {
                return false;
            }

            // Фильтр по сложности
            if (filters.difficulty && exercise.difficulty !== filters.difficulty) {
                return false;
            }

            // Фильтр по помещению
            if (filters.space && exercise.space_requirements !== filters.space) {
                return false;
            }

            // Фильтр по нагрузке
            if (filters.fatigue && exercise.fatigue_level !== filters.fatigue) {
                return false;
            }

            // Фильтр по необходимости партнера
            if (filters.partnerRequired && !exercise.partner_required) {
                return false;
            }

            return true;
        });
    }, [exercises, filters]);

    const getReferenceName = (type: keyof typeof referenceData, id: number) => {
        const items = referenceData[type] as Array<{id: number, name: string}>;
        return items.find(item => item.id === id)?.name || '';
    };

    return (
        <div className="space-y-6">
            {/* Фильтры */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Фильтры</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Поиск */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={e => setFilters({...filters, search: e.target.value})}
                            placeholder="Название упражнения..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Возрастная группа */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Возраст</label>
                        <select
                            value={filters.ageGroup}
                            onChange={e => setFilters({...filters, ageGroup: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Все возрасты</option>
                            {referenceData.age_groups.map(group => (
                                <option key={group.id} value={group.id.toString()}>{group.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Категория */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                        <select
                            value={filters.category}
                            onChange={e => setFilters({...filters, category: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Все категории</option>
                            {referenceData.categories.map(cat => (
                                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Сложность */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Сложность</label>
                        <select
                            value={filters.difficulty}
                            onChange={e => setFilters({...filters, difficulty: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Любая</option>
                            <option value="beginner">Начинающий</option>
                            <option value="intermediate">Продвинутый</option>
                            <option value="advanced">Эксперт</option>
                        </select>
                    </div>

                    {/* Группа мышц */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Группа мышц</label>
                        <select
                            value={filters.muscleGroup}
                            onChange={e => setFilters({...filters, muscleGroup: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Все группы</option>
                            {referenceData.muscle_groups.map(group => (
                                <option key={group.id} value={group.id.toString()}>{group.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Помещение */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Помещение</label>
                        <select
                            value={filters.space}
                            onChange={e => setFilters({...filters, space: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Любое</option>
                            {referenceData.space_requirements.map(space => (
                                <option key={space.id} value={space.id}>{space.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Нагрузка */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Нагрузка</label>
                        <select
                            value={filters.fatigue}
                            onChange={e => setFilters({...filters, fatigue: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Любая</option>
                            {referenceData.fatigue_levels.map(level => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Партнер */}
                    <div className="flex items-center">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.partnerRequired}
                                onChange={e => setFilters({...filters, partnerRequired: e.target.checked})}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Требуется партнер</span>
                        </label>
                    </div>
                </div>

                {/* Сброс фильтров */}
                <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Найдено: {filteredExercises.length} упражнений
          </span>
                    <button
                        onClick={() => setFilters({
                            ageGroup: '', category: '', muscleGroup: '', difficulty: '',
                            space: '', fatigue: '', partnerRequired: false, search: ''
                        })}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            </div>

            {/* Список упражнений */}
            <div className="grid gap-4">
                {filteredExercises.map(exercise => (
                    <div key={exercise.id} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{exercise.name}</h3>
                                <p className="text-gray-600 mb-3">{exercise.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-700">Сложность:</span>
                                        <span className="ml-2 text-gray-600 capitalize">{exercise.difficulty}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Длительность:</span>
                                        <span className="ml-2 text-gray-600">{exercise.estimated_duration_minutes} мин</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Помещение:</span>
                                        <span className="ml-2 text-gray-600">
                      {referenceData.space_requirements.find(s => s.id === exercise.space_requirements)?.name}
                    </span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Нагрузка:</span>
                                        <span className="ml-2 text-gray-600">
                      {referenceData.fatigue_levels.find(f => f.id === exercise.fatigue_level)?.name}
                    </span>
                                    </div>
                                </div>

                                {/* Теги */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {exercise.age_group_ids.map(ageId => (
                                        <span key={ageId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {getReferenceName('age_groups', ageId)}
                    </span>
                                    ))}
                                    {exercise.category_ids.map(catId => (
                                        <span key={catId} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {getReferenceName('categories', catId)}
                    </span>
                                    ))}
                                    {exercise.partner_required && (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      Нужен партнер
                    </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 ml-4">
                                {selectMode && onSelect && (
                                    <button
                                        onClick={() => onSelect(exercise)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Выбрать
                                    </button>
                                )}
                                {!selectMode && (
                                    <>
                                        <button
                                            onClick={() => onEdit(exercise)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => onDelete(exercise.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Удалить
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredExercises.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Упражнения не найдены</p>
                        <p className="text-gray-400 mt-2">Попробуйте изменить параметры фильтрации</p>
                    </div>
                )}
            </div>
        </div>
    );
};