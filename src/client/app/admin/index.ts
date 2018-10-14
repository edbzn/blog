import { html } from "lit-html";
import page from "../layout/page";
import router from "../..";

const error = html`
  <h1>Admin</h1>
  <div>Admin works!</div>
`;

export default page(error);
