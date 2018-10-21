import { LitElement, property } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import { showError } from "../../utils/show-error";
import _fetch from "../../utils/fetch";
import { upload } from "../../utils/upload";

export interface IDraft {
  title: string;
  content: string;
  tags: string[];
  posterUrl: string | null;
  published: boolean;
  publishedAt: Date | null;
}

export interface IArticle extends IDraft {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class Draft extends LitElement {
  @property({ type: String })
  id: string;

  @property({ type: Object })
  draft: IDraft | IArticle = {
    title: "New draft",
    content: "",
    tags: [],
    posterUrl: null,
    published: false,
    publishedAt: null,
  };

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
  }

  async getArticle(): Promise<IArticle> {
    const resp = await _fetch(
      `http://localhost:8081/api/v1/article/${this.id}`,
      {
        method: "GET",
        mode: "cors",
        cache: "default",
      },
    );

    return resp.json();
  }

  async postDraft(article: IDraft): Promise<IArticle> {
    const resp = await _fetch(`http://localhost:8081/api/v1/article`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({ ...article }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return resp.json();
  }

  async updateArticle(article: IArticle): Promise<IArticle> {
    const resp = await _fetch(
      `http://localhost:8081/api/v1/article/${this.id}`,
      {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify({ ...article }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return resp.json();
  }

  async uploadPoster(file: File): Promise<{ path: string }> {
    return await upload(file);
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const { titleCtrl, contentCtrl, posterUrlCtrl } = this.getFormRefs();
    const article: IDraft = {
      title: titleCtrl.value,
      content: contentCtrl.value,
      posterUrl: posterUrlCtrl.value,
      tags: this.draft.tags,
      published: this.draft.published,
      publishedAt: this.draft.publishedAt,
    };

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

  handleTags() {
    const { tagsCtrl } = this.getFormRefs();
    this.draft.tags = tagsCtrl.value.split(",");
    this.update(new Map());
  }

  getFormRefs(): {
    titleCtrl: HTMLInputElement;
    contentCtrl: HTMLTextAreaElement;
    posterUrlCtrl: HTMLInputElement;
    posterCtrl: HTMLInputElement;
    tagsCtrl: HTMLInputElement;
  } {
    const host = this.shadowRoot as ShadowRoot;
    const titleCtrl = host.getElementById("title") as HTMLInputElement;
    const contentCtrl = host.getElementById("content") as HTMLTextAreaElement;
    const posterUrlCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const posterCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const tagsCtrl = host.getElementById("tags") as HTMLInputElement;

    return { titleCtrl, contentCtrl, posterUrlCtrl, tagsCtrl, posterCtrl };
  }

  fillFormData(): void {
    const draft = this.draft;
    const {
      titleCtrl,
      contentCtrl,
      posterUrlCtrl,
      posterCtrl,
      tagsCtrl,
    } = this.getFormRefs();

    titleCtrl.setAttribute("value", draft.title);
    tagsCtrl.setAttribute("value", draft.tags.toString());
    contentCtrl.setAttribute("value", draft.content);
    contentCtrl.append(draft.content);

    if (draft.posterUrl) {
      posterUrlCtrl.setAttribute("value", draft.posterUrl);
      posterCtrl.setAttribute("value", draft.posterUrl);
    }
  }

  isDraft(): boolean {
    return this.id === "undefined";
  }

  async togglePublish(): Promise<void> {
    this.draft.published = !this.draft.published;
    if (this.draft.published === true) {
      this.draft.publishedAt = new Date();
    } else {
      this.draft.publishedAt = null;
    }

    this.update(new Map());

    try {
      await this.updateArticle({ ...this.draft } as IArticle);
    } catch (error) {
      showError(error);
    }
  }

  render(): TemplateResult {
    return html`
      <style scoped>
        :host {
          display: block;
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

            <label for="content">Content</label>
            <textarea id="content"
              name="content"
              type="text"
              required
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
