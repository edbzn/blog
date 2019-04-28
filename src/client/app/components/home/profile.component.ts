import { css, html, LitElement } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';

export default class ProfileComponent extends LitElement {
  static get styles() {
    return css`
      .profile {
        max-width: 672px;
        min-height: 210px;
        margin: 0 auto !important;
      }

      .avatar {
        width: 185px;
        min-width: 185px;
        height: 185px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 100%;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
        background-color: #eee;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .follow-me {
        max-height: 36px;
      }

      .presentation {
        padding-left: 1.55rem;
      }

      .presentation .title {
        font-size: 2.6em;
      }

      .presentation .subtitle {
        font-size: 1.2em;
      }

      @media screen and (max-width: 600px) {
        .hero .hero-body {
          padding: 1rem 0.4rem;
        }
      }
    `;
  }

  render() {
    return html`
      <link href="assets/css/bulma.css" rel="stylesheet" />
      <section class="hero is-light is-medium">
        <div class="hero-body">
          <div class="profile columns is-tablet is-desktop is-vcentered is-multiline is-centered">
            <div class="column is-narrow">
              <figure
                class="avatar"
                style="background-image: url('/assets/images/portrait.jpg')"
              ></figure>
            </div>
            <div class="column presentation is-full-mobile">
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
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('ez-profile', ProfileComponent);
