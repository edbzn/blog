import { html, render } from "lit-html";

// This is a lit-html template function. It returns a lit-html template.
const helloTemplate = (name: string) => html`<div>Hello ${name}!</div>`;

// This updates to <div>Hello Kevin!</div>, but only updates the ${name} part
export default render(helloTemplate("Kevisssn"), document.body);
