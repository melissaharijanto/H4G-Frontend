import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';
import { UserTask } from '@/lib/types/UserTask';

export async function getAllUserTasks(
    jwt: string
): Promise<{ usertasks: UserTask[] }> {
    return call<{ userTasks: UserTask[] }>('/usertasks/all', 'GET', jwt);
}

// Approve a UserTask (status -> ONGOING)
export async function approveUserTask(jwt: string, id: string): Promise<Resp> {
    return updateUserTask(jwt, id, { status: 'ONGOING' });
}

// Reject a UserTask (status -> REJECTED)
export async function rejectUserTask(jwt: string, id: string): Promise<Resp> {
    return updateUserTask(jwt, id, { status: 'REJECTED' });
}

// Mark a UserTask as Under Review (status -> UNDER_REVIEW)
export async function reviewUserTask(jwt: string, id: string): Promise<Resp> {
    return updateUserTask(jwt, id, { status: 'UNDER_REVIEW' });
}

// Complete a UserTask (status -> COMPLETED)
export async function completeUserTask(jwt: string, id: string): Promise<Resp> {
    return updateUserTask(jwt, id, { status: 'COMPLETED' });
}

export async function updateUserTask(
    jwt: string,
    id: string,
    update: Partial<UserTask>
): Promise<Resp> {
    const body = {
        usertask: {
            id,
            ...update,
        },
    };
    return call<Resp>('/usertasks/update', 'PATCH', jwt, body);
}

// use this to cancel applied task
export async function deleteUserTask(jwt: string, id: string): Promise<Resp> {
    const body = { id };
    return call<Resp>('/usertasks/delete', 'DELETE', jwt, body);
}
