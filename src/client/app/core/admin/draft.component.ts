import * as flyd from "flyd";
import { html, LitElement, property } from "lit-element/lit-element";

import { ArticleLanguage } from "../../../../server/api/article/model/article-language";
import router from "../../../app-router";
import check from "../../utils/icons/check";
import { errorHandlerService } from "../error-handler-service";
import { DraftActions, DraftState, IArticle, IDraft } from "./types";

export default class Draft extends LitElement {
  @property({ type: Object })
  actions: DraftActions;

  @property({ type: Object })
  states: flyd.Stream<DraftState>;

  state: DraftState;

  /**
   * Whenever form is dirty
   */
  dirty: boolean = false;

  /**
   * Timer for save action pending
   */
  saveTimer: number;

  async firstUpdated() {
    // if (process.env.MEIOSIS_TRACER) {
    //   const meiosisTracer = await import("meiosis-tracer");
    //   meiosisTracer.default({ selector: "#tracer", streams: [this.states] });
    // }

    this.states.map(state => {
      this.state = state;
      this.update(new Map());
    });

    this.loadAndInit();
  }

  disconnectedCallback(): void {
    this.actions.reset();
  }

  loadAndInit(): void {
    if (!this.isDraft()) {
      this.actions.fetch(this.state.id as string).then(draft => {
        this.actions.initEditor(
          this.shadowRoot!.getElementById("markdown") as HTMLTextAreaElement,
          draft.markdown,
        );
      });
    } else {
      this.actions.initEditor(
        this.shadowRoot!.getElementById("markdown") as HTMLTextAreaElement,
        "",
      );
    }
  }

  isDraft(): boolean {
    return typeof this.state.id !== "string";
  }

  shouldShowEditor(): boolean {
    return this.state && (this.state.draftLoaded || this.isDraft());
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    this.actions.transformMarkdownToHtml();
    const draft = this.buildData();

    try {
      if (this.isDraft()) {
        const article = await this.actions.post(draft);
        const route = `/admin/draft?id=${
          article._id
        }&title=${encodeURIComponent(article.title)}`;
        router.push(route);
      } else {
        this.actions.update(this.state.id as string, draft as IArticle);
      }
    } catch (error) {
      errorHandlerService.throw(error);
    }
  }

  async handleFile(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0) as File;
      const id = this.state.id as string;

