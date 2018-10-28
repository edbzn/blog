import { LitElement, property } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../../app-router";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export default class Error extends LitElement {
  @property({ type: String })
  message: string;

  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet">
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
        <section class="section">
          <h1 class="title">Something bad happened!</h1>
          <div class="notification is-danger">${unsafeHTML(this.message)}</div>
          <a class="button" href="" @click=${(e: Event) => {
            e.preventDefault();
            window.history.back();
          }}>
            Back to previous page
          </a>
          <a class="button" href="/" @click=${(e: Event) => {
            e.preventDefault();
            router.push("/");
          }}>
            Back to home
          </a>
        </section>
      </ez-page>
    `;
  }
}
