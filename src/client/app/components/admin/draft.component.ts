import * as flyd from 'flyd';
import { css, html, LitElement, property } from 'lit-element/lit-element';

import { ArticleLanguage } from '../../../../server/api/article/model/article-language';
import { router } from '../../core/router';
import { errorHandlerService } from '../../core/services/error-handler-service';
import { slugify } from '../../shared/slugify';
import { DraftActions } from './draft.actions';
import { DraftState } from './draft.initialState';
import { Article, Draft } from './types';

export default class DraftComponent extends LitElement {
  @property({ type: Object })
  actions: DraftActions;

  @property({ type: Object })
  states: flyd.Stream<DraftState>;

  state: DraftState;

  /**
   * Whenever form is dirty
   */
  dirty = false;

  /**
   * Timer for save action pending
   */
  saveTimer: number;

  /**
   * Used to display the drawer
   */
  drawerOpen = false;

  firstUpdated() {
    this.state = this.states();
    this.states.map(async state => {
      this.state = state;
      await this.requestUpdate('state');
    });

    this.loadAndInit();
  }

  disconnectedCallback(): void {
    this.actions.reset();
  }

  async loadAndInit() {
    if (!this.isDraft()) {
      const draft = await this.actions.get(this.state.id as string);

      await this.requestUpdate();

      this.actions.initEditor(
        this.shadowRoot!.getElementById('markdown') as HTMLTextAreaElement,
        draft.markdown
      );
    } else {
      await this.requestUpdate();

      this.actions.initEditor(
        this.shadowRoot!.getElementById('markdown') as HTMLTextAreaElement,
        ''
      );
    }
  }

  isDraft(): boolean {
    return typeof this.state.id !== 'string';
  }

  shouldShowEditor(): boolean {
    return this.state && (this.state.draftLoaded || this.isDraft());
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    this.actions.transformMarkdownToHtml();
    const draft = this.getDraft();

    try {
      if (this.isDraft()) {
        const article = await this.actions.post(draft);
        const route = `/admin/draft?id=${article._id}`;
        router.push(route);
      } else {
        await this.actions.update(this.state.id as string, draft as Article);
      }
    } catch (error) {
      errorHandlerService.throw(error);
    }
  }

  handleChange(e: Event): void {
    e.preventDefault();
    this.dirty = true;
    this.requestUpdate();

    if (this.saveTimer) {
      window.clearTimeout(this.saveTimer);
    }

    if (
      !this.state.draft.markdown ||
      (this.state.draft.markdown || '').length === 0 ||
      !this.state.draft.title
    ) {
      return;
    }

    const saveCallback = async () => {
      await this.handleSubmit(e);
      this.dirty = false;
      this.requestUpdate();
    };
    this.saveTimer = window.setTimeout(saveCallback, 2000);
  }

  async handleFile(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0) as File;
      const id = this.state.id as string;

      try {
        await this.actions.uploadPoster(id, file);
        await this.actions.update(id, this.getDraft() as Article);
      } catch (error) {
        errorHandlerService.throw(error);
      }
    }
  }

  async togglePublish(e: Event) {
    const article = this.getDraft();

    if (article.published) {
      this.actions.dePublish();
    } else {
      this.actions.publish();
    }

    await this.actions.update(this.state.id as string, this.getDraft() as Article);
  }

  handleTagsChange(e: Event): void {
    this.actions.editTags((e.target as HTMLInputElement).value);
    this.handleChange(e);
  }

  handleTitleChange(e: Event): void {
    this.actions.editTitle((e.target as HTMLInputElement).value);
    this.handleChange(e);
  }

  handleMetaTitleChange(e: Event): void {
    this.actions.editMetaTitle((e.target as HTMLInputElement).value);
    this.handleChange(e);
  }

  handleMetaDescriptionChange(e: Event): void {
    this.actions.editMetaDescription((e.target as HTMLInputElement).value);
    this.handleChange(e);
  }

  handleLangChange(e: Event): void {
    this.actions.editLang((e.target as HTMLInputElement).value as ArticleLanguage);
    this.handleChange(e);
  }

  handleSlugChange(e: Event): void {
    this.actions.editSlug((e.target as HTMLInputElement).value as ArticleLanguage);
    this.handleChange(e);
  }

  handleRemovePoster(e: Event): void {
    this.actions.removePoster();
    this.handleChange(e);
  }

  getDraft(): Draft {
    const { draft } = this.state;

    return {
      title: draft.title,
      slug: draft.slug,
      markdown: draft.markdown,
      html: draft.html,
      posterUrl: draft.posterUrl,
      tags: draft.tags.map(tag => tag.replace(' ', '')),
      published: draft.published,
      publishedAt: draft.publishedAt,
      metaTitle: draft.metaTitle,
      metaDescription: draft.metaDescription,
      lang: draft.lang,
    };
  }

  toggleConfigurationDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
    this.requestUpdate('drawerOpen');
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .loading {
        padding-top: 5rem;
        text-align: center;
        color: #7c7c7c;
      }

      .loading > .loader {
        margin: 0 auto;
        margin-top: 1rem;
      }

      .container {
        margin-top: 40px !important;
      }

      .draft-configuration {
        margin-top: 8px;
        padding: 0.8rem;
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

      .configuration-drawer {
        width: 420px;
        height: calc(100vh - 64px);
        position: fixed;
        bottom: 0;
        z-index: 8;
        background: #efefef;
        box-shadow: 0 0px 4px rgba(0, 0, 0, 0.3);
      }

      .drawer-btn {
        margin-bottom: 26px;
      }

      .field .button {
        width: 100%;
      }
    `;
  }

  render() {
    const articleUri =
      this.state && this.state.draftLoaded ? `/article/${this.state.draft.slug}` : null;

    return html`
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link href="assets/css/simplemde.css" rel="stylesheet" />
      <link href="assets/css/debug-simplemde.css" rel="stylesheet" />
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <ez-navbar></ez-navbar>
      <form
        @submit="${this.handleSubmit}"
        @input="${this.handleChange}"
        @change="${this.handleChange}"
      >
        ${this.drawerOpen
          ? html`
              <div class="configuration-drawer">
                ${this.shouldShowEditor()
                  ? html`
                      <div class="draft-configuration">
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
                          <label class="label" for="tags">Tags (separated by a comma)</label>
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
                            ${this.dirty || this.state.loading
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
                                  @click="${(e: Event) => {
                                    e.preventDefault();
                                    router.push(articleUri as string);
                                  }}"
                                >
                                  👁 Prévisualisation
                                </a>
                              `
                            : ''}
                        </div>
                      </div>
                    `
                  : html`
                      <div class="drawer-loading">
                        Chargement de la matrice quantique...
                      </div>
                    `}
              </div>
            `
          : null}
        ${this.shouldShowEditor()
          ? html`
              <div>
                ${this.state.draft.posterUrl
                  ? html`
                      <div
                        class="poster"
                        style="background-image: url('${this.state.draft.posterUrl}')"
                      ></div>
                    `
                  : html``}
                <div class="container">
                  <div name="draft" class="columns is-centered">
                    <div class="column is-half">
                      <button
                        type="button"
                        class="drawer-btn button ${this.drawerOpen ? null : 'is-info'}"
                        @click="${this.toggleConfigurationDrawer}"
                      >
                        ${this.drawerOpen
                          ? html`
                              ⤬
                            `
                          : html`
                              ⚙
                            `}
                        préparer mon article
                      </button>
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
                Initialisation de l'espace temps...
                <div class="loader"></div>
              </div>
            `}
      </form>
    `;
  }
}

customElements.define('ez-draft', DraftComponent);
