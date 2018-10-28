import { IArticle } from "../core/admin/types";
import { html } from "lit-html";

export const tags = (article: IArticle) => html`
    <style>
      .article-tag {
        margin-right: 4px;
        text-transform: capitalize;
      }
      .article-tag:last-child {
        margin-right: 0;
      }
    </style>
    <span>${article.tags.map(
      (tag: string) =>
        html`<span class="article-tag tag is-light">${tag}</span>`,
    )}
    </span>`;
