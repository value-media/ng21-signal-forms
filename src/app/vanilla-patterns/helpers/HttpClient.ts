export interface HttpHeaders {
  [key: string]: string;
}

export interface HttpClientOptions extends RequestInit {
  headers?: HttpHeaders;
}

/**
 * HttpClient - prosty klient HTTP z obsługą fetch API.
 *
 * Obsługuje przekazywanie AbortController przez opcje (signal).
 * Przykład anulowania żądania:
 *   const controller = new AbortController();
 *   httpClient.get('/endpoint', { signal: controller.signal });
 *   controller.abort();
 */
export class HttpClient {
  private baseURL: string;
  private defaultHeaders: HttpHeaders;

  constructor(baseURL: string = '', defaultHeaders: HttpHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  async request<T = unknown>(endpoint: string, options: HttpClientOptions = {}): Promise<T | string> {
    const url = `${this.baseURL}${endpoint}`;
    const config: HttpClientOptions = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json() as T;
      }

      return await response.text();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  get<T = unknown>(endpoint: string, options: HttpClientOptions = {}): Promise<T | string> {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'GET'
    });
  }

  post<T = unknown>(endpoint: string, data: unknown, options: HttpClientOptions = {}): Promise<T | string> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put<T = unknown>(endpoint: string, data: unknown, options: HttpClientOptions = {}): Promise<T | string> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete<T = unknown>(endpoint: string, options: HttpClientOptions = {}): Promise<T | string> {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'DELETE'
    });
  }

}