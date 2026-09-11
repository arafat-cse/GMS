import "server-only";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_API_URL ?? "http://127.0.0.1:8000/api/v1";
const TOKEN_COOKIE = "gms_admin_token";

export async function publicApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function adminApi<T>(path: string, init?: RequestInit): Promise<T> {
  const token = cookies().get(TOKEN_COOKIE)?.value;

  const res = await fetch(`${BACKEND_URL}/admin/${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, data?.message ?? "Request failed.", data?.errors);
  }

  return data as T;
}
