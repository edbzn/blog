import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, property } from "@polymer/lit-element";

export default class ProfileComponent extends LitElement {
  @property({ type: Object })
  profile: { name: string; avatarUrl: string; description: string };

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        .profile {
          max-width: 672px;
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
      </style>
      <section class="hero is-light is-medium">
        <div class="hero-body">
          <div
            class="profile columns is-tablet is-desktop is-vcentered is-multiline is-centered"
          >
            <div class="column is-narrow">
              <figure
                class="avatar"
                style="background-image: url('${this.profile.avatarUrl}')"
              ></figure>
            </div>
            <div class="column presentation is-full-mobile">
              <h1 class="title">${this.profile.name}</h1>
              <h2 class="subtitle">${unsafeHTML(this.profile.description)}</h2>
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
      </section>
    `;
  }
}
