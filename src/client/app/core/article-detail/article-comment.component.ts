import { html, TemplateResult } from "lit-html";
import { LitElement, property } from "@polymer/lit-element";
import { IComment } from "./types";
import { apiClient } from "../api";
import { ResourceCollection } from "../../utils/collection";

export class ArticleCommentComponent extends LitElement {
  @property({ type: String })
  articleId: string | null = null;

  commentCollection: ResourceCollection<IComment> | null = null;

  showEditor = false;

  firstUpdated() {
    this.fetch();
  }

  fetch(): void {
    apiClient
      .get<ResourceCollection<IComment>>(
        `/api/v1/article/${this.articleId}/comment`,
      )
      .then(commentCollection => {
        this.commentCollection = commentCollection;
      });
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

  postComment(event: Event) {
    event.preventDefault();
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
      .then(commentCollection => {
        this.commentCollection = commentCollection;
      });
  }

  render(): TemplateResult {
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
      </style>
      <div>
        <button
          type="button"
          class="button is-primary is-block"
          @click="${
            () => {
              this.showEditor = !this.showEditor;
              this.update(new Map());

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
                  <div class="field">
                    <label for="name">Nom</label
                    <div class="control">
                      <input class="input" name="name" id="name" type="text" required />
                    </div>
                  </div>
                  <div class="field">
                    <label for="comment">Commentaire</label
                    <div class="control">
                      <textarea class="textarea" name="comment" id="comment" required></textarea>
                    </div>
                  </div>
                  <button type="submit" ?disabled=${!this.isFormValid()} class="button">Commenter</button>
                </form>
              `
            : null
        }
        ${
          this.commentCollection !== null
            ? this.commentCollection.collection.map(
                comment => html`
                  ${comment.createdAt} ${comment.author} ${comment.text}
                `,
              )
            : null
        }
      </div>
    `;
  }
}

customElements.define("ez-comment", ArticleCommentComponent);
