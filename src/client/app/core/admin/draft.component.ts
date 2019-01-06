import { html, LitElement, property } from "lit-element/lit-element";
import * as showdown from "showdown";
import * as SimpleMDE from "simplemde";
import { v1 as uuid } from "uuid";

import router from "../../../app-router";
import { apiClient } from "../api-client";
import { errorHandlerService } from "../error-handler-service";
import { storageService } from "../storage-client";
import { IArticle, IDraft, IDraftFormRefs } from "./types";
import check from "../../utils/icons/check";
import { DraftState, DraftActions } from "./draft.store";

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
  saveTimer: number;

  firstUpdated(): void {
    this.states.map(state => {
      this.state = state;
      this.update(new Map());
    });

    this.loadDraftAndInit();
  }

  disconnectedCallback(): void {
    this.actions.reset();
  }

  loadDraftAndInit(): void {
    if (this.shouldLoadDraft()) {
      this.actions.fetch(this.state.id as string).then(draft => {
        this.actions.initEditor(
          this.getFormRefs().markdownCtrl,
          draft.markdown,
        );
      });
    } else {
      this.actions.initEditor(
        this.getFormRefs().markdownCtrl,
        "",
      );
    }
  }

  shouldLoadDraft(): boolean {
    return typeof this.state.id === "string";
  }

  shouldShowEditor(): boolean {
    return this.state && (this.state.draftLoaded || !this.state.id);
  }

  async handleSubmit(e: Event): Promise<void> {
    // e.preventDefault();
    // const article = this.buildData();
    // try {
    //   await this.submitAndUpdateFields(article);
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async submitAndUpdateFields(draft: IDraft): Promise<void> {
    // if (this.isDraft()) {
    //   const article = await this.postDraft(draft);
    //   this.id = article._id;
    //   this.state.draft = article;
    //   router.push(
    //     `/admin/draft?id=${article._id}&title=${encodeURIComponent(
    //       article.title,
    //     )}`,
    //   );
    // } else {
    //   const article = await this.updateArticle(draft as IArticle);
    //   this.state.draft = article;
    // }
    // this.update(new Map());
  }

  async handleFile(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0) as File;
      const id = this.state.id as string;

      try {
        const path = await this.actions.uploadPoster(id, file);
        await this.actions.update(id, this.state.draft as IArticle);
        
        const { posterUrlCtrl } = this.getFormRefs();
        posterUrlCtrl.setAttribute("value", path);
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

  handleTags(): void {
    // const { tagsCtrl } = this.getFormRefs();
    // this.state.draft.tags = tagsCtrl.value.split(",");
    // this.update(new Map());
  }

  handleChange(e: Event): void {
    e.preventDefault();

    this.dirty = true;
    this.update(new Map());

    if (this.saveTimer) {
      window.clearTimeout(this.saveTimer);
    }

    const { titleCtrl } = this.getFormRefs();
    if (!titleCtrl.validity.valid) {
      return;
    }

    const saveCallback = async () => {
      await this.handleSubmit(e);
      this.dirty = false;
      this.update(new Map());
    };
    this.saveTimer = window.setTimeout(saveCallback, 2000);
  }

  getFormRefs(): IDraftFormRefs {
    const host = this.shadowRoot as ShadowRoot;
    const titleCtrl = host.getElementById("title") as HTMLInputElement;
    const markdownCtrl = host.getElementById("markdown") as HTMLTextAreaElement;
    const posterUrlCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const posterCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const tagsCtrl = host.getElementById("tags") as HTMLInputElement;
    const metaTitleCtrl = host.getElementById("metaTitle") as HTMLInputElement;
    const metaDescriptionCtrl = host.getElementById(
      "metaDescription",
    ) as HTMLInputElement;

    return {
      titleCtrl,
      markdownCtrl,
      posterUrlCtrl,
      tagsCtrl,
      posterCtrl,
      metaTitleCtrl,
      metaDescriptionCtrl,
    };
  }

  fillFormData(): void {
    // const draft = this.state.draft;
    // const {
    //   titleCtrl,
    //   posterUrlCtrl,
    //   posterCtrl,
    //   tagsCtrl,
    // } = this.getFormRefs();
    // titleCtrl.setAttribute("value", draft.title);
    // tagsCtrl.setAttribute("value", draft.tags.toString());
    // if (draft.posterUrl) {
    //   posterUrlCtrl.setAttribute("value", draft.posterUrl);
    //   posterCtrl.setAttribute("value", draft.posterUrl);
    // }
  }

  isDraft(): boolean {
    return this.id === "undefined";
  }

  buildData() {
    // const { titleCtrl, posterUrlCtrl } = this.getFormRefs();
    // const converter = new showdown.Converter();
    // const markdown = this.editor.value();
    // const html = converter.makeHtml(markdown);
    // const posterUrl =
    //   posterUrlCtrl.value.length > 0 ? posterUrlCtrl.value : null;
    // return {
    //   title: titleCtrl.value,
    //   markdown,
    //   html,
    //   posterUrl,
    //   tags: this.state.draft.tags.map(tag => tag.replace(" ", "")),
    //   published: this.state.draft.published,
    //   publishedAt: this.state.draft.publishedAt,
    //   metaTitle: this.state.draft.metaTitle,
    //   metaDescription: this.state.draft.metaDescription,
    // };
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
                    name="login"
                    class="columns"
                    @submit="${this.handleSubmit}"
                    @input="${this.handleChange}"
                  >
                    <div class="column is-three-fifths">
                      <h1 class="title">${this.state.draft.title}</h1>
                      <input type="hidden" id="posterUrl" name="posterUrl" />
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
                            name="poster"
                            accept="image/png, image/jpeg, image/gif"
                            @change="${this.handleFile}"
                          />
                        </div>
                        <div class="field">
                          <button
                            class="button"
                            ?disabled=${!this.state.draft.posterUrl}
                            @click="${
                              async (e: Event) => {
                                // e.preventDefault();
                                // await this.submitAndUpdateFields({
                                //   ...this.buildData(),
                                //   posterUrl: null,
                                // });
                              }
                            }"
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
                            @change="${this.handleTags}"
                          />
                        </div>
                        <div class="field">
                          <label class="label" for="title">Title</label>
                          <input
                            id="title"
                            name="title"
                            class="input"
                            type="text"
                            required
                          />
                        </div>
                        <div class="field">
                          <label class="label" for="title">Meta title</label>
                          <input
                            id="metaTitle"
                            name="metaTitle"
                            class="input"
                            type="text"
                          />
                        </div>
                        <div class="field">
                          <label class="label" for="title"
                            >Meta description</label
                          >
                          <input
                            id="metaDescription"
                            name="metaDescription"
                            class="input"
                            type="text"
                          />
                        </div>
                        <button
                          type="submit"
                          class="button"
                          ?disabled=${!this.dirty}
                        >
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
                      <div id="tracer"></div>
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
