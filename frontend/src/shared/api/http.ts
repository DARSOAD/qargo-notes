// src/shared/api/http.ts
import { BACKEND_URL } from "../config";

type HttpOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === "string" && payload.trim().length > 0) return payload.trim();
  if (isRecord(payload) && typeof payload.detail === "string") return payload.detail;   // FastAPI
  if (isRecord(payload) && typeof payload.message === "string") return payload.message;
  return fallback;
}

export class HttpError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}


import { useAuthStore } from "../../features/auth/store/authStore";
function authHeaders(): Record<string, string> {
  const { accessToken, userId } = useAuthStore.getState();
  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(userId !== null && userId !== undefined ? { "x-user-id": String(userId) } : {}),
  };
}

export async function http<T = unknown>(path: string, opts: HttpOptions = {}): Promise<T> {
  const url = `${BACKEND_URL}${path}`;

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers ?? {}),
    ...authHeaders(), 
  };

  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: baseHeaders,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  });

  const contentType = res.headers.get("content-type") ?? "";
  let payload: unknown;

  try {
    if (contentType.includes("application/json")) {
      payload = await res.json();
    } else {
      payload = await res.text();
    }
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const fallback = res.statusText || "Request failed";
    const msg = extractErrorMessage(payload, fallback);
    throw new HttpError(msg, res.status, payload);
  }

  return payload as T;
}