      try {
        await this.actions.uploadPoster(id, file);
        await this.actions.update(id, this.state.draft as IArticle);
      } catch (error) {
        errorHandlerService.throw(error);
      }
    }
  }

  async togglePublish(): Promise<void> {
    // const article = this.buildData();
    // article.published = !article.published;
    // if (article.published === true) {
    //   article.publishedAt = new Date().toString();
    // } else {
    //   article.publishedAt = null;
    // }
    // try {
    //   await this.submitAndUpdateFields(article as IArticle);
    // } catch (error) {
    //   errorHandlerService.throw(error);
    // }
  }

  handleTagsChange(e: Event): void {
    this.actions.editTags((e.target as HTMLInputElement).value);
  }

  handleTitleChange(e: Event): void {
    this.actions.editTitle((e.target as HTMLInputElement).value);
  }

  handleMetaTitleChange(e: Event): void {
    this.actions.editMetaTitle((e.target as HTMLInputElement).value);
  }

  handleMetaDescriptionChange(e: Event): void {
    this.actions.editMetaDescription((e.target as HTMLInputElement).value);
  }

  handleLangChange(e: Event): void {
    this.actions.editLang((e.target as HTMLInputElement)
      .value as ArticleLanguage);
  }

  handleChange(e: Event): void {
    e.preventDefault();
    this.dirty = true;
    this.update(new Map());

    if (this.saveTimer) {
      window.clearTimeout(this.saveTimer);
    }

    if (
      !this.state.draft.markdown ||
      (this.state.draft.markdown || "").length === 0 ||
      !this.state.draft.title
    ) {
      return;
    }

    const saveCallback = async () => {
      await this.handleSubmit(e);
      this.dirty = false;
      this.update(new Map());
    };
    this.saveTimer = window.setTimeout(saveCallback, 2000);
  }

  handleRemovePoster(): void {
    this.actions.removePoster();
    this.actions.update(this.state.id as string, this.state.draft as IArticle);
  }

  buildData(): IDraft {
    const { draft } = this.state;

    return {
      title: draft.title,
      markdown: draft.markdown,
      html: draft.html,
      posterUrl: draft.posterUrl,
      tags: draft.tags.map(tag => tag.replace(" ", "")),
      published: draft.published,
      publishedAt: draft.publishedAt,
      metaTitle: draft.metaTitle,
      metaDescription: draft.metaDescription,
      lang: draft.lang,
    };
  }

  render() {
    return html`
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link href="assets/css/simplemde.css" rel="stylesheet" />
      <link href="assets/css/debug-simplemde.css" rel="stylesheet" />
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        :host {
          display: block;
        }

        .container {
          margin-top: 40px !important;
        }

        .sticky {
          position: sticky;
          top: 20px;
          padding-bottom: 2px;
        }

        .poster {
          height: 400px;
          background-position: center center;
          background-size: cover;
          background-color: #eee;
        }

        button svg {
          width: 22px;
          margin-right: 6px;
        }
      </style>
      <ez-navbar></ez-navbar>
      ${
        this.shouldShowEditor()
          ? html`
              <div>
                ${
                  this.state.draft.posterUrl
                    ? html`
                        <div
                          class="poster"
                          style="background-image: url('${
                            this.state.draft.posterUrl
                          }')"
                        ></div>
                      `
                    : html``
                }
                <div class="container is-fluid">
                  <form
                    name="draft"
                    class="columns"
                    @submit="${this.handleSubmit}"
                    @input="${this.handleChange}"
                  >
                    <div class="column is-three-fifths">
                      <h1 class="title">${this.state.draft.title}</h1>
                      <label class="label" for="markdown">Content</label>
                      <textarea
                        id="markdown"
                        name="markdown"
                        type="text"
                        rows="20"
                        cols="70"
                      ></textarea>
                    </div>
                    <div class="column">
                      <div class="sticky">
                        <h2 class="subtitle">Configuration</h2>
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
                            class="button"
                            ?disabled=${!this.state.draft.posterUrl}
                            @click="${this.handleRemovePoster}"
                          >
                            Supprimer le poster
                          </button>
                        </div>
                        <div class="field">
                          <label class="label" for="tags"
                            >Tags (separated by a comma)</label
                          >
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
                          <label class="label" for="lang">Lang</label>
                          <div class="control">
                            <div class="select">
                              <select
                                required
                                id="lang"
                                @change="${this.handleLangChange}"
                              >
                                ${
                                  [ArticleLanguage.FR, ArticleLanguage.EN].map(
                                    lang => html`
                                      <option
                                        value="${lang}"
                                        ?selected="${
                                          lang === this.state.draft.lang
                                        }"
                                        >${lang}</option
                                      >
                                    `,
                                  )
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="field">
                          <label class="label" for="title">Meta title</label>
                          <input
                            id="metaTitle"
                            name="metaTitle"
                            value="${this.state.draft.metaTitle || ""}"
                            @input="${this.handleMetaTitleChange}"
                            class="input"
                            type="text"
                          />
                        </div>
                        <div class="field">
                          <label class="label" for="metaDescription"
                            >Meta description</label
                          >
                          <input
                            id="metaDescription"
                            name="metaDescription"
                            @input="${this.handleMetaDescriptionChange}"
                            class="input"
                            value="${this.state.draft.metaDescription || ""}"
                            type="text"
                          />
                        </div>
                        <button type="submit" class="button">
                          ${
                            this.dirty
                              ? html`
                                  Save is pending...
                                `
                              : html`
                                  ${check} Draft saved
                                `
                          }
                        </button>
                        <button
                          type="button"
                          class="button is-info"
                          @click="${this.togglePublish}"
                          ?disabled=${this.isDraft()}
                        >
                          ${
                            this.state.draft.published
                              ? "de publish"
                              : "publish"
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            `
          : html`
              Chargement...
            `
      }
    `;
  }
}

customElements.define("ez-draft", Draft);
