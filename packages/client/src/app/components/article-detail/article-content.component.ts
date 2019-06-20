import { css, html, LitElement, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

export default class ArticleContentComponent extends LitElement {
  @property({ type: String })
  content: string;

  firstUpdated() {
    (this.shadowRoot as ShadowRoot).querySelectorAll('code').forEach(elem => {
      Prism.highlightElement(elem);
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-size: 1.3rem;
      }

      iframe {
        border: none;
        margin: 2rem 0;
      }

      img {
        display: block;
        width: 100%;
        margin: 3rem 0;
        border-radius: 4px;
      }

      .content {
        margin-bottom: 3rem;
      }

      pre[class*='language-'] {
        margin: 2em 0 !important;
        line-height: 1.1;
      }

      :not(pre) > code[class*='language-'],
      pre[class*='language-'] {
        border-radius: 4px;
      }

      code .number,
      code .tag.tag:not(body) {
        align-items: inherit;
        background-color: inherit;
        border-radius: inherit;
        display: inherit;
        font-size: inherit;
        height: inherit;
        justify-content: inherit;
        margin-right: inherit;
        min-width: inherit;
        padding: inherit;
        text-align: inherit;
        vertical-align: inherit;
      }

      :not(pre) > code[class*='language-'] {
        background: rgba(255, 229, 100, 0.2) !important;
        text-shadow: none;
        color: #1a1a1a;
        padding: 0.15em 0.2em 0.05em;
        border-radius: 0px !important;
      }

      h2,
      h3,
      h4 {
        margin-top: 40px;
      }

      code {
        font-size: 1rem;
      }

      blockquote {
        font-family: 'IBM Plex Serif', serif;
        font-style: italic;
        font-size: 2rem;
        margin: 3rem;
      }

      blockquote p {
        quotes: '„ ' ' “';
      }

      blockquote p::before {
        content: open-quote;
      }

      blockquote p::after {
        content: close-quote;
      }

      a {
        color: #40a8ff;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      @media screen and (max-width: 800px) {
        img {
          margin: 3rem 0;
        }

        blockquote {
          margin: 3rem 0;
        }
      }
    `;
  }

  render() {
    return html`
      <link href="/assets/css/atom.css" rel="stylesheet" />
      <div class="content">${unsafeHTML(this.content)}</div>
    `;
  }
}

customElements.define('ez-article-content', ArticleContentComponent);
