import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../../app-router";

export default class Admin extends LitElement {
  render(): TemplateResult {
    return html`
      <style scoped>
        :host {
          display: block;
        }

        form {
          margin-top: 20px;
        }

        form input, 
        form label,
        form textarea {
          display: block;
        }

        form input, form textarea {
          margin-bottom: 10px;
        }
      </style>
      <ez-page>
        <h1>Admin</h1>
        <div>
          <a href="/admin/draft"
            title="Start writing"
            @click=${(e: Event) => {
              e.preventDefault();
              router.push(`/admin/draft`);
            }}>
            Start a new draft
          </a>
        </div>
        <div>
          <ez-article-feed adminMode=${true}></ez-article-feed>
        </div>
      </ez-page>
    `;
  }
}
