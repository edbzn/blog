import { css, html, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import { connect } from 'pwa-helpers';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, take } from 'rxjs/operators';

import { ArticleLanguage } from '../../../../server/api/article/model/article-language';
import { errorHandlerService } from '../../core/services/error-handler-service';
import { AppState } from '../../core/store/state';
import { store } from '../../core/store/store';
import { slugify } from '../../shared/slugify';
import { navigate } from '../../utils/navigate';
import { DraftState } from './store/admin.state';
import { clearDraft, createDraft, updateDraft } from './store/api.actions';
import {
  dePublish,
  editLang,
  editMarkdown,
  editMetaDescription,
  editMetaTitle,
  editSlug,
  editTags,
  editTitle,
  loadEditor,
  publish,
} from './store/editor.actions';
import { Article } from './types';
import { buttonStyle } from '../../shared/button';

export default class DraftComponent extends connect(store)(LitElement) {
  markdownChangeSubject = new Subject<string>();
  markdownChangeSub: Subscription;

  updateChangeSubject = new Subject<void>();
  updateChangeSub: Subscription;

  stateSubject = new Subject<DraftState>();
  state$ = this.stateSubject.asObservable();
  state: DraftState;

  stateChanged(state: AppState) {
    this.state = state.admin;
    this.stateSubject.next(state.admin);
    this.requestUpdate('state');
  }

  firstUpdated() {
    if (this.isDraft()) {
      store.dispatch(
        loadEditor(this.shadowRoot!.getElementById('markdown') as HTMLTextAreaElement, '')
      );
    } else {
      this.state$
        .pipe(
          filter(state => !state.loading),
          take(1),
          delay(1) // wait rendering
        )
        .subscribe(state => {
          store.dispatch(
            loadEditor(
              this.shadowRoot!.getElementById('markdown') as HTMLTextAreaElement,
              state.draft.markdown
            )
          );
        });
    }

    this.markdownChangeSub = this.markdownChangeSubject
      .asObservable()
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(markdown => {
        store.dispatch(editMarkdown(markdown));
        this.updateChangeSubject.next();
      });

    this.updateChangeSub = this.updateChangeSubject
      .asObservable()
      .pipe(debounceTime(300))
      .subscribe(() => {
        const { draft } = this.state;
        this.isDraft()
          ? store.dispatch(createDraft(draft))
          : store.dispatch(updateDraft(draft as Article));
      });
  }

  disconnectedCallback(): void {
    this.markdownChangeSub.unsubscribe();
    this.updateChangeSub.unsubscribe();
    store.dispatch(clearDraft());
  }

  isDraft(): boolean {
    return typeof this.state.id !== 'string';
  }

  handleMarkdownChange(e: Event): void {
    e.preventDefault();
    this.markdownChangeSubject.next(this.state.editor!.value());
  }

  handleFile(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0)!;
      const { id } = this.state;
      const { slug } = this.state.draft;

