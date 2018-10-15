import { html } from "lit-html";
import { until } from "lit-html/directives/until";

import router from "../../app-router";
import { showPlaceholder } from "./placeholder.component";
import { ArticleDocument } from "../../../server/api/article/model/article.model";

const getArticleList = async (): Promise<ArticleDocument[]> => {
  const resp = await fetch(`http://localhost:8081/api/v1/article`, {
    method: "GET",
    mode: "cors",
    cache: "default",
  });

  return resp.json();
};

const showArticleList = (resp: ArticleDocument[]) => {
  if (resp.length === 0) {
    return html`
      <article>
        <p>It's empty dude...</p>
      </article>
    `;
  }

  return resp.map((article: ArticleDocument) => {
    const articleUri = `/article/${article._id}`;

    return html`
      <article>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
        <a href=${articleUri}
          title="Read article"
          @click=${(e: Event) => {
            e.preventDefault();

            router.push(articleUri);
          }}>
          Read
        </a>
      </article>
    `;
  });
};

export const articleFeed = () => {
  return html`
    <style scoped>
      .article-feed {
        padding-top: 40px;
        margin-top: 40px;
        border-top: 2px solid #f8f8f8;
      }

      article {
        padding: 1.4rem;
        margin-bottom: 4px;
        background: #f8f8f8;
        border-radius: 2px;
        color: #585858;
      }
    </style>
    <section class="article-feed">
      <h4>ARTICLES</h4>
      ${until(
        getArticleList().then(resp => showArticleList(resp)),
        showPlaceholder(2),
      )}
    </section>
  `;
};
