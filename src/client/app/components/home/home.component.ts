import { css, html, LitElement } from 'lit-element';

import { setPageMeta } from '../../utils/set-document-meta';

export default class Home extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    setPageMeta({
      title: 'Codamit - Tech Blog',
      description: 'I share stuff about code, architecture and best practices',
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .link {
        text-decoration: underline;
      }
    `;
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <ez-navbar></ez-navbar>
      <ez-profile></ez-profile>
      <ez-page .navbar="${false}">
        <ez-article-feed></ez-article-feed>
        <ez-twitter-feed></ez-twitter-feed>
      </ez-page>
    `;
  }
}

customElements.define('ez-home', Home);
