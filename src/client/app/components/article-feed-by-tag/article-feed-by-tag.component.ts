import { html, LitElement, property } from "lit-element";

import { router } from "../../core/router";
import { languageService } from "../../core/services/language-service";
import { setPageMeta } from "../../utils/set-document-meta";

export default class ArticlesByTagComponent extends LitElement {
  @property({ type: String })
  tag: string | null = null;

  connectedCallback() {
    super.connectedCallback();

    setPageMeta({
      title: `Tag ${this.tag}`,
    });
  }

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
        @media screen and (max-width: 600px) {
          .last {
            padding: 2rem 0.8rem;
            margin-top: -0.8rem;
          }
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
