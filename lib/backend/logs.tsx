import { call } from '@/lib/backend/common';
import { Log } from '@/lib/types/Log';

export async function getAllLogs(jwt: string): Promise<Log[]> {
    return call<{success: boolean, logs: Log[]}>("/logs/all", "GET", jwt).then(res => res.logs);
}