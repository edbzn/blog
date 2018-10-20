import { LitElement, property } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../../app-router";

export default class Error extends LitElement {
  @property({ type: String })
  message: string;

  render(): TemplateResult {
    return html`
      <style scoped>
        a {
          display: inline-block;
          margin-right: 8px;
        }

        .error-message {
          padding: 1.4rem;
          margin-bottom: 8px;
          background: #f8f8f8;
          border-radius: 2px;
          color: #585858;
        }
      </style>
      <ez-page>
        <h1>Something bad happened!</h1>
        <div class="error-message">${this.message}</div>
        <a href="" @click=${(e: Event) => {
          e.preventDefault();

          window.history.back();
        }}>
          Back to previous page
        </a>
        <a href="/" @click=${(e: Event) => {
          e.preventDefault();

          router.push("/");
        }}>
          Back to home
        </a>
      </ez-page>
    `;
  }
}
