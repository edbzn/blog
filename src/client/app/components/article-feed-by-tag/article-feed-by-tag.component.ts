import { css, html, LitElement, property } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';
import { navigate } from '../../utils/navigate';
import { setPageMeta } from '../../utils/set-document-meta';

export default class ArticlesByTagComponent extends LitElement {
  @property({ type: String })
  tag: string | null = null;

  connectedCallback() {
    super.connectedCallback();

    setPageMeta({
      title: `Tag ${this.tag}`,
    });
  }

  static get styles() {
    return css`
      .last {
        margin-top: -1.5rem;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }

      ez-article-feed {
        margin-top: 42px;
      }

      .button {
        color: #222;
        text-decoration: none;
        text-align: center;
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        margin-top: 10px;
        border: 1px solid #eee;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        color: #222;
        font-size: 0.8rem;
        transition: 150ms ease;
      }

      .button:hover {
        background: #eee;
      }

      .button:focus {
        outline: none;
        border: 2px solid #eee;
      }

      @media screen and (max-width: 600px) {
        .last {
          padding: 2rem 0.8rem;
          margin-top: -0.8rem;
        }
      }
    `;
  }

  render() {
    const { tag } = this;

    return html`
      <ez-page>
        <ez-article-feed .tags=${[tag]}></ez-article-feed>
        <a href="/" class="button" @click="${navigate('/')}">
          ${translate('article_feed_by_tag.home_btn')}
        </a>
      </ez-page>
    `;
  }
}

customElements.define('ez-article-feed-by-tag', ArticlesByTagComponent);
