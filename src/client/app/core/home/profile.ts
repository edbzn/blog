import { html } from "lit-html";
import { pageMaxWidth } from "../layout/variables";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export const profile = ({
  name,
  description,
  avatarUrl,
}: {
  name: string;
  description: string;
  avatarUrl: string;
}) => html`
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
  </style>
  <section class="hero is-light is-medium">
    <div class="hero-body">
      <div
        class="profile columns is-tablet is-desktop is-vcentered is-multiline is-centered"
      >
        <div class="column is-narrow">
          <figure
            class="avatar"
            style="background-image: url('${avatarUrl}')"
          ></figure>
        </div>
        <div class="column presentation is-full-mobile">
          <h1 class="title">${name}</h1>
          <h2 class="subtitle">${unsafeHTML(description)}</h2>
        </div>
      </div>
    </div>
  </section>
`;
