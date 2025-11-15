import { jwtDecode } from "jwt-decode";

class AuthToken {
  private key: string = "authToken";

  get(): string {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(this.key) || "";
  }
  set(value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.key, value);
  }
  remove(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.key);
  }
  get has(): boolean {
    return !!localStorage.getItem(this.key);
  }
  decode(token: string = this.get()) {
    return jwtDecode(token);
  }
  isTokenValid() {
    const token = this.get();
    if (!token) return false;

    try {
      const decoded = this.decode();
      const currentTime = Math.floor(Date.now() / 1000);
      return Number(decoded.exp)! > currentTime;
    } catch {
      return false;
    }
  }
}

export const authToken = new AuthToken();
