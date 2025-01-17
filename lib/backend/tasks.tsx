import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';
import { Task } from '@/lib/types/Task';

export async function getAllTasks(jwt: string): Promise<{ tasks: Task[] }> {
    return call<{ tasks: Task[] }>('/tasks/all', 'GET', jwt);
}

export async function getTaskById(jwt: string, id: string): Promise<Task> {
    const all_tasks: { tasks: Task[] } = await getAllTasks(jwt); // Fetch all tasks

    // Find the task with the matching ID
    const task = all_tasks.find((task) => task.id === id);

    if (!task) {
        throw new Error(`Task with ID ${id} not found`);
    }

    return task;
}

export async function createTask(
    jwt: string,
    name: string,
    created_by: string,
    reward: number,
    start_time?: string,
    deadline?: string,
    is_recurring?: boolean,
    recurrence_interval?: number,
    description?: string
): Promise<{ success: boolean; id: string; message: string }> {
    const task = {
        name,
        created_by,
        reward,
        start_time,
        deadline,
        is_recurring,
        recurrence_interval,
        description,
    };

    const body = { task };
    return call<{ success: boolean; id: string; message: string }>(
        '/tasks/create',
        'POST',
        jwt,
        body
    );
}

export async function updateTask(
    jwt: string,
    id: string,
    update: Partial<Task>
): Promise<Resp> {
    const body = {
        task: {
            id,
            ...update,
        },
    };
    return call<Resp>('/tasks/update', 'PATCH', jwt, body);
}

export async function deleteTask(jwt: string, id: string): Promise<Resp> {
    const body = { id };
    return call<Resp>('/tasks/delete', 'DELETE', jwt, body);
}

export async function applyForTask(
    jwt: string,
    uid: string,
    id: string
): Promise<Resp> {
    const body = {
        uid,
        id,
    };
    return call<Resp>('/tasks/apply', 'POST', jwt, body);
}
