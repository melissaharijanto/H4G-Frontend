import { User } from '@/lib/types/User';
import { getUid, call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getUser(): Promise<User> {
    const uid = getUid();
    return call<User>(`/users/${uid}`, "GET");
}

export async function addUser(name: string, cat: string, email: string, password: string, credit: number): Promise<{success: boolean, uid: string, message: string}> {
    const user = {
        name,
        cat,
        email,
        password,
        credit,
    }
    const body = {
        "user": user
    };
    return call<{success: boolean, uid: string, message: string}>(`/users/add`, "POST", body);
}

type UserUpdate = { 
    name?: string, 
    cat?: string, 
    email?: string, 
    password?: string, 
    credit?: number, 
    is_active?: boolean 
}

export async function updateUser(uid: string, update: UserUpdate): Promise<Resp> {
    const body = {
        "user": update
    };
    return call<Resp>(`/users/${uid}/update`, "PATCH", body);
}

export async function suspendUser(uid: string): Promise<Resp> {
    return updateUser(uid, {"is_active": false});
}

export async function unsuspendUser(uid: string): Promise<Resp> {
    return updateUser(uid, {"is_active": true});
}

export async function deleteUser(uid: string): Promise<Resp> {
    return call<Resp>(`/users/${uid}/delete`, "DELETE");
}