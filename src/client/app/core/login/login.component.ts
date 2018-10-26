import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../../app-router";
import { showError } from "../../utils/show-error";
import _fetch from "../../utils/fetch";
import { LoginPayload } from "../../../../server/api/auth/helpers/login-payload";
import { SignupPayload } from "../../../../server/api/auth/helpers/signup-payload";

export default class Login extends LitElement {
  showSignup = false;

  async logUser(credentials: LoginPayload): Promise<string> {
    const resp = await _fetch(`http://localhost:8081/api/v1/auth/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({ ...credentials }),
    });

    return resp.json();
  }

  async signupUser(user: SignupPayload): Promise<{ user: any; token: string }> {
    const resp = await _fetch(`http://localhost:8081/api/v1/auth/signup`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({ ...user }),
    });

    return resp.json();
  }

  render(): TemplateResult {
    return html`
      <style scoped>
        form {
          margin-top: 20px;
        }

        form input, form label {
          display: block;
        }

        form input {
          margin-bottom: 10px;
        }
      </style>
      <ez-page>
        <button @click=${() => {
          this.showSignup = !this.showSignup;
          this.update(new Map());
        }}>Signup</button>
        ${
          this.showSignup
            ? html`
              <h1>Signup</h1>
              <form name="signup" @submit=${async (e: Event) => {
                e.preventDefault();

                const host = this.shadowRoot as ShadowRoot;
                const email = host.getElementById("email") as HTMLInputElement;
                const password = host.getElementById(
                  "password",
                ) as HTMLInputElement;
                const firstName = host.getElementById(
                  "firstName",
                ) as HTMLInputElement;
                const lastName = host.getElementById(
                  "lastName",
                ) as HTMLInputElement;
                const user = {
                  email: email.value,
                  password: password.value,
                  firstName: firstName.value,
                  lastName: lastName.value,
                };

                try {
                  await this.signupUser(user);
                  router.push("/admin");
                } catch (e) {
                  showError(e);
                }
              }}>
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required />
                <label for="firstName">First name</label>
                <input id="firstName" name="firstName" type="string" required />
                <label for="lastName">Last name</label>
                <input id="lastName" name="lastName" type="string" required />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required />
                <button type="submit">Signup</button>
              </form>`
            : html`
              <h1>Login</h1>
              <form name="login" @submit=${async (e: Event) => {
                e.preventDefault();

                const host = this.shadowRoot as ShadowRoot;
                const email = host.getElementById("email") as HTMLInputElement;
                const password = host.getElementById(
                  "password",
                ) as HTMLInputElement;
                const credentials = {
                  email: email.value,
                  password: password.value,
                };

                try {
                  await this.logUser(credentials);
                  router.push("/admin");
                } catch (e) {
                  showError(e);
                }
              }}>
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required />
                <button type="submit">Login</button>
              </form>
          `
        }
      </ez-page>
    `;
  }
}
