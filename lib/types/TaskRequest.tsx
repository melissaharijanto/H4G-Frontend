export interface TaskRequest {
    id: number;
    created_by: string;
    name: string;
    description: string;
    reward: number;
    status: string;
    start_time: Date;
    end_time: Date;
    recurrence_interval: number;
}