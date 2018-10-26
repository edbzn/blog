import { IUser } from "../core/login/types";
import { apiClient } from "./api";
import { showError } from "./show-error";

class Authentication {
  user: IUser | null;

  authenticated = false;

  constructor() {
    const token = this.getCookie("authorization");

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
    this.createCookie(token);
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

  private createCookie(token: string): void {
    let cookie = "authorization=" + token;
    cookie += ";max-age=" + (60 * 60 * 24).toString(); // 24h
    document.cookie = cookie;
  }

  private getCookie(name: string): string | undefined {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) {
      return (parts.pop() || "").split(";").shift();
    }

    return undefined;
  }
}

export const authService = new Authentication();
