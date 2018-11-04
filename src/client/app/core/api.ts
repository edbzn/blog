import _fetch from "../utils/fetch";

export class HttpClient {
  private token: string | null = null;

  private readonly options: RequestInit = {
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<T> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.getOptions(),
      method: "GET",
    });

    return resp.json();
  }

  async post<T>(path: string, data: any): Promise<T> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.getOptions(),
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    return resp.json();
  }

  async put<T>(path: string, data: any): Promise<T> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.getOptions(),
      method: "PUT",
      body: JSON.stringify({ ...data }),
    });

    return resp.json();
  }

  async delete(path: string): Promise<void> {
    const resp = await _fetch(this.baseUrl + path, {
      ...this.getOptions(),
      method: "DELETE",
    });

    return resp.json();
  }

  authenticateRequests(token: string): void {
    this.token = token;
  }

  deAuthenticateRequests(): void {
    this.token = null;
  }

  private getOptions() {
    const options: RequestInit = this.options;

    if (typeof this.token === "string") {
      const authorizedHeaders = new Headers(options.headers);
      authorizedHeaders.set("Authorization", `Bearer ${this.token}`);
      options.headers = authorizedHeaders;
    }

    return options;
  }
}

export const apiClient = new HttpClient(
  (process.env.API_BASE_URL as string) || "http://localhost:8081",
);
