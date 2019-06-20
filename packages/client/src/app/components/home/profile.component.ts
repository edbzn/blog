import { css, html, LitElement } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';

export default class ProfileComponent extends LitElement {
  static get styles() {
    return css`
      section {
        padding: 5rem 0;
        margin-bottom: 42px;
        background: #eee;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .page-wrapper {
        max-width: 780px;
        margin: 0px auto;
      }

      .follow-me {
        max-height: 36px;
      }

      .title {
        margin: 0;
        font-size: 2.6rem;
      }

      .subtitle {
        width: 90%;
        margin-top: 0px;
        font-size: 2rem;
        font-weight: 100;
      }

      @media screen and (max-width: 800px) {
        .page-wrapper {
          padding: 1rem 0.8rem;
        }
      }
    `;
  }

  render() {
    return html`
      <section>
        <div class="page-wrapper">
          <h1 class="title">Edouard Bozon</h1>
          <h2 class="subtitle">
            ${translate('profile.description')}
          </h2>
          <div class="follow-me">
            <iframe
              src="https://platform.twitter.com/widgets/follow_button.html?screen_name=edouardbozon&show_screen_name=true&show_count=true"
              title="Follow me"
              width="245"
              height="26"
              style="border: 0; overflow: hidden;"
            ></iframe>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('ez-profile', ProfileComponent);
