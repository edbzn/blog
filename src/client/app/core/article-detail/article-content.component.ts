import { LitElement, property, html } from "@polymer/lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

import * as Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

export default class ArticleContent extends LitElement {
  @property({ type: String })
  content: string;

  firstUpdated() {
    (this.shadowRoot as ShadowRoot).querySelectorAll("code").forEach(elem => {
      Prism.highlightElement(elem);
    });
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <link href="assets/css/atom.css" rel="stylesheet" />
      <style>
        :host {
          display: block;
        }

        pre[class*="language-"] {
          margin: 2em 0 !important;
        }

        :not(pre) > code[class*="language-"],
        pre[class*="language-"] {
          border-radius: 4px;
        }

        code .number,
        code .tag.tag:not(body) {
          align-items: inherit;
          background-color: inherit;
          border-radius: inherit;
          display: inherit;
          font-size: inherit;
          height: inherit;
          justify-content: inherit;
          margin-right: inherit;
          min-width: inherit;
          padding: inherit;
          text-align: inherit;
          vertical-align: inherit;
        }
      </style>
      <div class="content is-medium">${unsafeHTML(this.content)}</div>
    `;
  }
}
