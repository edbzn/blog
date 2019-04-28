import { css, html, LitElement } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';

export default class ProfileComponent extends LitElement {
  static get styles() {
    return css`
      section {
        padding: 8rem 0;
        padding-top: 3.2rem;
        background: linear-gradient(rgb(233, 233, 233), 80%, white);
      }

      .page-wrapper {
        max-width: 780px !important;
        margin: 0px auto;
      }

      .follow-me {
        max-height: 36px;
      }

      .title {
        font-size: 2.6em;
      }

      .subtitle {
        font-size: 1.2em;
      }

      .job {
        font-size: 6rem;
      }
    `;
  }

  render() {
    return html`
      <section>
        <div class="page-wrapper">
          <h1 class="title">
            Edouard Bozon <br>
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
