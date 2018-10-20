import { LitElement, property } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import { showError } from "../../utils/show-error";
import _fetch from "../../utils/fetch";
import { upload } from "../../utils/upload";
import { ArticleDocument } from "../../../../server/api/article/model/article.model";

interface IDraft {
  title: string;
  content: string;
  tags: [];
  posterUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class Draft extends LitElement {
  @property({ type: String })
  id: string;

  @property({ type: Object })
  draft: ArticleDocument | IDraft = {
    title: "New draft",
    content: "",
    tags: [],
    posterUrl: "",
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

  async getDraft(): Promise<ArticleDocument> {
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
    };

    try {
      await this.submitDraft(article);
    } catch (error) {
      showError(error);
    }
  }

  async submitDraft(article: any): Promise<void> {
    await this.postDraft(article);

    const host = this.shadowRoot as ShadowRoot;
    const form = host.querySelector('form[name="login"]') as HTMLFormElement;
    form.reset();
  }

  async handleFile(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0) as File;

      try {
        await this.uploadFile(file);
      } catch (error) {
        showError(error);
      }
    }
  }

  async uploadFile(file: File): Promise<void> {
    const { path } = await this.uploadPoster(file);

    const posterUrlInput = (this.shadowRoot as ShadowRoot).getElementById(
      "posterUrl",
    ) as HTMLInputElement;

    posterUrlInput.setAttribute("value", path);
  }

  private getFormRefs(): {
    titleCtrl: HTMLInputElement;
    contentCtrl: HTMLTextAreaElement;
    posterUrlCtrl: HTMLInputElement;
  } {
    const host = this.shadowRoot as ShadowRoot;
    const titleCtrl = host.getElementById("title") as HTMLInputElement;
    const contentCtrl = host.getElementById("content") as HTMLTextAreaElement;
    const posterUrlCtrl = host.getElementById("posterUrl") as HTMLInputElement;

    return { titleCtrl, contentCtrl, posterUrlCtrl };
  }

  private fillFormData(): void {
    const draft = this.draft as ArticleDocument;
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
      </style>
      <ez-page>
        ${
          this.draft.posterUrl
            ? html`<img src="${this.draft.posterUrl}">`
            : html``
        }
        <h1>${this.draft.title}</h1>
        <div>
          Created at ${this.draft.createdAt} <br>
          Updated at ${this.draft.updatedAt}
        </div>
        <div>
          <form name="login" @submit=${this.handleSubmit}>
            <label for="title">Title</label>
            <input id="title"
              name="title"
              type="text"
              required />

            <label for="poster">Poster</label>
            <input required
              type="file"
              id="poster"
              name="poster"
              accept="image/png, image/jpeg"
              @change=${this.handleFile} />
            
            <input type="hidden" id="posterUrl" name="posterUrl" />

            <label for="content">Content</label>
            <textarea id="content"
              name="content"
              type="text"
              required
              rows="3"
              cols="60"></textarea>

            <button type="submit">Post</button>
          </form>
        </div>
      </ez-page>
    `;
  }
}
