export interface UserTask {
    id: number;
    uid: string;
    task: string;
    start_time: Date;
    end_time: Date;
    status: string;
    proof_of_completion: ArrayBuffer | string | null;
    admin_comment: string;
}
