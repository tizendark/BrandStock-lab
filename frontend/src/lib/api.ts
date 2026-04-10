export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_DOMAIN || 'http://localhost:3000';
  const url = `${baseUrl}${endpoint}`;

  console.log(`API Request: ${options.method || 'GET'} ${url}`);

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

  // Check content type before parsing as JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error(`Non-JSON response from ${url}:`, text.substring(0, 500));
    throw new Error(`Error de conexion con el servidor (${response.status}). Intenta mas tarde.`);
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Ocurrio un error en la peticion');
  }

  return result.data as T;
};
