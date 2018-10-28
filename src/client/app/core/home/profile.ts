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
<link href="assets/css/bulma.min.css" rel="stylesheet">
<style>
  .profile {
    max-width: ${pageMaxWidth};
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .avatar {
    min-width: 185px;
    height: 185px;
    overflow: hidden;
    border-radius: 100%;
    box-shadow: 2px 2px 8px rgba(0,0,0, 0.1);
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
    font-size: 1.6em;
  }
</style>
<section class="hero is-light is-medium">
  <div class="hero-body">
    <div class="profile">
      <figure class="avatar" style="background-image: url('${avatarUrl}')"></figure>
      <div class="presentation">
        <h1 class="title">${unsafeHTML(name)}</h1>
        <h2 class="subtitle">${unsafeHTML(description)}</h2>
      </div>
    </div>
  </div>
</section>
`;
