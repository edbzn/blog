import { css, html, LitElement } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';
import { cardStyle } from '../../shared/card';

export default class ArticleAuthorComponent extends LitElement {
  static get styles() {
    return [
      cardStyle,
      css`
        .profile {
          display: flex;
          align-items: center;
        }

        .presentation {
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .follow-me {
          height: 26px;
          margin-top: 6px;
        }

        figure {
          max-height: 64px;
          min-height: 64px;
          max-width: 64px;
          min-width: 64px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
          border-radius: 50%;
          margin: 0;
          margin-right: 1.5rem;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card" no-hover>
        <div class="profile card-content">
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
                style="border: 0; overflow: hidden;"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ez-article-author', ArticleAuthorComponent);
