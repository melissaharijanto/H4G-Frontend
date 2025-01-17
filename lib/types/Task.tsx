export interface Task {
    id: string; // Primary key for tasks
    name: string; // Task name
    created_by: string; // User ID of the creator
    reward: number; // Reward for completing the task
    start_time: Date | null; // Start time of the task
    deadline: Date | null; // Deadline for the task (renamed from `end_time` to `deadline`)
    is_recurring: boolean | null; // Whether the task is recurring
    recurrence_interval: number | null; // Recurrence interval in days (null if not recurring)
    description: string | null; // Optional description of the task
}