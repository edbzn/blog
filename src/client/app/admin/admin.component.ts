import { LitElement } from "@polymer/lit-element/lit-element";
import { html, TemplateResult } from "lit-html";

import router from "../../app-router";

export default class Admin extends LitElement {
  postArticle = async (article: any) => {
    return await fetch(`http://localhost:8081/api/v1/article`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({ ...article }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  uploadPoster = async (file: File): Promise<string> => {
    const response = await fetch(`http://localhost:8081/api/v1/gallery`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: file,
    });

    return response.json();
  };

  async handleSubmit(e: Event) {
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
      await this.postArticle(article);

      const form = host.querySelector('form[name="login"]') as HTMLFormElement;
      form.reset();
    } catch (e) {
      router.push("/error");
    }
  }

  async handleFile(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.files instanceof FileList) {
      const file = target.files.item(0) as File;

      const url = await this.uploadPoster(file);
      const posterUrlInput = (this.shadowRoot as ShadowRoot).getElementById(
        "posterUrl",
      ) as HTMLInputElement;

      posterUrlInput.setAttribute("value", url);
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
