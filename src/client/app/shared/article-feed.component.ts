import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../app-router";
import { IArticle } from "../core/admin/types";
import { apiClient } from "../core/api";
import { Collection } from "../utils/collection";
import { showError } from "../utils/show-error";
import { placeholder } from "./placeholder";
import { tags } from "./tags";

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
    this.getArticleCollection().then(articleCollection => {
      const { collection, total } = articleCollection;
      this.articleCollection = collection;
      this.articleRemaining = total > this.articleCollection.length;
      this.loading = false;
    });
  }

  getArticleCollection(): Promise<Collection<IArticle>> {
    return this.adminMode
      ? apiClient.get<Collection<IArticle>>(
          `/api/v1/draft?limit=${this.limit}&page=${this.page}`,
        )
      : apiClient.get<Collection<IArticle>>(
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
    } = (await this.getArticleCollection()) as Collection<IArticle>;

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
        showError(error);
      }
    }
  }

  articleList(): TemplateResult | TemplateResult[] {
    if (!this.articleCollection || this.articleCollection.length === 0) {
      return html`
        <article class="box"><p>It's empty dude...</p></article>
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
                    ? new Date(
                        article.publishedAt as string,
                      ).toLocaleDateString()
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
              : html``
          }
          <div class="card-content">
            <h3 class="title">${article.title}</h3>
            <p>${this.stripTagsAndTruncate(article.html) + "..."}</p>
          </div>
          <footer class="card-footer">
            <a
              class="card-footer-item"
              href="${articleUri}"
              title="Read ${article.title}"
              @click="${
                (e: Event) => {
                  e.preventDefault();
                  router.push(articleUri);
                }
              }"
            >
              Read
            </a>
            ${
              this.adminMode
                ? html`
                    <a
                      class="card-footer-item"
                      href="${`/admin/draft?id=${article._id}`}"
                      title="Edit article"
                      @click="${
                        (e: Event) => {
                          e.preventDefault();
                          router.push(`/admin/draft?id=${article._id}`);
                        }
                      }"
                    >
                      Edit
                    </a>
                    <a
                      class="card-footer-item"
                      type="button"
                      title="Delete article"
                      @click="${this.removeArticle.bind(this, article)}"
                    >
                      Delete
                    </a>
                  `
                : html``
            }
          </footer>
        </article>
      `;
    });
  }

  render(): TemplateResult {
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
        }
        .card-header-title {
          justify-content: space-between;
        }
      </style>
      <section class="section">
        <h4 class="subtitle uppercase">articles</h4>
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
          title="Load more articles"
          class="button is-fullwidth ${this.loading ? "is-loading" : ""}"
          .disabled="${this.articleRemaining ? false : true}"
          @click="${this.loadMore}"
        >
          ${this.articleRemaining ? "View more" : "All stuff loaded"}
        </button>
      </section>
    `;
  }
}
