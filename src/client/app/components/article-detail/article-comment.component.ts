import { format } from 'date-fns';
import * as frLocale from 'date-fns/locale/fr';
import { css, html, LitElement, property } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';
import { apiClient } from '../../core/services/api-client';
import { ResourceCollection } from '../../utils/collection';
import { Comment } from './types';

export default class ArticleCommentComponent extends LitElement {
  @property({ type: String })
  articleId: string | null = null;

  commentCollection: ResourceCollection<Comment> | null = null;

  showEditor = false;

  loading = true;

  error: string | null = null;

  firstUpdated() {
    this.fetch();
  }

  async fetch(): Promise<void> {
    const commentCollection = await apiClient.get<ResourceCollection<Comment>>(
      `/api/v1/article/${this.articleId}/comment`
    );

    this.commentCollection = commentCollection;
    this.loading = false;
    this.requestUpdate();
  }

  isFormValid(): boolean {
    if (!this.showEditor) {
      return false;
    }

    const nameCtrl = this.shadowRoot!.querySelector('#name') as HTMLInputElement;
    const commentCtrl = this.shadowRoot!.querySelector('#comment') as HTMLTextAreaElement;

    if (!nameCtrl || !commentCtrl) {
      return false;
    }

    const name = nameCtrl.value;
    const comment = commentCtrl.value;

    return !!name && !!comment;
  }

  postComment(event: Event): void {
    event.preventDefault();
    this.loading = true;
    this.requestUpdate();

    const name = (this.shadowRoot!.querySelector('#name') as HTMLInputElement).value;
    const comment = (this.shadowRoot!.querySelector('#comment') as HTMLTextAreaElement).value;
    const formData = { author: name, comment, articleId: this.articleId };

    apiClient
      .post<ResourceCollection<Comment>>(`/api/v1/article/${this.articleId}/comment`, formData)
      .then(() => this.fetch())
      .then(() => {
        this.showEditor = false;
        this.loading = false;
        this.requestUpdate();
      })
      .catch(err => {
        this.error = err.message ? err.message : err;
        this.loading = false;
        this.requestUpdate();
      });
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-top: 0.6rem;
        margin-bottom: 3rem;
      }

      form[name='postComment'] {
        font-size: 1rem;
        margin: 2rem 0;
      }

      .button {
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        color: #222;
        text-decoration: none;
        text-align: center;
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        margin-top: 10px;
        border: 1px solid #eee;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        color: #222;
        font-size: 0.8rem;
        transition: 150ms ease;
      }

      .button:hover {
        background: #eee;
      }

      .button:focus {
        outline: none;
        border: 2px solid #eee;
      }

      .comments {
        margin-top: 2rem;
        font-size: 1rem;
      }

      .message header em {
        font-weight: 100;
        font-size: 14px;
        text-transform: capitalize;
      }
    `;
  }

  render() {
    return html`
      <div>
        <button
          type="button"
          class="button is-primary is-block"
          @click="${() => {
            this.showEditor = !this.showEditor;
            this.requestUpdate();
          }}"
        >
          ${!this.showEditor
            ? translate('article_detail.leave_comment_btn')
            : translate('article_detail.stop_comment_btn')}
        </button>
        ${this.showEditor
          ? html`
              <form
                name="postComment"
                @submit=${this.postComment}
                @input=${() => this.update(new Map())}
              >
                ${this.error
                  ? html`
                      <div class="notification is-danger">
                        <button
                          class="delete"
                          @click="${() => {
                            this.error = null;
                            this.requestUpdate();
                          }}"
                        ></button>
                        ${this.error}
                      </div>
                    `
                  : null}
                <div class="field">
                  <label for="name">${translate('article_detail.name_label')}</label>
                  <div class="control">
                    <input class="input" name="name" id="name" type="text" required />
                  </div>
                </div>
                <div class="field">
                  <label for="comment">${translate('article_detail.comment_label')}</label>
                  <div class="control">
                    <textarea
                      class="textarea ${this.loading
                        ? html`
                            is-loading
                          `
                        : null}"
                      name="comment"
                      id="comment"
                      required
                    ></textarea>
                  </div>
                </div>
                <button type="submit" ?disabled=${!this.isFormValid()} class="button">
                  ${translate('article_detail.comment_btn')}
                </button>
              </form>
            `
          : null}
        <section class="comments">
          ${this.commentCollection !== null
            ? this.commentCollection.collection.map(
                comment => html`
                  <article class="message">
                    <div class="message-body is-dark">
                      <header>
                        <strong>${comment.author}</strong>
                        <em>
                          -
                          ${format(new Date(comment.createdAt), 'ddd DD MMM YYYY', {
                            locale: frLocale,
                          })}
                        </em>
                      </header>
                      ${comment.comment}
                    </div>
                  </article>
                `
              )
            : null}
        </section>
      </div>
    `;
  }
}

customElements.define('ez-article-comments', ArticleCommentComponent);
