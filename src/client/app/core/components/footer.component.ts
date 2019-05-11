import { css, html, LitElement } from 'lit-element';

import heart from '../../utils/icons/heart';
import { navigate } from '../../utils/navigate';
import { translate } from '../directives/translate.directive';
import { authService } from '../services/authentication-service';

export default class Footer extends LitElement {
  static get styles() {
    return css`
      footer {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 2rem;
        color: #313131;
        font-size: 0.9rem;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .heart svg {
        padding-left: 6px;
        width: 14px;
        position: relative;
        top: 2px;
        fill: #df3e3e;
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
      </footer>
    `;
  }
}

customElements.define('ez-footer', Footer);
