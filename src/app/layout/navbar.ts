import { html } from "lit-html";
import github from "../../assets/images/github";
import twitter from "../../assets/images/twitter";

const githubUrl = "https://github.com/edouardbozon";
const twitterUrl = "https://twitter.com/edouardbozon";

export const navbar = () => html`
<style scoped>
  nav {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(180, 180, 180);
    background: rgb(34, 34, 34);
  }

  h1 {
    margin: 0;
    font-size: 1.4rem;
  }

  svg {
    display: inline-block;
    width: 32px;
    height: 32px;
  }

  .socials a {
    padding-left: 1rem;
  }
</style>
<nav>
  <h1>Codamit</h1>
  <span class="socials">
    <a title="Github profile" href="${githubUrl}">${github}</a>
    <a title="Twitter profile" href="${twitterUrl}">${twitter}</a>
  </span>
</nav>`;
