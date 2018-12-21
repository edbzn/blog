import { LitElement, html } from "@polymer/lit-element/lit-element";

import heart from "../../utils/icons/heart";
import router from "../../../app-router";
import { authService } from "../auth";

export default class Footer extends LitElement {
  render() {
    return html`
      <style>
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
        <a href="/admin" title="Zone privilégiée" @click=${(e: Event) => {
          e.preventDefault();
          router.push(authService.authenticated ? "/admin" : "/login");
        }}>
          <i class="heart">${heart}</i>
        </a>
      </footer>
    `;
  }
}
