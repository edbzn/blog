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
      border: 2px solid #eee;
      line-height: 22px;
      color: #222;
      text-decoration: none;
      transition: 150ms ease;
    }

    .tag:hover {
      border: 2px solid #eee;
      background: #fff;
    }

    .tag:before {
      content: '#';
    }

    .is-primary {
      background: #a7ffb6;
      border-color: #a7ffb6;
    }

    .is-primary:hover {
      border-color: #a7ffb6;
    }

    .is-warning {
      background: #fffea7;
      border-color: #fffea7;
    }

    .is-warning:hover {
      border-color: #fffea7;
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
