import { css, html, LitElement } from 'lit-element';

import heart from '../../utils/icons/heart';
import { navigate } from '../../utils/navigate';
import { translate, getTranslation } from '../directives/translate.directive';
import { authService } from '../services/authentication-service';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export default class FooterComponent extends LitElement {
  static get styles() {
    return css`
      footer {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding-top: 4rem;
        padding-bottom: 2rem;
        color: #313131;
        font-size: 0.75rem;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .heart svg {
        margin-left: 6px;
        margin-right: 6px;
        width: 14px;
        position: relative;
        top: 2px;
        fill: #df3e3e;
      }

      a {
        color: #222;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `;
  }

  render() {
    return html`
      <footer>
        <span>${translate('footer.credentials')}</span>
        <a
          href="/admin"
          title="Zone privilégiée"
          @click=${navigate(authService.authenticated ? '/admin' : '/login')}
        >
          <i class="heart">${heart}</i>
        </a>
        ${unsafeHTML(getTranslation('footer.credentials2'))}
      </footer>
    `;
  }
}

customElements.define('ez-footer', FooterComponent);
