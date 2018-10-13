import { html, TemplateResult } from "lit-html";
import { navbar } from "./navbar";
import { footer } from "./footer";

const page = (page: TemplateResult) => html`
<style scoped>
  .container {
    height: 100vh;
  }

  main {
    width: 600px;
    min-height: calc(100vh - 156px);
    margin: 0 auto;
    margin-top: 40px;
  }
</style>
<div class="container">
  ${navbar()}
  <main>${page}</main>
  ${footer()}
</div>`;

export default page;
