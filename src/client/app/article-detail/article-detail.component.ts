import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";

import { showPlaceholder } from "../home/placeholder.component";

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  id: string;

  getArticle = async (id: string): Promise<any> => {
    const resp = await fetch(`http://localhost:8081/api/v1/article/${id}`, {
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
          ${until(this.getArticle(this.id).then((resp: any) => html`${resp}`), showPlaceholder(3))}
        </section>
      </ez-page>
    `;
  }
}