      try {
        // await this.actions.uploadPoster(slug, file);
        // await this.actions.update(id!, this.getDraft() as Article);
      } catch (error) {
        errorHandlerService.throw(error);
      }
    }
  }

  togglePublish(e: Event) {
    const { draft } = this.state;

    if (draft.published) {
      store.dispatch(dePublish());
    } else {
      store.dispatch(publish());
    }

    this.updateChangeSubject.next();
  }

  handleTagsChange(e: Event): void {
    store.dispatch(editTags((e.target as HTMLInputElement).value));
    this.updateChangeSubject.next();
  }

  handleTitleChange(e: Event): void {
    store.dispatch(editTitle((e.target as HTMLInputElement).value));
    this.updateChangeSubject.next();
  }

  handleMetaTitleChange(e: Event): void {
    store.dispatch(editMetaTitle((e.target as HTMLInputElement).value));
    this.updateChangeSubject.next();
  }

  handleMetaDescriptionChange(e: Event): void {
    store.dispatch(editMetaDescription((e.target as HTMLInputElement).value));
    this.updateChangeSubject.next();
  }

  handleLangChange(e: Event): void {
    store.dispatch(editLang((e.target as HTMLInputElement).value as ArticleLanguage));
    this.updateChangeSubject.next();
  }

  handleSlugChange(e: Event): void {
    store.dispatch(editSlug((e.target as HTMLInputElement).value));
    this.updateChangeSubject.next();
  }

  handleRemovePoster(e: Event): void {
    // this.actions.removePoster();
    this.updateChangeSubject.next();
  }

  static get styles() {
    return [
      buttonStyle,
      css`
        :host {
          display: block;
        }

        .loading {
          padding-top: 5rem;
          text-align: center;
          color: #4f4f4f;
          font-family: 'IBM Plex Sans', Cambria, sans-serif;
        }

        .error {
          padding: 6px 4px;
          background: #dd4646;
          color: #fff;
          border-radius: 4px;
          text-align: center;
        }

        .columns {
          display: flex;
          justify-content: center;
        }

        .is-half {
          width: 50%;
        }

        .is-one-third {
          width: 25%;
          margin-right: 1rem;
        }

        .field {
          margin: 10px 0;
        }

        .field input {
          box-sizing: border-box;
          margin-top: 6px;
          display: block;
          width: 100%;
          padding: 4px;
          border-radius: 2px;
          background: #eee;
          border: 1px solid #888;
        }

        .label {
          font-size: 0.9rem;
        }

        .loading > .loader {
          margin: 0 auto;
          margin-top: 1rem;
        }

        .draft-configuration {
          position: sticky;
          top: 16px;
          margin-top: 26px;
          background: #eee;
          padding: 16px;
          border-radius: 6px;
          font-family: 'IBM Plex Sans', Cambria, sans-serif;
        }

        .poster {
          height: 400px;
          background-position: center center;
          background-size: cover;
          background-color: #eee;
        }

        .right {
          float: right;
        }

        button svg {
          fill: #17a917;
          width: 22px;
          margin-right: 6px;
        }

        .field .button {
          width: 100%;
        }
      `,
    ];
  }

  render() {
    const articleUri = !this.isDraft() ? `/article/${this.state.draft.slug}` : null;
    const { loading } = this.state;

    return html`
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link href="assets/css/simplemde.css" rel="stylesheet" />
      <link href="assets/css/debug-simplemde.css" rel="stylesheet" />

      <ez-navbar></ez-navbar>
      <form @input="${this.handleMarkdownChange}" @change="${this.handleMarkdownChange}">
        ${!loading
          ? html`
              <div>
                ${this.state.draft.posterUrl
                  ? html`
                      <div
                        class="poster"
                        style="background-image: url('${this.state.draft.posterUrl}')"
                      ></div>
                    `
                  : nothing}
                <div class="container">
                  <div class="columns section">
                    <div class="column is-one-third">
                      ${html`
                        <div class="draft-configuration card">
                          <div class="field">
                            <label class="label" for="title">Title</label>
                            <input
                              id="title"
                              name="title"
                              class="input"
                              value="${this.state.draft.title}"
                              @input="${this.handleTitleChange}"
                              type="text"
                              required
                            />
                          </div>
                          <div class="field">
                            <label class="label" for="slug">Slug</label>
                            <input
                              id="slug"
                              name="slug"
                              class="input"
                              value="${this.state.draft.slug || slugify(this.title)}"
                              @input="${this.handleSlugChange}"
                              type="text"
                              required
                            />
                          </div>
                          <div class="field">
                            <label class="label" for="tags">Tags</label>
                            <input
                              type="text"
                              class="input"
                              id="tags"
                              name="tags"
                              placeholder="architecture, test"
                              value="${this.state.draft.tags.toString()}"
                              @input="${this.handleTagsChange}"
                            />
                          </div>
                          <div class="field">
                            <label class="label" for="lang">Lang</label>
                            <div class="control">
                              <div class="select">
                                <select required id="lang" @change="${this.handleLangChange}">
                                  ${[ArticleLanguage.FR, ArticleLanguage.EN].map(
                                    lang => html`
                                      <option
                                        value="${lang}"
                                        ?selected="${lang === this.state.draft.lang}"
                                        >${lang}</option
                                      >
                                    `
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="field">
                            <label class="label" for="poster">Poster</label>
                            <input
                              type="file"
                              id="poster"
                              class="input"
                              value="${this.state.draft.posterUrl}"
                              name="poster"
                              accept="image/png, image/jpeg, image/gif"
                              @input="${this.handleFile}"
                            />
                          </div>
                          <div class="field">
                            <button
                              class="button is-warning"
                              ?disabled=${!this.state.draft.posterUrl}
                              @click="${this.handleRemovePoster}"
                            >
                              Supprimer le poster
                            </button>
                          </div>
                          <div class="field">
                            <label class="label" for="title">Meta title</label>
                            <input
                              id="metaTitle"
                              name="metaTitle"
                              value="${this.state.draft.metaTitle || ''}"
                              @input="${this.handleMetaTitleChange}"
                              class="input"
                              type="text"
                            />
                          </div>
                          <div class="field">
                            <label class="label" for="metaDescription">Meta description</label>
                            <input
                              id="metaDescription"
                              name="metaDescription"
                              @input="${this.handleMetaDescriptionChange}"
                              class="input"
                              value="${this.state.draft.metaDescription || ''}"
                              type="text"
                            />
                          </div>
                          <hr />
                          <div class="field">
                            <button type="submit" class="button is-block">
                              ${this.state.isRequestPending
                                ? html`
                                    ⌛️ Sauvegarde en cours...
                                  `
                                : html`
                                    ✓ Sauvegarder
                                  `}
                            </button>
                          </div>
                          <div class="field">
                            <button
                              type="button"
                              class="button is-block ${this.state.draft.published
                                ? 'is-warning'
                                : 'is-info'}"
                              @click="${this.togglePublish}"
                              ?disabled=${this.isDraft()}
                            >
                              ${this.state.draft.published ? '🔒 Dépublier' : '🔓 Publier'}
                            </button>
                          </div>
                          <div class="field">
                            ${this.state.id
                              ? html`
                                  <a
                                    class="button is-primary is-block"
                                    href="${articleUri}"
                                    title="Lire ${this.state.draft.title}"
                                    @click="${navigate(articleUri!)}"
                                  >
                                    👁 Prévisualisation
                                  </a>
                                `
                              : nothing}
                          </div>
                          ${this.state.error
                            ? html`
                                <div class="field error">
                                  ${this.state.error}
                                </div>
                              `
                            : nothing}
                        </div>
                      `}
                    </div>
                    <div class="column is-half">
                      <h1 class="title">
                        ${this.state.draft.title}
                      </h1>
                      <textarea
                        id="markdown"
                        name="markdown"
                        type="text"
                        rows="20"
                        cols="70"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            `
          : html`
              <div class="loading">
                Initialisation de l'espace temps, <br />
                chargement de la matrice quantique, <br />
                décomposition de la matière.
                <div class="loader"></div>
              </div>
            `}
      </form>
    `;
  }
}

customElements.define('ez-draft', DraftComponent);
