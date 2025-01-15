import { call } from "@/lib/backend/common";
import { Resp } from "@/lib/types/Resp";
import { TaskRequest } from "@/lib/types/TaskRequest";
import { Task } from "@/lib/types/Task";
import { TaskPosting } from "@/lib/types/TaskPosting";

// Task Management

export async function getAllTasks(jwt: string): Promise<Task[]> {
  return call<Task[]>("/tasks/all", "GET", jwt);
}

export async function addTask(
  jwt: string,
  name: string,
  reward: number,
  start_time: Date,
  end_time: Date,
  description: string,
  require_review: boolean,
  require_proof: boolean,
  recurrence_interval?: number
): Promise<Resp> {
  const task = {
    name,
    reward,
    start_time,
    end_time,
    description,
    require_review,
    require_proof,
    recurrence_interval,
  };
  const body = {
    item: task,
  };
  return call<Resp>(`/tasks/create`, "POST", jwt, body);
}

export async function updateTask(
  jwt: string,
  id: string,
  name?: string,
  reward?: number,
  start_time?: Date,
  end_time?: Date,
  description?: string,
  require_review?: boolean,
  require_proof?: boolean,
  recurrence_interval?: number
): Promise<Resp> {
  const task = {
    name,
    reward,
    start_time,
    end_time,
    description,
    require_review,
    require_proof,
    recurrence_interval,
  };
  const body = {
    item: task,
  };
  return call<Resp>(`/tasks/update`, "PATCH", jwt, body);
}

export async function deleteTask(jwt: string, id: string): Promise<Resp> {
  return call<Resp>(`/tasks/delete/`, "DELETE", jwt, { id: id });
}

// Task Requests

export async function getAllTaskRequests(jwt: string): Promise<TaskRequest[]> {
  return call<TaskRequest[]>("/tasks/requests/all", "GET", jwt);
}

export async function requestTask(
  jwt: string,
  name: string,
  description: string,
  reward: number,
  start_time: Date,
  end_time: Date,
  recurrence_interval?: number
): Promise<Resp> {
  const taskRequest = {
    name,
    description,
    reward,
    start_time,
    end_time,
    recurrence_interval,
  };
  const body = {
    item: taskRequest,
  };
  return call<Resp>(`/tasks/requests`, "POST", jwt, body);
}

export async function reviewTaskRequest(
  jwt: string,
  id: number,
  will_approve: boolean,
  require_proof: boolean,
  require_review: boolean,
  comment?: string
): Promise<Resp> {
  const body = {
    will_approve,
    require_proof,
    require_review,
    comment,
  };
  return call<Resp>(`/tasks/requests/${id}/review`, "POST", jwt, body);
}

// Task Postings
export async function getAllTaskPostings(jwt: string): Promise<TaskPosting[]> {
  return call<TaskPosting[]>("/tasks/requests/all", "GET", jwt);
}

export async function createTaskPosting(
  jwt: string,
  task_id: string,
  user_limit?: number
): Promise<Resp> {
  const body = {
    task_id,
    user_limit,
  };
  return call<Resp>("/tasks/postings", "POST", jwt, body);
}

export async function updateTaskPosting(
  jwt: string,
  posting_id: string,
  user_limit?: number,
  is_open?: boolean
): Promise<Resp> {
  const body = {
    user_limit,
    is_open,
  };
  return call<Resp>(`/tasks/postings/${posting_id}/update`, "PATCH", jwt, body);
}

export async function deleteTaskPosting(
  jwt: string,
  posting_id: string
): Promise<Resp> {
  return call<Resp>(`/tasks/postings/${posting_id}/delete`, "DELETE", jwt);
}
