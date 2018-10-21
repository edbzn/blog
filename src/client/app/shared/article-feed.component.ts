import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

import router from "../../app-router";
import _fetch from "../utils/fetch";
import { showPlaceholder } from "./placeholder";
import { showError } from "../utils/show-error";
import { property, LitElement } from "@polymer/lit-element";

const deleteArticle = async (id: string): Promise<void> => {
  const resp = await _fetch(`http://localhost:8081/api/v1/article/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "default",
  });

  return resp.json();
};

export default class ArticleFeed extends LitElement {
  @property({ type: Boolean })
  adminMode = false;

  articleList: any[] = [];

  async getArticleList(): Promise<any[]> {
    const resp = await _fetch(`http://localhost:8081/api/v1/article`, {
      method: "GET",
      mode: "cors",
      cache: "default",
    });

    return resp.json();
  }

  async removeArticle(article: any) {
    const articleTitle = article.title.toLocaleLowerCase();
    if (
      prompt("Enter " + articleTitle + " to delete the article") ===
      articleTitle
    ) {
      try {
        await deleteArticle(article._id);
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
        <article>
          <p>It's empty dude...</p>
        </article>
    `;
    }

    return this.articleList.map((article: any) => {
      const articleUri = `/article/${article._id}`;

      return html`
      <article class="article">
        ${
          article.posterUrl
            ? html`<div class="poster" style="background-image: url('${
                article.posterUrl
              }')"></div>`
            : html``
        }
        <ul>
          ${article.tags.map((tag: any) => html`<li>${tag}</li>`)}
        </ul>
        <h2>${article.title}</h2>
        <p>${unsafeHTML(article.content.slice(0, 80) + "...")}</p>
        
        <a href=${articleUri}
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
              <a href=${`/admin/draft?id=${article._id}`}
                title="Edit article"
                @click=${(e: Event) => {
                  e.preventDefault();
                  router.push(`/admin/draft?id=${article._id}`);
                }}>
                Edit
              </a>
              <button type="button"
                title="Delete article"
                @click=${this.removeArticle.bind(this, article)}>
                Delete
              </button>
            `
            : html``
        }
      </article>
    `;
    });
  }

  render(): TemplateResult {
    return html`
    <style scoped>
      .article-feed {
        padding-top: 40px;
        margin-top: 40px;
        border-top: 2px solid #f8f8f8;
      }

      .article {
        padding: 1.4rem;
        margin-bottom: 4px;
        background: #f8f8f8;
        border-radius: 2px;
        color: #585858;
      }

      .poster {
        height: 200px;
        background-position: center center;
        background-size: cover;
      }
    </style>
    <section class="article-feed">
      <h4>ARTICLES</h4>
      ${until(
        this.getArticleList().then(articleList => {
          this.articleList = articleList;
          return this.showArticleList();
        }),
        showPlaceholder(9),
      )}
    </section>
  `;
  }
}
