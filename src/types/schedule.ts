export interface Schedule {
    events: ScheduleEvent[];
}

export interface ScheduleEvent {
    id: number;
    title: string;
    type: 'training' | 'game';
    date: string;
    time: string;
    location: string;
    description: string;
    completed: boolean;
    trainingId?: number;
}