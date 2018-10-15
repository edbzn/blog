import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../app-router";

export default class Error extends LitElement {
  render(): TemplateResult {
    return html`
      <ez-page>
        <h1>Something bad happened...</h1>
        <br/>
        <a href="" @click=${(e: Event) => {
          e.preventDefault();

          router.push("/");
        }}>Back to home</a>
      </ez-page>
    `;
  }
}
