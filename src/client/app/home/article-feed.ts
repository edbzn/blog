import { html } from "lit-html";

async function getArticleList(): Promise<any> {
  const resp = await fetch(`http://localhost:8081/api/v1/article`, {
    method: "GET",
    mode: "cors",
    cache: "default",
  });

  return resp.json();
}

const showArticleList = (resp: any) => {
  if (resp.length === 0) {
    return html`
      <article>
        <p>wip</p>
      </article>
    `;
  }

  return resp.map(
    (article: any) => html`
      <article>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
      </article>
    `,
  );
};

export const articleFeed = async () => {
  const resp = await getArticleList();

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
      ${showArticleList(resp)}
    </section>
  `;
};
