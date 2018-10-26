import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";

import { showPlaceholder } from "../../shared/placeholder";
import _fetch from "../../utils/fetch";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { IArticle } from "../admin/types";
import { apiClient } from "../../utils/api";

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  id: string;

  async getArticle(): Promise<IArticle> {
    return apiClient.get<IArticle>(`/api/v1/article/${this.id}`);
  }

  showArticleDetail(article: IArticle): TemplateResult {
    const nothing = html``;
    const poster = html`
      <div class="poster"
        style="background: url('${article.posterUrl}') center cover">
      </div>`;

    return html`
      <header>
        ${article.posterUrl ? poster : nothing}
      </header>
      <h1>${article.title}</h1>
      ${unsafeHTML(article.content)}
      <footer>By Edouard Bozon at ${article.createdAt}</footer
    `;
  }

  render(): TemplateResult {
    return html`
      <style scoped>
        :host {
          display: block;
        }
        
        .article-feed {
          padding-top: 40px;
          margin-top: 40px;
          border-top: 2px solid #f8f8f8;
        }

        article {
          margin-bottom: 4px;
          background: #f8f8f8;
          border-radius: 2px;
          color: #585858;
        }
      </style>
      <ez-page>
        <section class="article">
          ${until(
            this.getArticle().then(this.showArticleDetail),
            showPlaceholder(10),
          )}
        </section>
      </ez-page>
    `;
  }
}
