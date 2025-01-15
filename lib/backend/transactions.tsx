import { Transaction } from '@/lib/types/Transaction';
import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getAllTransactions(): Promise<Transaction[]> {
    return call<Transaction[]>(`/transactions/all`, "GET");
}

export async function getTransactionById(id: string): Promise<Transaction> {
    return call<Transaction>(`/transactions/${id}`, "POST");
}

export async function getTransactionsByUserId(uid: string): Promise<Transaction[]> {
    return call<Transaction[]>(`/transactions/users/${uid}`, "POST");
}

export async function confirmTransaction(id: string): Promise<Resp> {
    const body = {
        "transaction": {
            "id": id,
            "status": "CONFIRMED",
        }
    }
    return call<Resp>(`/transactions/update`, "PATCH", body);
} 

export async function claimTransaction(id: string): Promise<Resp> {
    const body = {
        "transaction": {
            "id": id,
            "status": "CLAIMED",
        }
    }
    return call<Resp>(`/transactions/update`, "PATCH", body);
} 

export async function cancelTransaction(id: string): Promise<Resp> {
    const body = {
        "transaction": {
            "id": id,
            "status": "CANCELLED",
        }
    }
    return call<Resp>(`/transactions/update`, "PATCH", body);
} 