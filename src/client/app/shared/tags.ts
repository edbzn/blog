import { html } from 'lit-element';

import { Article } from '../components/admin/types';
import { navigate } from '../utils/navigate';

export const tags = (article: Article, adminMode = false) => html`
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
    ${article.tags.map(
      (tag: string) =>
        html`
          <a
            href="/tag/${tag}"
            ?title=${tag + ' articles'}
            @click="${navigate(`/tag/${tag}`)}"
            class="article-tag tag is-light"
          >
            ${tag}
          </a>
        `
    )}
    ${adminMode
      ? html`
          <span class="article-tag tag ${article.published ? 'is-primary' : 'is-warning'}">
            ${article.published ? 'published' : 'draft'}
          </span>
        `
      : ``}
  </span>
`;
