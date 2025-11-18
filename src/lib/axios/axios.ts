import axios, { type AxiosInstance } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export class Axios {
  private static baseUrl: string = baseUrl;
  private static axiosInstance: AxiosInstance | null = null;
  private constructor() {}

  public static getInstance(token: string): AxiosInstance | null {
    if (!this.axiosInstance) {
      this.createInstance(token);
    }

    return this.axiosInstance;
  }

  private static createInstance(token: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    this.axiosInstance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
      delete config.headers.Authorization;
      return config;
    });
  }
}

export default Axios;
