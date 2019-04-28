import { css, html, LitElement, property } from 'lit-element';

import { ReactionType } from '../../../../server/api/article/model/article-reactions';
import { apiClient, errorHandlerService } from '../../core/services';
import { Article } from '../admin/types';

const createReactionKey = (article: Article, reaction: ReactionType) =>
  'reaction_' + article._id + '_' + reaction;

const allowed = (article: Article, reaction: ReactionType) =>
  localStorage.getItem(createReactionKey(article, reaction)) === null;

const disallow = (article: Article, reaction: ReactionType) =>
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
      heart: allowed(this.article, 'heart'),
      unicorn: allowed(this.article, 'unicorn'),
      mark: allowed(this.article, 'mark'),
    };
  }

  async addReaction(reaction: ReactionType): Promise<void> {
    if (!allowed(this.article, reaction)) {
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
      }
    `;
  }

  render() {
    return html`
      <link href="assets/css/bulma.css" rel="stylesheet" />
      <section class="reactions">
        ${Object.entries(this.article!.reactions.types).map(
          ([type, reaction]) => html`
            <div class="reaction">
              <button
                .disabled="${!this.allowed[<ReactionType>type]}"
                class="button ${!this.allowed[<ReactionType>type] ? 'is-primary' : ''} is-rounded"
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
