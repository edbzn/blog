import { css, html, LitElement, property } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';
import { buttonStyle } from '../../shared/button';
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
    return [
      buttonStyle,
      css`
        .last {
          margin-top: -1.5rem;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        ez-article-feed {
          margin-top: 42px;
        }

        @media screen and (max-width: 800px) {
          .last {
            padding: 2rem 0.8rem;
            margin-top: -0.8rem;
          }
        }
      `,
    ];
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
