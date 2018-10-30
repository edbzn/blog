import { LitElement, property } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";
import * as showdown from "showdown";
import * as SimpleMDE from "simplemde";

import { apiClient } from "../../utils/api";
import { showError } from "../../utils/show-error";
import { upload } from "../../utils/upload";
import { IArticle, IDraft } from "./types";

export default class Draft extends LitElement {
  @property({ type: String })
  id: string;

  @property({ type: Object })
  draft: IDraft | IArticle = {
    title: "New draft",
    markdown: "",
    html: "",
    tags: [],
    posterUrl: null,
    published: false,
    publishedAt: null,
  };

  editor: SimpleMDE;

  constructor() {
    super();
  }

  firstUpdated(): void {
    this.init();
  }

  async init(): Promise<void> {
    // If an id is given we needs to fetch draft data
    // then hydrate the whole form
    if (!this.isDraft()) {
      this.draft = await this.getArticle();
      this.fillFormData();
    }

    const { markdownCtrl } = this.getFormRefs();

    this.editor = new SimpleMDE({
      lineWrapping: true,
      element: markdownCtrl,
      initialValue: this.draft.markdown,
      autoDownloadFontAwesome: true,
      forceSync: false,
      tabSize: 2,
      autosave: {
        enabled: false,
        uniqueId: "editor",
      },
      autofocus: true,
    });
  }

  disconnectedCallback() {
    this.editor.toTextArea();
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const article = this.buildData();

    try {
      await this.submitDraft(article);
    } catch (error) {
      showError(error);
    }
  }

  async submitDraft(draft: IDraft): Promise<void> {
    if (this.isDraft()) {
      const article = await this.postDraft(draft);
      this.id = article._id;
      this.update(new Map());
    } else {
      await this.updateArticle(draft as IArticle);
    }
  }

  async handleFile(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0) as File;

      try {
        await this.uploadFileAndUpdateForm(file);
      } catch (error) {
        showError(error);
      }
    }
  }

  async uploadFileAndUpdateForm(file: File): Promise<void> {
    const { path } = await this.uploadPoster(file);
    const { posterUrlCtrl } = this.getFormRefs();

    posterUrlCtrl.setAttribute("value", path);
    this.draft.posterUrl = path;
    this.update(new Map());
  }

  async togglePublish(): Promise<void> {
    const article = this.buildData();

    article.published = !article.published;
    if (article.published === true) {
      article.publishedAt = new Date().toString();
    } else {
      article.publishedAt = null;
    }

    try {
      await this.updateArticle(article as IArticle);
      this.draft = article;
      this.update(new Map());
    } catch (error) {
      showError(error);
    }
  }

  handleTags() {
    const { tagsCtrl } = this.getFormRefs();
    this.draft.tags = tagsCtrl.value.split(",");
    this.update(new Map());
  }

  getFormRefs(): {
    titleCtrl: HTMLInputElement;
    markdownCtrl: HTMLTextAreaElement;
    posterUrlCtrl: HTMLInputElement;
    posterCtrl: HTMLInputElement;
    tagsCtrl: HTMLInputElement;
  } {
    const host = this.shadowRoot as ShadowRoot;
    const titleCtrl = host.getElementById("title") as HTMLInputElement;
    const markdownCtrl = host.getElementById("markdown") as HTMLTextAreaElement;
    const posterUrlCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const posterCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const tagsCtrl = host.getElementById("tags") as HTMLInputElement;

    return { titleCtrl, markdownCtrl, posterUrlCtrl, tagsCtrl, posterCtrl };
  }

  fillFormData(): void {
    const draft = this.draft;
    const {
      titleCtrl,
      posterUrlCtrl,
      posterCtrl,
      tagsCtrl,
    } = this.getFormRefs();

    titleCtrl.setAttribute("value", draft.title);
    tagsCtrl.setAttribute("value", draft.tags.toString());

    if (draft.posterUrl) {
      posterUrlCtrl.setAttribute("value", draft.posterUrl);
      posterCtrl.setAttribute("value", draft.posterUrl);
    }
  }

  getArticle(): Promise<IArticle> {
    return apiClient.get<IArticle>(`/api/v1/article/${this.id}`);
  }

  postDraft(article: IDraft): Promise<IArticle> {
    return apiClient.post<IArticle>("/api/v1/article", article);
  }

  updateArticle(article: IArticle): Promise<IArticle> {
    return apiClient.put<IArticle>(`/api/v1/article/${this.id}`, article);
  }

  uploadPoster(file: File): Promise<{ path: string }> {
    return upload(file);
  }

  isDraft(): boolean {
    return this.id === "undefined";
  }

  buildData(): IDraft | IArticle {
    const { titleCtrl, posterUrlCtrl } = this.getFormRefs();
    const converter = new showdown.Converter();
    const markdown = this.editor.value();

    return {
      title: titleCtrl.value,
      markdown,
      html: converter.makeHtml(markdown),
      posterUrl: posterUrlCtrl.value,
      tags: this.draft.tags,
      published: this.draft.published,
      publishedAt: this.draft.publishedAt,
    };
  }

  render(): TemplateResult {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <link href="assets/css/simplemde.css" rel="stylesheet">
      <link href="assets/css/debug-simplemde.css" rel="stylesheet">
      <style>
        :host {
          display: block;
        }

        .CodeMirror, .CodeMirror-scroll {
          min-height: 300px !important;
        }

        form {
          margin-top: 20px;
        }

        form input, 
        form label,
        form textarea {
          display: block;
        }

        form input, form textarea {
          margin-bottom: 10px;
        }

        .poster {
          height: 400px;
          background-position: center center;
          background-size: cover;
        }
      </style>
      <ez-page>
        ${
          this.draft.posterUrl
            ? html`<div class="poster" style="background-image: url('${
                this.draft.posterUrl
              }')"></div>`
            : html``
        }
        <h1>${this.draft.title}</h1>

        <div>
          <form name="login" @submit=${this.handleSubmit}>
            <label for="poster">Poster</label>
            ${
              this.isDraft()
                ? html`
                <input required
                  type="file"
                  id="poster"
                  name="poster"
                  accept="image/png, image/jpeg"
                  @change=${this.handleFile} />
              `
                : html`
                <input
                  type="file"
                  id="poster"
                  name="poster"
                  accept="image/png, image/jpeg"
                  @change=${this.handleFile} />
              `
            }
            
            <label for="tags">Tags (separated by a comma)</label>
            <input required
              type="text"
              id="tags"
              name="tags"
              placeholder="architecture, test"
              @change=${this.handleTags} />

            <label for="title">Title</label>
            <input id="title"
              name="title"
              type="text"
              required />
            
            <input type="hidden" id="posterUrl" name="posterUrl" />
            <label for="markdown">Content</label>
            <textarea id="markdown"
              name="markdown"
              type="text"
              rows="20"
              cols="70"></textarea>

            <button type="submit">Save draft</button>
            <button type="button"
              @click=${this.togglePublish} 
                ?disabled="${this.isDraft()}">
                ${this.draft.published ? "de publish" : "publish"}
              </button>
          </form>
        </div>
      </ez-page>
    `;
  }
}
