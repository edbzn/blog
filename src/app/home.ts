import { html } from "lit-html";
import { navbar } from "./layout/navbar";

const home = () => html`<div>
  ${navbar()}
  <main>
  </main>
</div>`;

export default home;
