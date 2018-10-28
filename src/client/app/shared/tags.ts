import { IArticle } from "../core/admin/types";
import { html } from "lit-html";

export const tags = (article: IArticle, adminMode = false) => html`
    <style>
      .article-tag {
        margin-right: 4px;
        text-transform: capitalize;
      }
      .article-tag:last-child {
        margin-right: 0;
      }
    </style>
    <span>
      ${article.tags.map(
        (tag: string) =>
          html`<span class="article-tag tag is-light">${tag}</span>`,
      )}
      ${
        adminMode
          ? html`<span class="article-tag tag ${
              article.published ? "is-primary" : "is-warning"
            }">
              ${article.published ? "published" : "draft"}
            </span>`
          : ``
      }
    </span>`;
