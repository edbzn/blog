import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";

import { ArticleDocument } from "../../../../server/api/article/model/article.model";
import { showPlaceholder } from "../../shared/placeholder";
import _fetch from "../../utils/fetch";

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  id: string;

  async getArticle(): Promise<ArticleDocument> {
    const resp = await _fetch(
      `http://localhost:8081/api/v1/article/${this.id}`,
      {
        method: "GET",
        mode: "cors",
        cache: "default",
      },
    );

    return resp.json();
  }

  showArticleDetail(article: ArticleDocument): TemplateResult {
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
      ${article.content}
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
