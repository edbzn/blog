import { css, html, LitElement, property } from 'lit-element';
import { nothing } from 'lit-html';

import { apiClient, errorHandlerService } from '../../core/services';
import { Article } from '../admin/types';

type ReactionType = 'heart' | 'unicorn' | 'mark';

const createReactionKey = (article: Article, reaction: ReactionType): string =>
  'reaction_' + article._id + '_' + reaction;

const isAllowed = (article: Article, reaction: ReactionType): boolean =>
  localStorage.getItem(createReactionKey(article, reaction)) === null;

const disallow = (article: Article, reaction: ReactionType): void =>
  localStorage.setItem(createReactionKey(article, reaction), '1');

export default class ArticleReactionsComponent extends LitElement {
  @property({ type: Object })
  article: Article;

  @property({ type: Object })
  allowed: { [key in ReactionType]: boolean } = {
    heart: false,
    unicorn: false,
    mark: false,
  };

  firstUpdated() {
    this.allowed = {
      heart: isAllowed(this.article, 'heart'),
      unicorn: isAllowed(this.article, 'unicorn'),
      mark: isAllowed(this.article, 'mark'),
    };
  }

  async addReaction(reaction: ReactionType): Promise<void> {
    if (!isAllowed(this.article, reaction)) {
      return;
    }

    try {
      await apiClient.post<ReactionType>(`/api/v1/article/${this.article._id}/reaction`, {
        reaction,
      });
      disallow(this.article, reaction);
      this.allowed = { ...this.allowed, [reaction]: false };
      this.article.reactions.types[reaction].count = ++this.article.reactions.types[reaction].count;
      this.requestUpdate();
    } catch (error) {
      errorHandlerService.throw(error);
    }
  }

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
        font-weight: 800;
        padding: 12px;
        width: 84px;
        height: 54px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 20px;
        color: #222;
        text-align: center;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      <section class="reactions">
        ${Object.entries(this.article!.reactions.types).map(
          ([type, reaction]) => html`
            <div class="reaction">
              <button
                .disabled="${!this.allowed[<ReactionType>type]}"
                class="button ${!this.allowed[<ReactionType>type]
                  ? 'is-primary'
                  : nothing} is-rounded"
                type="button is-large"
                @click="${() => this.addReaction(type as ReactionType)}"
              >
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
