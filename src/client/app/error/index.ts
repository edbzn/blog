import { html } from "lit-html";
import page from "../layout/page";
import router from "../..";

const error = html`
  <h1>Something bad happened...</h1>
  <br/>
  <a @click=${() => router.push("/")}>Back to home</a>
`;

export default page(error);
