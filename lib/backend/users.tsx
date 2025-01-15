import { User } from '@/lib/types/User';
import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getUser(jwt: string, uid: string): Promise<User> {
    return call<User>(`/users/${uid}`, "GET", jwt);
}

export async function addUser(jwt: string, name: string, cat: string, email: string, password: string, credit: number): Promise<{success: boolean, uid: string, message: string}> {
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
    return call<{success: boolean, uid: string, message: string}>(`/users/add`, "POST", jwt, body);
}

type UserUpdate = { 
    name?: string, 
    cat?: string, 
    email?: string, 
    password?: string, 
    credit?: number, 
    is_active?: boolean 
}

export async function updateUser(jwt: string, uid: string, update: UserUpdate): Promise<Resp> {
    const body = {
        "user": update
    };
    return call<Resp>(`/users/${uid}/update`, "PATCH", jwt, body);
}

export async function suspendUser(jwt: string, uid: string): Promise<Resp> {
    return updateUser(jwt, uid, {"is_active": false});
}

export async function unsuspendUser(jwt: string, uid: string): Promise<Resp> {
    return updateUser(jwt, uid, {"is_active": true});
}

export async function deleteUser(jwt: string, uid: string): Promise<Resp> {
    return call<Resp>(`/users/${uid}/delete`, "DELETE", jwt);
}