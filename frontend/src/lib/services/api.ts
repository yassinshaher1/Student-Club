import { API_CONFIG } from '@/lib/config';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
  return response.json();
}

export const api = {
  get: async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    const url = new URL(`${API_CONFIG.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => 
        url.searchParams.append(key, value)
      );
    }
    const response = await fetch(url.toString());
    return handleResponse<T>(response);
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
    return handleResponse<T>(response);
  },
};