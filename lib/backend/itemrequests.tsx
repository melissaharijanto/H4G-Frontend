import { ItemRequest } from '@/lib/types/ItemRequest';
import { call } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getAllItemRequests(jwt: string): Promise<ItemRequest[]> {
    return call<ItemRequest[]>(`/itemrequests/all`, "GET", jwt);
}

export async function addItemRequest(jwt: string, requested_by: string, description: string): Promise<{success: boolean, id: string, message: string}> {
    const body = {
        "itemrequest": {
            "requested_by": requested_by,
            "description": description
        }
    }
    return call<{success: boolean, id: string, message: string}>(`/itemrequests/create`, "POST", jwt, body);
}

export async function updateItemRequest(jwt: string, id: string, description: string): Promise<Resp> {
    const body = {
        "itemrequest": {
            "id": id,
            "description": description
        }
    }
    return call<Resp>(`/itemrequests/update`, "PATCH", jwt, body);
}

export async function deleteItemRequest(jwt: string, id: string): Promise<Resp> {
    return call<Resp>(`/itemrequests/${id}/delete`, "DELETE", jwt);
}


