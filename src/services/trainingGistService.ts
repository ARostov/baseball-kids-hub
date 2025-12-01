// src/services/trainingGistService.ts (финальная версия)
import { TrainingData } from '../types';
import { GIST_CONFIG } from '../config/gist';

export class TrainingGistService {
    private static readonly GIST_FILENAME = 'training-data.json';
    private static readonly LOCAL_STORAGE_KEY = 'training-data-local';

    // Только чтение из публичного Gist
    static async loadTrainingData(): Promise<TrainingData> {
        try {
            console.log('Загрузка данных из публичного Gist...');

            // Используем raw URL для прямого доступа к JSON
            const rawUrl = `https://gist.githubusercontent.com/ARostov/${GIST_CONFIG.TRAINING_GIST_ID}/raw/${this.GIST_FILENAME}`;
            const response = await fetch(rawUrl);

            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }

            const publicData = await response.json();
            console.log('✅ Данные загружены из публичного Gist');

            return this.validateTrainingData(publicData);
        } catch (error) {
            console.error('❌ Ошибка загрузки из Gist:', error);
            return this.loadLocalData(); // Fallback на локальные данные
        }
    }

    // Сохранение только локально
    static async saveTrainingData(data: TrainingData): Promise<boolean> {
        return this.saveLocalData(data);
    }

    private static saveLocalData(data: TrainingData): boolean {
        try {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
            console.log('✅ Данные сохранены локально');
            return true;
        } catch (error) {
            console.error('❌ Ошибка локального сохранения:', error);
            return false;
        }
    }

    private static loadLocalData(): TrainingData {
        try {
            const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                console.log('Данные загружены из локального хранилища');
                return this.validateTrainingData(data);
            }
        } catch (error) {
            console.error('Ошибка загрузки локальных данных:', error);
        }

        return this.getDefaultTrainingData();
    }

    private static validateTrainingData(data: any): TrainingData {
        if (!data || typeof data !== 'object') {
            return this.getDefaultTrainingData();
        }

        return {
            exercises: Array.isArray(data.exercises) ? data.exercises : [],
            workouts: Array.isArray(data.workouts) ? data.workouts : []
        };
    }

    private static getDefaultTrainingData(): TrainingData {
        return {
            exercises: [],
            workouts: []
        };
    }
}