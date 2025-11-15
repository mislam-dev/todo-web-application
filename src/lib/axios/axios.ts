import axios, { type AxiosInstance } from "axios";
import { authToken } from "../token/AuthToken";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export class Axios {
  private static baseUrl: string = baseUrl;
  private static axiosInstance: AxiosInstance | null = null;
  private constructor() {}

  public static get instance(): AxiosInstance | null {
    if (!this.axiosInstance) {
      this.createInstance();
    }

    return this.axiosInstance;
  }

  private static createInstance() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const token = authToken.get();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
      delete config.headers.Authorization;
      return config;
    });
  }
}

export default Axios.instance as AxiosInstance;
