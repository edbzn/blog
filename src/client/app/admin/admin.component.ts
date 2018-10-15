import { LitElement } from '@polymer/lit-element/lit-element';
import { html, TemplateResult } from 'lit-html';

import router from '../../app-router';

export default class Admin extends LitElement {
  
  postArticle = async (article: any): Promise<void> => {
    await fetch(`http://localhost:8081/api/v1/article`, {
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
          <form name="login" @submit=${async (e: Event) => {
            e.preventDefault();

            const title = document.getElementById("title") as HTMLInputElement;
            const content = document.getElementById("content") as HTMLInputElement;
            const article = { title: title.value, content: content.value };

            try {
              await this.postArticle(article);

              const form = document.querySelector('form[name="login"]') as HTMLFormElement;
              form.reset();
            } catch (e) {
              router.push("/error");
            }
          }}>
            <label for="title">Title</label>
            <input id="title" name="title" type="text" required />
            <label for="content">Content</label>
            <textarea id="content" name="content" type="text" required rows="3" cols="60"></textarea>
            <button type="submit">Post</button>
          </form>
        </div>
      </ez-page>
    `;
  }
}
