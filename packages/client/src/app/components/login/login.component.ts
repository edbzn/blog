import { css, html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

import { apiClient } from '../../core/services/api-client';
import { authService } from '../../core/services/authentication-service';
import { buttonStyle } from '../../shared/button';
import { cardStyle } from '../../shared/card';
import { formStyle } from '../../shared/form';
import { navigate } from '../../utils/navigate';
import { IUser } from './types';

export default class Login extends LitElement {
  showSignup = false;
  error: string | null = null;

  logUser(credentials: any): Promise<{ token: string }> {
    return apiClient.post<{ token: string }>('/api/v1/auth/login', credentials);
  }

  getMe(): Promise<IUser> {
    return apiClient.get<IUser>('/api/v1/user/me');
  }

  signupUser(user: any): Promise<{ user: IUser; token: string }> {
    return apiClient.post<{
      user: IUser;
      token: string;
    }>('/api/v1/auth/signup', user);
  }

  static get styles() {
    return [
      formStyle,
      buttonStyle,
      cardStyle,
      css`
        .second {
          margin-top: 50px;
        }

        .section {
          max-width: 350px;
          margin: 0 auto;
        }

        .error {
          color: #f05555;
        }
      `,
    ];
  }

  render() {
    return html`
      <ez-page>
        <section class="section">
          ${this.showSignup
            ? html`
                <h1 class="title">Signup</h1>
                ${this.error
                  ? html`
                      <div class="card error" no-hover>
                        <div class="card-content">${this.error}</div>
                      </div>
                    `
                  : nothing}
                <form
                  class="box"
                  name="signup"
                  @submit="${async (e: Event) => {
                    e.preventDefault();

                    const host = this.shadowRoot as ShadowRoot;
                    const email = host.getElementById('email') as HTMLInputElement;
                    const password = host.getElementById('password') as HTMLInputElement;
                    const firstName = host.getElementById('firstName') as HTMLInputElement;
                    const lastName = host.getElementById('lastName') as HTMLInputElement;
                    const signupPayload = {
                      email: email.value,
                      password: password.value,
                      firstName: firstName.value,
                      lastName: lastName.value,
                    };

                    try {
                      const { token } = await this.signupUser(signupPayload);
                      authService.login(token);
                      const user = await this.getMe();
                      authService.setUser(user);
                      navigate('/admin')();
                    } catch (e) {
                      this.error = e.message;
                      this.requestUpdate();
                    }
                  }}"
                >
                  <div class="field">
                    <label class="label" for="email">Email</label>
                    <input class="input" id="email" name="email" type="email" required />
                  </div>
                  <div class="field">
                    <label class="label" for="firstName">First name</label>
                    <input class="input" id="firstName" name="firstName" type="string" required />
                  </div>
                  <div class="field">
                    <label class="label" for="lastName">Last name</label>
                    <input class="input" id="lastName" name="lastName" type="string" required />
                  </div>
                  <div class="field">
                    <label class="label" for="password">Password</label>
                    <input class="input" id="password" name="password" type="password" required />
                  </div>
                  <button class="button is-primary" type="submit">
                    Create account
                  </button>
                  <button
                    class="button second"
                    type="button"
                    @click="${() => {
                      this.showSignup = !this.showSignup;
                      this.requestUpdate();
                    }}"
                  >
                    I already have an account
                  </button>
                </form>
              `
            : html`
                <h1 class="title">Login</h1>
                ${this.error
                  ? html`
                      <div class="card error" no-hover>
                        <div class="card-content">${this.error}</div>
                      </div>
                    `
                  : nothing}
                <form
                  class="box"
                  name="login"
                  @submit="${async (e: Event) => {
                    e.preventDefault();

                    const host = this.shadowRoot as ShadowRoot;
                    const email = host.getElementById('email') as HTMLInputElement;
                    const password = host.getElementById('password') as HTMLInputElement;
                    const credentials = {
                      email: email.value,
                      password: password.value,
                    };

                    try {
                      const { token } = await this.logUser(credentials);
                      authService.login(token);
                      const user = await this.getMe();
                      authService.setUser(user);
                      navigate('/admin')();
                    } catch (e) {
                      this.error = e.message;
                      this.requestUpdate();
                    }
                  }}"
                >
                  <div class="field">
                    <label class="label" for="email">Email</label>
                    <input class="input" id="email" name="email" type="email" required />
                  </div>
                  <div class="field">
                    <label class="label" for="password">Password</label>
                    <input class="input" id="password" name="password" type="password" required />
                  </div>
                  <button class="button" type="submit">
                    Login
                  </button>
                  <button
                    class="button second"
                    type="button"
                    @click="${() => {
                      this.showSignup = true;
                      this.requestUpdate();
                    }}"
                  >
                    I don't have an account
                  </button>
                </form>
              `}
        </section>
      </ez-page>
    `;
  }
}

customElements.define('ez-login', Login);
