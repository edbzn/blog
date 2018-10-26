import _fetch from "./fetch";

/**
 * Http client
 */
class Api {
  private token: string | null = null;

  private options: RequestInit = {
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${this.token}`,
    },
  };

  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<T> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.options,
      method: "GET",
    });

    return resp.json();
  }

  async post<T>(path: string, data: any): Promise<T> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.options,
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    return resp.json();
  }

  async put<T>(path: string, data: any): Promise<T> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.options,
      method: "PUT",
      body: JSON.stringify({ ...data }),
    });

    return resp.json();
  }

  async delete(path: string): Promise<void> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.options,
      method: "DELETE",
    });

    return resp.json();
  }

  authenticateRequests(token: string): void {
    this.token = token;
  }
}

export const apiClient = new Api("http://localhost:8081");
