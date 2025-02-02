import { Item } from '@/lib/types/Item';
import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getAllItems(jwt: string): Promise<{ items: Item[] }> {
    return call<{ items: Item[] }>('/items/all', 'GET', jwt);
}

export async function getItemById(
    jwt: string,
    id: string
): Promise<{ item: Item }> {
    return call<{ item: Item }>(`/items/${id}`, 'GET', jwt);
}

export async function addItem(
    jwt: string,
    name: string,
    image: string,
    stock: number,
    price: number,
    description: string
): Promise<{ success: boolean; uid: string; message: string }> {
    const user = {
        name,
        image,
        stock,
        price,
        description,
    };
    const body = {
        item: user,
    };
    return call<{ success: boolean; uid: string; message: string }>(
        `/items/create`,
        'POST',
        jwt,
        body
    );
}

type ItemUpdate = {
    name?: string;
    image?: string;
    stock?: number;
    price?: number;
    description?: string;
};

export async function updateItem(
    jwt: string,
    id: string,
    update: ItemUpdate
): Promise<Resp> {
    const body = {
        item: update,
    };
    return call<Resp>(`/items/${id}/update`, 'PATCH', jwt, body);
}

export async function buyItem(
    jwt: string,
    uid: string,
    id: string,
    quantity: number
): Promise<Resp> {
    const body = {
        id: id,
        quantity: quantity,
        uid: uid,
    };
    return call<Resp>(`/items/buy`, 'POST', jwt, body);
}

export async function preorderItem(
    jwt: string,
    uid: string,
    id: string,
    quantity: number
): Promise<Resp> {
    const body = {
        id: id,
        quantity: quantity,
        uid: uid,
    };
    return call<Resp>(`/items/preorder`, 'POST', jwt, body);
}

export async function deleteItem(jwt: string, id: string): Promise<Resp> {
    return call<Resp>(`/items/${id}/delete`, 'DELETE', jwt);
}
