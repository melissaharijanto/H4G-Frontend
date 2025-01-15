import { API_URL } from "@/app/constants";
import { useAppSelector } from '@/lib/hooks';
import { jwtDecode } from 'jwt-decode';

export function getJwt(): string{
    const session = useAppSelector((state) => state.session);
    const jwt = session.jwt;
    return jwt;
}

export function getUid(): string | undefined {
    const uid = jwtDecode(getJwt()).sub;
    return uid;
}

export async function call<T>(path: string, method: string, body?: any): Promise<T> {
    const jwt = getJwt()

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