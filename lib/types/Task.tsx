export interface Task {
    id: string;
    name: string;
    created_by: string;
    reward: number;
    deadline: Date;
    user_limit: number;
    description: string;
    require_review: boolean;
    require_proof: boolean;
    is_recurring: boolean;
}
