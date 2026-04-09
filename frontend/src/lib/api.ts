export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = `${baseUrl}${endpoint}`;

  // Get token from localStorage
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Ocurrió un error en la petición');
  }

  return result.data as T;
};
