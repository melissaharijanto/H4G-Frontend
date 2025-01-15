import { ItemRequest } from '@/lib/types/ItemRequest';
import { call, getUid } from '@/lib/backend/common';
import { Resp } from '@/lib/types/Resp';

export async function getAllItemRequests(): Promise<ItemRequest[]> {
    return call<ItemRequest[]>(`/itemrequests/all`, "GET");
}

export async function addItemRequest(description: string): Promise<{success: boolean, id: string, message: string}> {
    const body = {
        "itemrequest": {
            "requested_by": getUid(),
            "description": description
        }
    }
    return call<{success: boolean, id: string, message: string}>(`/itemrequests/create`, "POST", body);
}

export async function updateItemRequest(id: string, description: string): Promise<Resp> {
    const body = {
        "itemrequest": {
            "id": id,
            "description": description
        }
    }
    return call<Resp>(`/itemrequests/update`, "PATCH", body);
}

export async function deleteItemRequest(id: string): Promise<Resp> {
    return call<Resp>(`/itemrequests/${id}/delete`, "DELETE");
}


