import { IUser } from '../../components/login/types';
import { apiClient } from './api-client';
import { errorHandlerService } from './error-handler-service';

const AUTHORIZATION = 'authorization';

class Authentication {

  user: IUser | null;

  authenticated = false;

  constructor() {
    const token = this.getCookie(AUTHORIZATION);

    if (token) {
      this.login(token);

      apiClient
        .get<IUser>('/api/v1/user/me')
        .then(user => {
          this.setUser(user);
        })
        .catch(() => {
          this.logout();
        });
    }
  }

  login(token: string): void {
    this.createCookie(AUTHORIZATION, token);
    apiClient.authenticateRequests(token);
    this.authenticated = true;
  }

  logout(): void {
    apiClient.deAuthenticateRequests();
    this.removeCookie(AUTHORIZATION);
    this.authenticated = false;
    this.user = null;
  }

  setUser(user: IUser): void {
    this.user = user;
  }

  private createCookie(name: string, value: string): void {
    this.removeCookie(name);

    let cookie = `${name}=` + value;
    cookie += ';max-age=' + ((60 * 60 * 24) * 7).toString() + ';'; // 1 week
    document.cookie = cookie;
  }

  private removeCookie(name: string): void {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  private getCookie(name: string): string | undefined {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    const cookie = (parts.pop() || '').split(';').shift();

    return cookie;
  }
}

export const authService = new Authentication();
