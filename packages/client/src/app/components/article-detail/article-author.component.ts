import { html, LitElement, css } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';

export default class ArticleAuthorComponent extends LitElement {
  static get styles() {
    return css`
      .profile {
        display: flex;
        align-items: center;
      }

      .presentation {
        font-family: 'IBM Plex Sans', sans-serif;
      }

      figure {
        width: 64px;
        height: 64px;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 50%;
        margin: 0;
        margin-right: 1.5rem;
      }
    `;
  }

  render() {
    return html`
      <div class="profile">
        <figure
          class="avatar"
          style="background-image: url('/assets/images/portrait.jpg')"
        ></figure>
        <div class="presentation">
          <strong>Edouard Bozon</strong><br />
          <span>${translate('profile.description')}</span>
          <div class="follow-me">
            <iframe
              src="https://platform.twitter.com/widgets/follow_button.html?screen_name=edouardbozon&show_screen_name=true&show_count=false"
              title="Follow me"
              width="148"
              height="26"
              style="margin-top: 12px; border: 0; overflow: hidden;"
            ></iframe>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ez-article-author', ArticleAuthorComponent);
