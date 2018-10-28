import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";
import { until } from "lit-html/directives/until";

import { showPlaceholder } from "../../shared/placeholder";
import _fetch from "../../utils/fetch";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { IArticle } from "../admin/types";
import { apiClient } from "../../utils/api";
import { timeSince } from "../../utils/time-since";
import { tags } from "../../shared/tags";

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  id: string;

  @property({ type: String })
  posterUrl: string | null = null;

  getArticle(): Promise<IArticle> {
    return apiClient.get<IArticle>(`/api/v1/article/${this.id}`);
  }

  showArticleDetail(article: IArticle): TemplateResult {
    return html`
      <article class="content is-medium">
        <header class="header">
          ${tags(article)}
          <small>
            Published ${timeSince(new Date(article.publishedAt as string))} ago
          </small>
        </header>
        <h1 class="title">${article.title}</h1>
        <div>${unsafeHTML(article.content)}</div>
        <footer>
          By Edouard Bozon - Published ${timeSince(
            new Date(article.publishedAt as string),
          )} ago
        </footer>
      </article>
    `;
  }

  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet">
      <style>
        :host {
          display: block;
        }

        .poster {
          height: 50vh;
          background-color: #eee;
          background-size: cover;
          background-position: center center;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header .tag {
          margin-right: 4px;
        }

        .header .tag:last-child {
          margin-right: 0;
        }
      </style>
      <ez-navbar></ez-navbar>
      <figure class="poster"
        style="background-image: url('${this.posterUrl}')">
      </figure>
      <ez-page .navbar=${false}>
        <section class="section">
          ${until(
            this.getArticle().then(article => {
              this.posterUrl = article.posterUrl;
              return this.showArticleDetail(article);
            }),
            showPlaceholder({
              count: 1,
              minLines: 30,
              maxLines: 50,
              box: false,
              image: false,
            }),
          )}
        </section>
      </ez-page>
    `;
  }
}
