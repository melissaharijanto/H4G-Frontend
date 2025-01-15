export interface UserTask {
    id: number;
    uid: string;
    task: string;
    status: string;
    proof_of_completion: ArrayBuffer | string | null;
    admin_comment: string;
}
