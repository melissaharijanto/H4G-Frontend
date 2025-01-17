export interface UserTask {
    id: string; // Primary key for user tasks
    uid: string; // User ID
    task: string; // Task ID
    start_time: Date | null; // Start time of the user-task instance
    end_time: Date | null; // End time of the user-task instance
    status: string; // Current status of the user-task (e.g., 'APPLIED', 'ONGOING', etc.)
    admin_comment: string | null; // Optional admin comments related to the user-task
}