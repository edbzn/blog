import { IArticle } from "../core/admin/types";
import { html } from "lit-html";
import router from "../../app-router";

export const tags = (article: IArticle, adminMode = false) => html`
  <style>
    .article-tag {
      margin-right: 4px;
      text-transform: capitalize;
    }
    .article-tag:last-child {
      margin-right: 0;
    }
    .tag-wrapper {
      line-height: 28px;
    }
  </style>
  <span class="tag-wrapper">
    ${
      article.tags.map(
        (tag: string) =>
          html`
            <a
              href="/tag/${tag}"
              ?title=${tag + ' articles'}
              @click="${
                (e: Event) => {
                  e.preventDefault();
                  router.push(`/tag/${tag}`);
                }
              }"
              class="article-tag tag is-light"
            >
              ${tag}
            </a>
          `,
      )
    }
    ${
      adminMode
        ? html`
            <span
              class="article-tag tag ${
                article.published ? "is-primary" : "is-warning"
              }"
            >
              ${article.published ? "published" : "draft"}
            </span>
          `
        : ``
    }
  </span>
`;
