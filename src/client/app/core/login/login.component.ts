import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../../app-router";
import { showError } from "../../utils/show-error";
import _fetch from "../../utils/fetch";
import { LoginPayload } from "../../../../server/api/auth/helpers/login-payload";

export default class Login extends LitElement {
  logUser = async (credentials: LoginPayload): Promise<any> => {
    return await _fetch(`http://localhost:8081/api/v1/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({ ...credentials }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

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
        <h1>Login</h1>
        <form name="login" @submit=${async (e: Event) => {
          e.preventDefault();

          const host = this.shadowRoot as ShadowRoot;
          const email = host.getElementById("email") as HTMLInputElement;
          const password = host.getElementById("password") as HTMLInputElement;
          const credentials = { email: email.value, password: password.value };

          try {
            await this.logUser(credentials);
            router.push("/admin");
          } catch (e) {
            showError(e);
          }
        }}>
          <label for="name">Name</label>
          <input id="name" name="email" type="email" required />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button type="submit">Login</button>
        </form>
      </ez-page>
    `;
  }
}
