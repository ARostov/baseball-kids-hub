// src/hooks/useTrainingData.ts (полная версия)
import { useState, useEffect } from 'react';
import { TrainingData, Exercise, Workout } from '../types';
import { TrainingGistService } from '../services/trainingGistService';

export const useTrainingData = () => {
    const [trainingData, setTrainingData] = useState<TrainingData>({ exercises: [], workouts: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTrainingData();
    }, []);

    const loadTrainingData = async () => {
        try {
            setLoading(true);
            const data = await TrainingGistService.loadTrainingData();
            setTrainingData(data);
            setError(null);
        } catch (err) {
            setError('Ошибка загрузки тренировок');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Упражнения
    const addExercise = (exercise: Exercise) => {
        const newExercise = {
            ...exercise,
            id: Math.max(0, ...trainingData.exercises.map(e => e.id)) + 1
        };
        setTrainingData(prev => ({
            ...prev,
            exercises: [...prev.exercises, newExercise]
        }));
    };

    const updateExercise = (id: number, exercise: Partial<Exercise>) => {
        setTrainingData(prev => ({
            ...prev,
            exercises: prev.exercises.map(e => e.id === id ? { ...e, ...exercise } : e)
        }));
    };

    const deleteExercise = (id: number) => {
        setTrainingData(prev => ({
            ...prev,
            exercises: prev.exercises.filter(e => e.id !== id)
        }));
    };

    // Тренировки
    const addWorkout = (workout: Workout) => {
        const newWorkout = {
            ...workout,
            id: Math.max(0, ...trainingData.workouts.map(w => w.id)) + 1
        };
        setTrainingData(prev => ({
            ...prev,
            workouts: [...prev.workouts, newWorkout]
        }));
    };

    const updateWorkout = (id: number, workout: Partial<Workout>) => {
        setTrainingData(prev => ({
            ...prev,
            workouts: prev.workouts.map(w => w.id === id ? { ...w, ...workout } : w)
        }));
    };

    const deleteWorkout = (id: number) => {
        setTrainingData(prev => ({
            ...prev,
            workouts: prev.workouts.filter(w => w.id !== id)
        }));
    };

    const saveData = async () => {
        try {
            const success = await TrainingGistService.saveTrainingData(trainingData);
            if (success) {
                setError(null);
            }
            return success;
        } catch (err) {
            setError('Ошибка сохранения данных');
            console.error(err);
            return false;
        }
    };

    return {
        trainingData,
        loading,
        error,
        // Упражнения
        addExercise,
        updateExercise,
        deleteExercise,
        // Тренировки
        addWorkout,
        updateWorkout,
        deleteWorkout,
        // Общее
        saveData,
        reload: loadTrainingData
    };
};