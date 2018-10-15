import { html, TemplateResult } from "lit-html";
import { LitElement } from "@polymer/lit-element/lit-element";

export default class Page extends LitElement {
  render(): TemplateResult {
    return html`
      <style scoped>
        .container {
          height: 100vh;
        }

        main {
          width: 600px;
          min-height: calc(100vh - 186px);
          margin: 0 auto;
          margin-top: 40px;
        }
      </style>
      <div class="container">
        <ez-navbar></ez-navbar>
        <main>
          <slot></slot>
        </main>
        <ez-footer></ez-footer>
      </div>
    `;
  }
}
