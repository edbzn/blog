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
        max-width: 780px !important;
        margin: 0px auto;
      }

      .follow-me {
        max-height: 36px;
      }

      .title {
        margin: 0;
        font-size: 2.6em;
        line-height: 80px;
      }

      .me,
      .job {
        display: block;
      }

      .subtitle {
        margin-top: 36px;
        font-size: 1.2em;
        font-weight: 400;
      }

      .job {
        margin-left: -11px;
        font-size: 9rem;
        font-weight: 400;
      }
    `;
  }

  render() {
    return html`
      <section>
        <div class="page-wrapper">
          <h1 class="title">
            <span class="me">Edouard Bozon</span>
            <span class="job">Developer</span>
          </h1>
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
