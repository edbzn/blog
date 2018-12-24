import { LitElement, html } from "@polymer/lit-element/lit-element";

import router from "../../../app-router";
import { showError } from "../../utils/show-error";
import _fetch from "../../utils/fetch";
import { LoginPayload } from "../../../../server/api/auth/helpers/login-payload";
import { SignupPayload } from "../../../../server/api/auth/helpers/signup-payload";
import { apiClient } from "../api-client";
import { IUser } from "./types";
import { authService } from "../authentication-service";

export default class Login extends LitElement {
  showSignup = false;

  logUser(credentials: LoginPayload): Promise<{ token: string }> {
    return apiClient.post<{ token: string }>("/api/v1/auth/login", credentials);
  }

  getMe(): Promise<IUser> {
    return apiClient.get<IUser>("/api/v1/user/me");
  }

  signupUser(user: SignupPayload): Promise<{ user: IUser; token: string }> {
    return apiClient.post<{ user: IUser; token: string }>(
      "/api/v1/auth/signup",
      user,
    );
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        .section {
          max-width: 350px;
          margin: 0 auto;
        }
      </style>
      <ez-page>
        <section class="section">
          ${
            this.showSignup
              ? html`
                  <h1 class="title">Signup</h1>
                  <form
                    class="box"
                    name="signup"
                    @submit="${
                      async (e: Event) => {
                        e.preventDefault();

                        const host = this.shadowRoot as ShadowRoot;
                        const email = host.getElementById(
                          "email",
                        ) as HTMLInputElement;
                        const password = host.getElementById(
                          "password",
                        ) as HTMLInputElement;
                        const firstName = host.getElementById(
                          "firstName",
                        ) as HTMLInputElement;
                        const lastName = host.getElementById(
                          "lastName",
                        ) as HTMLInputElement;
                        const signupPayload: SignupPayload = {
                          email: email.value,
                          password: password.value,
                          firstName: firstName.value,
                          lastName: lastName.value,
                        };

                        try {
                          const { token } = await this.signupUser(
                            signupPayload,
                          );
                          authService.login(token);
                          const user = await this.getMe();
                          authService.setUser(user);
                          router.push("/admin");
                        } catch (e) {
                          showError(e);
                        }
                      }
                    }"
                  >
                    <div class="field">
                      <label class="label" for="email">Email</label>
                      <input
                        class="input"
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>
                    <div class="field">
                      <label class="label" for="firstName">First name</label>
                      <input
                        class="input"
                        id="firstName"
                        name="firstName"
                        type="string"
                        required
                      />
                    </div>
                    <div class="field">
                      <label class="label" for="lastName">Last name</label>
                      <input
                        class="input"
                        id="lastName"
                        name="lastName"
                        type="string"
                        required
                      />
                    </div>
                    <div class="field">
                      <label class="label" for="password">Password</label>
                      <input
                        class="input"
                        id="password"
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                    <button class="button is-primary" type="submit">
                      Signup
                    </button>
                    <button
                      class="button"
                      @click="${
                        () => {
                          this.showSignup = !this.showSignup;
                          this.update(new Map());
                        }
                      }"
                    >
                      Login
                    </button>
                  </form>
                `
              : html`
                  <h1 class="title">Login</h1>
                  <form
                    class="box"
                    name="login"
                    @submit="${
                      async (e: Event) => {
                        e.preventDefault();

                        const host = this.shadowRoot as ShadowRoot;
                        const email = host.getElementById(
                          "email",
                        ) as HTMLInputElement;
                        const password = host.getElementById(
                          "password",
                        ) as HTMLInputElement;
                        const credentials: LoginPayload = {
                          email: email.value,
                          password: password.value,
                        };

                        try {
                          const { token } = await this.logUser(credentials);
                          authService.login(token);
                          const user = await this.getMe();
                          authService.setUser(user);
                          router.push("/admin");
                        } catch (e) {
                          showError(e);
                        }
                      }
                    }"
                  >
                    <div class="field">
                      <label class="label" for="email">Email</label>
                      <input
                        class="input"
                        id="email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>
                    <div class="field">
                      <label class="label" for="password">Password</label>
                      <input
                        class="input"
                        id="password"
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                    <button class="button is-primary" type="submit">
                      Login
                    </button>
                  </form>
                `
          }
        </section>
      </ez-page>
    `;
  }
}

customElements.define("ez-login", Login);
