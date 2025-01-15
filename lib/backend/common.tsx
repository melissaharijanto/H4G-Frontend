import { API_URL } from "@/app/constants";
import { useAppSelector } from '@/lib/hooks';
import { jwtDecode } from 'jwt-decode';

export function getJwt(): string{
    // const session = useAppSelector((state) => state.session);
    // const jwt = session.jwt;
    // return jwt;
    // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjk0NjU2NSwianRpIjoiNTdiYTg3YmEtYzU2ZS00NTA1LWEzY2EtZGZjMjU3N2E5MjExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InUwMDAxIiwibmJmIjoxNzM2OTQ2NTY1LCJjc3JmIjoiNjYzMjQzMTAtMDczNy00NTNiLTg5YzktNGYwZDhiNmMwNWU4IiwiZXhwIjoxNzM3MDMyOTY1fQ.8hv961815pEjGZK8eCQMkZ32C4WMsA6b8p4y9kwre2E";
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjk0NzY1MiwianRpIjoiZDIwYzJmYWUtM2Q4My00NGJjLWI3ZGItODVkNTZjZTBhNDcyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InUwMDAyIiwibmJmIjoxNzM2OTQ3NjUyLCJjc3JmIjoiODEwMzljMzItN2RmMy00Mjc0LWFiMGUtNjNlYWU3ZDY2MTAzIiwiZXhwIjoxNzM3MDM0MDUyfQ.tY73N0D0v8H5EObMvoFP14S2bhUetif6rw-vrWYieGE";
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