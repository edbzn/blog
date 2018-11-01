import { IUser } from "../core/login/types";
import { apiClient } from "./api";
import { showError } from "./show-error";

class Authentication {
  static readonly AUTHORIZATION = "authorization";

  user: IUser | null;

  authenticated = false;

  constructor() {
    const token = this.getCookie(Authentication.AUTHORIZATION);

    console.log(token);

    if (token) {
      this.login(token);

      apiClient
        .get<IUser>("/api/v1/user/me")
        .then(user => {
          this.setUser(user);
        })
        .catch(e => showError(e));
    }
  }

  login(token: string): void {
    this.createCookie(Authentication.AUTHORIZATION, token);
    apiClient.authenticateRequests(token);
    this.authenticated = true;
  }

  logout(): void {
    apiClient.deAuthenticateRequests();
    this.authenticated = false;
    this.user = null;
  }

  setUser(user: IUser): void {
    this.user = user;
  }

  private createCookie(name: string, value: string): void {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    let cookie = `${name}=` + value;
    cookie += ";max-age=" + (60 * 60 * 24).toString(); // 24h
    document.cookie = cookie;
  }

  private getCookie(name: string): string | undefined {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    const cookie = (parts.pop() || "").split(";").shift();

    if (!cookie) {
      throw new Error("Cookie not found");
    }

    return cookie;
  }
}

export const authService = new Authentication();
