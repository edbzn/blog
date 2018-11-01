import { html, TemplateResult } from "lit-html";
import { LitElement, property } from "@polymer/lit-element/lit-element";
import { pageMaxWidth } from "./variables";

export default class Page extends LitElement {
  @property({ type: Boolean })
  navbar = true;

  @property({ type: Boolean })
  hasContainer = true;

  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet">
      <style>.container { max-width: ${pageMaxWidth} !important; margin: 0 auto; }</style>
      <div>
        ${this.navbar ? html`<ez-navbar></ez-navbar>` : html``}
        <main class="${this.hasContainer ? "container" : "container is-fluid"}">
          <slot></slot>
        </main>
        <ez-footer></ez-footer>
      </div>
    `;
  }
}
