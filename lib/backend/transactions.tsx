import { Transaction } from '@/lib/types/Transaction';
import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getAllTransactions(jwt: string): Promise<Transaction[]> {
    return call<Transaction[]>(`/transactions/all`, "GET", jwt);
}

export async function getTransactionById(jwt: string, id: string): Promise<Transaction> {
    return call<Transaction>(`/transactions/${id}`, "POST", jwt);
}

export async function getTransactionsByUserId(jwt: string, uid: string): Promise<Transaction[]> {
    return call<Transaction[]>(`/transactions/users/${uid}`, "POST", jwt);
}

export async function confirmTransaction(jwt: string, id: string): Promise<Resp> {
    const body = {
        "transaction": {
            "id": id,
            "status": "CONFIRMED",
        }
    }
    return call<Resp>(`/transactions/update`, "PATCH", jwt, body);
} 

export async function claimTransaction(jwt: string, id: string): Promise<Resp> {
    const body = {
        "transaction": {
            "id": id,
            "status": "CLAIMED",
        }
    }
    return call<Resp>(`/transactions/update`, "PATCH", jwt, body);
} 

export async function cancelTransaction(jwt: string, id: string): Promise<Resp> {
    const body = {
        "transaction": {
            "id": id,
            "status": "CANCELLED",
        }
    }
    return call<Resp>(`/transactions/update`, "PATCH", jwt, body);
} 