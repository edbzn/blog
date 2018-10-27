import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

import router from "../../app-router";
import _fetch from "../utils/fetch";
import { showPlaceholder } from "./placeholder";
import { showError } from "../utils/show-error";
import { property, LitElement } from "@polymer/lit-element";
import { IArticle } from "../core/admin/types";
import { apiClient } from "../utils/api";

export default class ArticleFeed extends LitElement {
  @property({ type: Boolean })
  adminMode = false;

  articleList: IArticle[] = [];

  async getArticleList(): Promise<IArticle[]> {
    return apiClient.get<IArticle[]>(`/api/v1/article`);
  }

  async deleteArticle(id: string): Promise<void> {
    return apiClient.delete(`/api/v1/article/${id}`);
  }

  async removeArticle(article: IArticle) {
    const articleTitle = article.title.toLocaleLowerCase();
    if (
      prompt("Enter " + articleTitle + " to delete the article") ===
      articleTitle
    ) {
      try {
        await this.deleteArticle(article._id);
        this.articleList = this.articleList.filter(
          _article => article._id !== _article._id,
        );
        this.update(new Map());
      } catch (error) {
        showError(error);
      }
    }
  }

  showArticleList(): TemplateResult | TemplateResult[] {
    if (this.articleList.length === 0) {
      return html`
        <article class="box">
          <p>It's empty dude...</p>
        </article>
    `;
    }

    return this.articleList.map((article: IArticle) => {
      const articleUri = `/article/${article._id}`;

      return html`
        <article class="card">
          <header class="card-header">
            <p class="card-header-title">${article.tags.map(
              (tag: string) =>
                html`<span class="article-tag tag is-dark">${tag}</span>`,
            )}</p>
          </header>
          ${
            article.posterUrl
              ? html`
                  <figure class="poster card-image"
                    style="background: url('${article.posterUrl}') center">
                  </figure>`
              : html``
          }
          <div class="card-content">
            <h3 class="title">${article.title}</h3>
            <p>${unsafeHTML(article.content.slice(0, 80) + "...")}</p>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item"
              href=${articleUri}
              title="Read article"
              @click=${(e: Event) => {
                e.preventDefault();
                router.push(articleUri);
              }}>
              Read
            </a>
            ${
              this.adminMode
                ? html`
                  <a class="card-footer-item"
                    href=${`/admin/draft?id=${article._id}`}
                    title="Edit article"
                    @click=${(e: Event) => {
                      e.preventDefault();
                      router.push(`/admin/draft?id=${article._id}`);
                    }}>
                    Edit
                  </a>
                  <a href 
                    class="card-footer-item"
                    type="button"
                    title="Delete article"
                    @click=${this.removeArticle.bind(this, article)}>
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
    <link href="assets/css/bulma.min.css" rel="stylesheet">
    <style>
      .uppercase { text-transform: uppercase; }
      .poster {
        height: 200px;
        background-color: #eee;
        background-size: cover;
      }
      .card {
        margin-bottom: 1.5rem;
      }
      .card:last-child {
        margin-bottom: 0;
      }
      .article-tag {
        margin-right: 4px;
      }
      .article-tag:last-child {
        margin-right: 0;
      }
    </style>
    <section class="section">
      <h4 class="subtitle uppercase">articles</h4>
      ${until(
        this.getArticleList().then(articleList => {
          this.articleList = articleList;
          return this.showArticleList();
        }),
        showPlaceholder(4),
      )}
    </section>
  `;
  }
}
