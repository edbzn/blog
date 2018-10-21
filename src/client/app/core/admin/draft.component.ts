import { LitElement, property } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import { showError } from "../../utils/show-error";
import _fetch from "../../utils/fetch";
import { upload } from "../../utils/upload";
import { ArticleDocument } from "../../../../server/api/article/model/article.model";

interface IDraft {
  title: string;
  content: string;
  tags: string[];
  posterUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default class Draft extends LitElement {
  @property({ type: String })
  id: string;

  @property({ type: Object })
  draft: IDraft = {
    title: "New draft",
    content: "",
    tags: [],
    posterUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    if (this.id !== "undefined") {
      this.draft = await this.getDraft();
      this.fillFormData();
    }
  }

  async getDraft(): Promise<IDraft> {
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

  async postDraft(article: any): Promise<Response> {
    return await _fetch(`http://localhost:8081/api/v1/article`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({ ...article }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  async uploadPoster(file: File): Promise<{ path: string }> {
    return await upload(file);
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const { titleCtrl, contentCtrl, posterUrlCtrl } = this.getFormRefs();

    const article = {
      title: titleCtrl.value,
      content: contentCtrl.value,
      posterUrl: posterUrlCtrl.value,
      tags: this.draft.tags,
    };

    try {
      await this.submitDraft(article);
    } catch (error) {
      showError(error);
    }
  }

  async submitDraft(article: any): Promise<void> {
    await this.postDraft(article);
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

  private getFormRefs(): {
    titleCtrl: HTMLInputElement;
    contentCtrl: HTMLTextAreaElement;
    posterUrlCtrl: HTMLInputElement;
    tagsCtrl: HTMLInputElement;
  } {
    const host = this.shadowRoot as ShadowRoot;
    const titleCtrl = host.getElementById("title") as HTMLInputElement;
    const contentCtrl = host.getElementById("content") as HTMLTextAreaElement;
    const posterUrlCtrl = host.getElementById("posterUrl") as HTMLInputElement;
    const tagsCtrl = host.getElementById("tags") as HTMLInputElement;

    return { titleCtrl, contentCtrl, posterUrlCtrl, tagsCtrl };
  }

  private fillFormData(): void {
    const draft = this.draft;
    const { titleCtrl, contentCtrl, posterUrlCtrl } = this.getFormRefs();

    titleCtrl.setAttribute("value", draft.title);
    contentCtrl.setAttribute("value", draft.content);
    contentCtrl.append(draft.content);

    if (draft.posterUrl) {
      posterUrlCtrl.setAttribute("value", draft.posterUrl);
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
          Created at ${this.draft.createdAt} <br>
          Updated at ${this.draft.updatedAt}
        </div>
        <div>
          <form name="login" @submit=${this.handleSubmit}>
            <label for="poster">Poster</label>
            <input required
              type="file"
              id="poster"
              name="poster"
              accept="image/png, image/jpeg"
              @change=${this.handleFile} />
            
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
            <button type="button">Publish @todo</button>
          </form>
        </div>
      </ez-page>
    `;
  }
}
