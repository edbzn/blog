import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import { showError } from "../utils/show-error";
import _fetch from "../utils/fetch";
import { upload } from "../utils/upload";

export default class Admin extends LitElement {
  async postArticle(article: any): Promise<Response> {
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

    const host = this.shadowRoot as ShadowRoot;
    const title = host.getElementById("title") as HTMLInputElement;
    const content = host.getElementById("content") as HTMLInputElement;
    const posterUrl = host.getElementById("posterUrl") as HTMLInputElement;

    const article = {
      title: title.value,
      content: content.value,
      posterUrl: posterUrl.value,
    };

    try {
      await this.submit(article, host);
    } catch (error) {
      showError(error);
    }
  }

  async submit(article: any, host: ShadowRoot): Promise<void> {
    await this.postArticle(article);

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
        <h1>Admin</h1>
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
