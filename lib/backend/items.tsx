import { Item } from '@/lib/types/Item';
import { getUid, call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getAllItems(): Promise<Item[]> {
    return call<Item[]>("/items/all", "GET");
}

export async function getItemById(id: string): Promise<Item> {
    return call<Item>(`/items/${id}`, "GET");
}

export async function addItem(name: string, image: string, stock: number, price: number, description: string): Promise<{success: boolean, uid: string, message: string}> {
    const user = {
        name,
        image,
        stock,
        price,
        description,
    }
    const body = {
        "item": user
    };
    return call<{success: boolean, uid: string, message: string}>(`/items/create`, "POST", body);
}

type ItemUpdate = { 
    name?: string, 
    image?: string, 
    stock?: number, 
    price?: number, 
    description?: string, 
}

export async function updateItem(id: string, update: ItemUpdate): Promise<Resp> {
    const body = {
        "item": update
    }
    return call<Resp>(`/items/${id}/update`, "PATCH", body);
}

export async function buyItem(id: string, quantity: number): Promise<Resp> {
    const body = { 
        "id": id, 
        "quantity": quantity, 
        "uid": getUid(), 
    }
    return call<Resp>(`/items/buy`, "POST", body);
}

export async function preorderItem(id: string, quantity: number): Promise<Resp> {
    const body = { 
        "id": id, 
        "quantity": quantity, 
        "uid": getUid(), 
    }
    return call<Resp>(`/items/preorder`, "POST", body);
}


export async function deleteItem(id: string): Promise<Resp> {
    return call<Resp>(`/items/${id}/delete`, "DELETE");
}