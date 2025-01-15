import { API_URL } from "@/app/constants";
import { useAppSelector } from '@/lib/hooks';
import { jwtDecode } from 'jwt-decode';

export async function call<T>(path: string, method: string, jwt: string, body?: any): Promise<T> {
    if (body) {
        console.log(JSON.stringify(body))
    }

    const response = await fetch(`${API_URL}${path}`, {
      method: method.toUpperCase(), 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
    },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    return response.json() as Promise<T>;
}