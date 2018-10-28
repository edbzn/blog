import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../../app-router";
import github from "../../utils/icons/github";
import twitter from "../../utils/icons/twitter";

export default class NavBar extends LitElement {
  twitterUrl = "https://twitter.com/edouardbozon";
  githubUrl = "https://github.com/edouardbozon";

  render(): TemplateResult {
    return html`
      <style scoped>
        :host {
          display: block;
        }

        nav {
          height: 64px;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          color: rgb(180, 180, 180);
          background: rgb(34, 34, 34);
        }

        h1 {
          margin: 0;
          font-size: 1.4rem;
        }

        svg {
          display: inline-block;
          width: 24px;
          height: 24px;
        }

        a {
          color: rgb(180, 180, 180);
          text-decoration: none;
        }

        .socials a {
          padding-left: 1rem;
        }
      </style>
      <nav>
        <a href="/" @click=${(e: Event) => {
          e.preventDefault();

          router.push("/");
        }}>Dave, I can't open the door.</a>
        <span class="socials">
          <a title="Github profile" href="${this.githubUrl}">${github}</a>
          <a title="Twitter profile" href="${this.twitterUrl}">${twitter}</a>
        </span>
      </nav>
    `;
  }
}
