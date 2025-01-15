export interface Task {
    id: string;
    name: string;
    created_by: string;
    reward: number;
    start_time: Date;
    end_time: Date;
    recurrence_interval: number;
    user_limit: number;
    description: string;
    require_review: boolean;
    require_proof: boolean;
}
