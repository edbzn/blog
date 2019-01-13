import { html, LitElement, property } from "lit-element";
import { format } from "date-fns";
import * as frLocale from "date-fns/locale/fr";

import router from "../../../app-router";
import { placeholder } from "../../shared/placeholder";
import { tags } from "../../shared/tags";
import { ResourceCollection } from "../../utils/collection";
import check from "../../utils/icons/check";
import { IArticle } from "../admin/types";
import { apiClient } from "../api-client";
import { errorHandlerService } from "../error-handler-service";

export default class ArticleFeed extends LitElement {
  @property({ type: Array })
  tags = [];

  @property({ type: Boolean })
  adminMode = false;

  @property({ type: Array })
  articleCollection: IArticle[] | null = null;

  @property({ type: Boolean })
  loading = true;

  page = 1;

  limit = 4;

  articleRemaining = true;

  firstUpdated() {
    this.updateArticleCollection();
  }

  updated(props: Map<string | number | symbol, unknown>) {
    const oldTags = props.get("tags");
    if (oldTags instanceof Array && oldTags !== this.tags) {
      this.updateArticleCollection();
    }
  }

  updateArticleCollection() {
    this.getArticleCollection().then(articleCollection => {
      const { collection, total } = articleCollection;
      this.articleCollection = collection;
      this.articleRemaining = total > this.articleCollection.length;
      this.loading = false;
    });
  }

  getArticleCollection(): Promise<ResourceCollection<IArticle>> {
    return this.adminMode
      ? apiClient.get<ResourceCollection<IArticle>>(
          `/api/v1/draft?limit=${this.limit}&page=${this.page}`,
        )
      : apiClient.get<ResourceCollection<IArticle>>(
          `/api/v1/article?limit=${this.limit}&page=${this.page}${this.tags
            .map(tag => "&tags[]=" + tag)
            .toString()
            .replace(",", "")}`,
        );
  }

  deleteArticle(id: string): Promise<void> {
    return apiClient.delete(`/api/v1/article/${id}`);
  }

  stripTagsAndTruncate(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 180);
  }

  async loadMore(): Promise<void> {
    if (!this.articleRemaining) {
      return Promise.reject("All article are already loaded");
    }

    this.loading = true;

    ++this.page;
    const {
      collection,
      total,
    } = (await this.getArticleCollection()) as ResourceCollection<IArticle>;

    this.articleCollection = [
      ...(this.articleCollection as IArticle[]),
      ...collection,
    ];
    this.articleRemaining = total > this.articleCollection.length;
    this.loading = false;
  }

  async removeArticle(article: IArticle) {
    const articleTitle = article.title;
    if (
      prompt("Enter " + articleTitle + " to delete the article") ===
      articleTitle
    ) {
      try {
        await this.deleteArticle(article._id);
        this.articleCollection = (this.articleCollection || []).filter(
          _article => article._id !== _article._id,
        );
        this.update(new Map());
      } catch (error) {
        errorHandlerService.throwAndRedirect(error);
      }
    }
  }

  articleList() {
    if (!this.articleCollection || this.articleCollection.length === 0) {
      return html`
        <article class="box"><p>C'est vide copain...</p></article>
      `;
    }

    return this.articleCollection.map((article: IArticle) => {
      const articleUri = `/article/${article._id}`;

      return html`
        <article class="card">
          <header class="card-header article-header">
            <p class="card-header-title">
              <span class="article-date">
                ${
                  article.published
                    ? format(
                        new Date(article.publishedAt as string),
                        "dddd DD MMMM YYYY",
                        { locale: frLocale },
                      )
                    : ``
                }
              </span>
              ${tags(article, this.adminMode)}
            </p>
          </header>
          ${
            article.posterUrl
              ? html`
                  <figure
                    class="poster card-image"
                    style="background-image: url('${article.posterUrl}')"
                  ></figure>
                `
              : ``
          }
          <div class="card-content">
            <h3 class="title">${article.title}</h3>
            <p>${this.stripTagsAndTruncate(article.html) + "..."}</p>
          </div>
          <footer class="card-footer">
            <a
              class="card-footer-item"
              href="${articleUri}"
              title="Lire ${article.title}"
              @click="${
                (e: Event) => {
                  e.preventDefault();
                  router.push(
                    `${articleUri}?title=${encodeURIComponent(article.title)}`,
                  );
                }
              }"
            >
              Lire
            </a>
            ${
              this.adminMode
                ? html`
                    <a
                      class="card-footer-item"
                      href="${`/admin/draft?id=${article._id}`}"
                      title="Editer l'article"
                      @click="${
                        (e: Event) => {
                          e.preventDefault();
                          const url = `/admin/draft?id=${
                            article._id
                          }&title=${encodeURIComponent(article.title)}`;
                          router.push(url);
                        }
                      }"
                    >
                      Editer
                    </a>
                    <a
                      class="card-footer-item"
                      type="button"
                      title="Delete article"
                      @click="${this.removeArticle.bind(this, article)}"
                    >
                      Supprimer
                    </a>
                  `
                : html``
            }
          </footer>
        </article>
      `;
    });
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        .uppercase {
          text-transform: uppercase;
        }
        .poster {
          height: 200px;
          background-color: #eee;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .card {
          margin-bottom: 1.5rem;
        }
        .card:last-child {
          margin-bottom: 0;
        }
        .article-date {
          margin-right: 12px;
          font-weight: 100;
          text-transform: capitalize;
        }
        .card-header-title {
          justify-content: space-between;
        }
        .load-complete {
          width: 24px;
        }
        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .feed-header h4 {
          margin-bottom: 0 !important;
        }
        .feed-header .tag {
          text-transform: capitalize;
        }
        @media screen and (max-width: 600px) {
          .feed .card-header-title {
            align-items: initial;
            flex-direction: column;
          }
          .card-header-title .article-date {
            margin-bottom: 4px;
          }
          .feed.section {
            padding: 2rem 0.8rem;
          }
        }
      </style>
      <section class="section feed">
        <header class="feed-header">
          <h4 class="subtitle uppercase">articles</h4>
          ${
            this.tags.length > 0
              ? html`
                  <span class="tag is-primary is-medium">${this.tags[0]}</span>
                `
              : null
          }
        </header>
        ${
          this.articleCollection
            ? this.articleList()
            : placeholder({
                count: 3,
                minLines: 1,
                maxLines: 3,
                box: true,
                image: true,
              })
        }
        <button
          title="Voir plus"
          class="button is-fullwidth ${this.loading ? "is-loading" : ""}"
          ?disabled="${this.articleRemaining ? false : true}"
          @click="${this.loadMore}"
        >
          ${
            this.articleRemaining
              ? "Voir plus"
              : html`
                  <span class="load-complete">${check}</span>
                `
          }
        </button>
      </section>
    `;
  }
}

customElements.define("ez-article-feed", ArticleFeed);
