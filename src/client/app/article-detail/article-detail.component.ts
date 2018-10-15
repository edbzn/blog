import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";

import { showPlaceholder } from "../home/placeholder.component";
import { ArticleDocument } from "../../../server/api/article/model/article.model";

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  id: string;

  getArticle = async (): Promise<ArticleDocument> => {
    const resp = await fetch(`http://localhost:8081/api/v1/article/${this.id}`, {
      method: "GET",
      mode: "cors",
      cache: "default",
    });

    return resp.json();
  };

  render(): TemplateResult {
    return html`
      <style scoped>
        :host {
          display: block;
        }
      </style>
      <ez-page>
        <style scoped>
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
        <section class="article">
          ${until(
            this.getArticle()
              .then((resp: ArticleDocument) => html`
                <h1>${resp.title}</h1>
                ${resp.content}
              `),
            showPlaceholder(10),
          )}
        </section>
      </ez-page>
    `;
  }
}
