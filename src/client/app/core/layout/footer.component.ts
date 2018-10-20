import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import heart from "../../../assets/images/heart";
import router from "../../../app-router";

export default class Footer extends LitElement {
  render(): TemplateResult {
    return html`
      <style scoped>
        footer {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 2rem;
          color: #313131;
          font-size: 0.8rem;
        }

        .heart svg {
          padding-left: 6px;
          width: 14px;
          position: relative;
          top: 2px;
          fill: #df3e3e;
        }
      </style>
      <footer>
        <span>Made with</span>
        <a href="/login" @click=${(e: Event) => {
          e.preventDefault();

          router.push("/login");
        }}>
          <i class="heart">${heart}</i>
        </a>
      </footer>
    `;
  }
}
