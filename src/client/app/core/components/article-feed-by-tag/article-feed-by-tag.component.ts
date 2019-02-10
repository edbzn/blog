import { html, LitElement, property } from 'lit-element';

import router from '../../../../app-router';
import { languageService } from '../../language-service';

export default class ArticlesByTagComponent extends LitElement {
  @property({ type: String })
  tag: string | null = null;

  render() {
    const { tag } = this;

    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        .last {
          margin-top: -1.5rem;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
      </style>
      <ez-page>
        <ez-article-feed .tags=${[tag]}></ez-article-feed>
        <section class="section last">
          <a
            href="/"
            class="button is-block"
            @click="${(e: Event) => {
              e.preventDefault();
              router.push("/");
            }}"
          >
            ${languageService.translation.article_feed_by_tag.home_btn}
          </a>
        </section>
      </ez-page>
    `;
  }
}

customElements.define("ez-article-feed-by-tag", ArticlesByTagComponent);
