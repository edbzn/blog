import { html, LitElement, property } from 'lit-element';
import { format } from 'date-fns';
import * as frLocale from 'date-fns/locale/fr';

import { ResourceCollection } from '../../utils/collection';
import { apiClient } from '../api-client';
import { IComment } from './types';

export default class ArticleCommentComponent extends LitElement {
  @property({ type: String })
  articleId: string | null = null;

  commentCollection: ResourceCollection<IComment> | null = null;

  showEditor = false;

  loading = true;

  error: string | null = null;

  firstUpdated() {
    this.fetch();
  }

  async fetch(): Promise<void> {
    const commentCollection = await apiClient.get<ResourceCollection<IComment>>(
      `/api/v1/article/${this.articleId}/comment`,
    );

    this.commentCollection = commentCollection;
    this.loading = false;
    this.requestUpdate();
  }

  isFormValid(): boolean {
    if (!this.showEditor) {
      return false;
    }

    const nameCtrl = this.shadowRoot!.querySelector(
      "#name",
    ) as HTMLInputElement;
    const commentCtrl = this.shadowRoot!.querySelector(
      "#comment",
    ) as HTMLTextAreaElement;

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

    const name = (this.shadowRoot!.querySelector("#name") as HTMLInputElement)
      .value;
    const comment = (this.shadowRoot!.querySelector(
      "#comment",
    ) as HTMLTextAreaElement).value;
    const formData = { author: name, comment, articleId: this.articleId };

    apiClient
      .post<ResourceCollection<IComment>>(
        `/api/v1/article/${this.articleId}/comment`,
        formData,
      )
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

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        :host {
          display: block;
          margin-top: 0.6rem;
          margin-bottom: 4rem;
        }

        form[name="postComment"] {
          font-size: 1rem;
          margin: 2rem 0;
        }

        .button {
          width: 100%;
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
      </style>
      <div>
        <button
          type="button"
          class="button is-primary is-block"
          @click="${
            () => {
              this.showEditor = !this.showEditor;
              this.requestUpdate();

              if (this.showEditor) {
                (this.shadowRoot!.querySelector(
                  "#name",
                ) as HTMLInputElement).focus();
              }
            }
          }"
        >
          ${
            !this.showEditor
              ? html`
                  Ajouter un commentaire
                `
              : html`
                  Annuler
                `
          }
        </button>
        ${
          this.showEditor
            ? html`
                <form name="postComment" @submit=${
                  this.postComment
                } @input=${() => this.update(new Map())}>
                  ${
                    this.error
                      ? html`
                          <div class="notification is-danger">
                            <button
                              class="delete"
                              @click="${
                                () => {
                                  this.error = null;
                                  this.requestUpdate();
                                }
                              }"
                            ></button>
                            ${this.error}
                          </div>
                        `
                      : null
                  }
                  <div class="field">
                    <label for="name">Nom</label
                    <div class="control">
                      <input class="input" name="name" id="name" type="text" required />
                    </div>
                  </div>
                  <div class="field">
                    <label for="comment">Commentaire</label
                    <div class="control">
                      <textarea class="textarea ${
                        this.loading
                          ? html`
                              is-loading
                            `
                          : null
                      }" name="comment" id="comment" required></textarea>
                    </div>
                  </div>
                  <button type="submit" ?disabled=${!this.isFormValid()} class="button">Commenter</button>
                </form>
              `
            : null
        }
        <section class="comments">
        ${
          this.commentCollection !== null
            ? this.commentCollection.collection.map(
                comment => html`
                  <article class="message">
                    <div class="message-body is-dark">
                      <header>
                        <strong>${comment.author}</strong>
                        <em>
                          -
                          ${
                            format(new Date(comment.createdAt), "ddd DD MMM YYYY",{
                              locale: frLocale,
                            })
                          }
                        </em>
                      </header>
                      ${comment.comment}
                    </div>
                  </article>
                `,
              )
            : null
        }
        </section>
      </div>
    `;
  }
}

customElements.define("ez-comment", ArticleCommentComponent);
