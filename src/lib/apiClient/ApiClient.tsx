/* eslint-disable @typescript-eslint/no-explicit-any */

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export class ApiClient {
  private baseUrl: string = baseUrl;

  constructor(private token?: string) {}

  private buildHeaders(extra?: HeadersInit): HeadersInit {
    return {
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...extra,
    };
  }

  private async request(path: string, options: RequestInit = {}) {
    const res = await fetch(this.baseUrl + path, {
      ...options,
      headers: this.buildHeaders(options.headers),
      cache: "no-store",
    });

    if (!res.ok) {
      const errMsg = await res.text().catch(() => "Request failed");
      throw new Error(errMsg);
    }

    try {
      const data = await res.json();
      return {
        data,
      };
    } catch {
      return null;
    }
  }

  async get(path: string) {
    return this.request(path, { method: "GET" });
  }

  async post(path: string, body?: any) {
    return this.request(path, {
      method: "POST",
      body,
    });
  }

  async patch(path: string, body?: any) {
    return this.request(path, {
      method: "PATCH",
      body,
    });
  }

  async put(path: string, body?: any) {
    return this.request(path, {
      method: "PUT",
      body,
    });
  }

  async delete(path: string) {
    return this.request(path, { method: "DELETE" });
  }
}

export default ApiClient;
