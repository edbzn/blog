import { html } from 'lit-element';

import { Article } from '../components/admin/types';
import { navigate } from '../utils/navigate';

export const tags = (article: Article, adminMode = false) => html`
  <style>
    .tag {
      margin-right: 4px;
      text-transform: capitalize;
      font-family: 'IBM Plex Sans', sans-serif;
      display: inline-block;
      background: #eee;
      font-size: 0.74rem;
      padding: 0px 4px;
      border-radius: 6px;
      border: 1px solid #eee;
      line-height: 22px;
      color: #222;
      text-decoration: none;
      transition: 150ms ease;
    }

    .tag:before {
      content: '#';
    }

    .tag:hover {
      border: 1px solid #eee;
      background: #fff;
    }

    .tag:last-child {
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
            class="tag is-light"
          >
            ${tag}
          </a>
        `
    )}
    ${adminMode
      ? html`
          <span class="tag ${article.published ? 'is-primary' : 'is-warning'}">
            ${article.published ? 'published' : 'draft'}
          </span>
        `
      : ``}
  </span>
`;