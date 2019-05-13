import { html, LitElement } from 'lit-element';

import { navigate } from '../../utils/navigate';

export default class Admin extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <ez-page>
        <section class="section">
          <h1 class="title">Admin</h1>
          <a
            class="button is-primary block"
            href="/admin/draft"
            title="Start writing"
            @click=${navigate(`/admin/draft`)}
          >
            Start a new draft
          </a>
        </section>
        <ez-article-feed adminMode=${true}></ez-article-feed>
      </ez-page>
    `;
  }
}

customElements.define('ez-admin', Admin);
