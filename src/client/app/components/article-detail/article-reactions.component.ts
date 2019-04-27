import { css, html, LitElement, property } from 'lit-element';

import { Article } from '../admin/types';

export default class ArticleReactionsComponent extends LitElement {
  @property({ type: Object })
  article: Article | null = null;

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .reactions {
        display: flex;
        justify-content: space-around;
        padding: 18px 0;
        margin-bottom: 3rem;
      }

      .reaction {
        display: flex;
        align-items: center;
      }

      .reaction img {
        width: 28px;
        display: block;
        border-radius: 50%;
      }

      .count {
        margin-left: 8px;
      }

      .button {
        padding: 12px;
        width: 84px;
        height: 54px;
      }
    `;
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <section class="reactions">
        ${Object.entries(this.article!.reactions.types).map(
          ([type, reaction]) => html`
            <div class="reaction">
              <button class="button is-rounded" type="button is-large">
                <img src="/assets/images/${type}.png" />
                <span class="count">${reaction.count}</span>
              </button>
            </div>
          `
        )}
      </section>
    `;
  }
}

customElements.define('ez-article-reactions', ArticleReactionsComponent);
