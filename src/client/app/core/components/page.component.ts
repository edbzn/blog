import { css, html, LitElement, property } from 'lit-element';

export default class Page extends LitElement {
  @property({ type: Boolean })
  navbar = true;

  static get styles() {
    return css`
      .page-wrapper {
        max-width: 780px !important;
        margin: 0 auto;
      }
    `;
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      ${this.navbar
        ? html`
            <ez-navbar></ez-navbar>
          `
        : html``}
      <main class="page-wrapper"><slot></slot></main>
      <ez-footer></ez-footer>
    `;
  }
}

customElements.define('ez-page', Page);
