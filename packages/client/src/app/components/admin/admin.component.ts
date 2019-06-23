import { css, html, LitElement } from 'lit-element';

import { buttonStyle } from '../../shared/button';
import { navigate } from '../../utils/navigate';

export default class Admin extends LitElement {
  static get styles() {
    return [
      buttonStyle,
      css`
        :host {
          display: block;
        }

        .section a {
          margin: 1.5rem 0;
        }
      `,
    ];
  }

  render() {
    return html`
      <ez-page>
        <section class="section">
          <a
            class="button"
            href="/admin/draft"
            title="Start writing"
            @click=${navigate(`/admin/draft`)}
          >
            New draft
          </a>
        </section>
        <ez-article-feed ?showAdminActions=${true}></ez-article-feed>
      </ez-page>
    `;
  }
}

customElements.define('ez-admin', Admin);
