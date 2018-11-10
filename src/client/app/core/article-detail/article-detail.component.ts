import { LitElement, property } from "@polymer/lit-element";
import { html, TemplateResult } from "lit-html";

import { placeholder } from "../../shared/placeholder";
import _fetch from "../../utils/fetch";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { IArticle } from "../admin/types";
import { apiClient } from "../api";
import { timeSince } from "../../utils/time-since";
import { tags } from "../../shared/tags";
import { profileConfiguration } from "../../utils/profile-config";
import { debounce } from "../../utils/debounce";
import { showError } from "../../utils/show-error";
import router from "../../../app-router";

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  id: string;

  @property({ type: String })
  posterUrl: string | null = null;

  @property({ type: String })
  percentRemaining: string = "0";

  @property({ type: Object })
  article: IArticle | null = null;

  calculateRemainingHandler: EventListenerOrEventListenerObject | null = null;

  getArticle(): Promise<IArticle> {
    return apiClient.get<IArticle>(`/api/v1/article/${this.id}`);
  }

  async init(): Promise<void> {
    try {
      this.article = await this.getArticle();
      this.posterUrl = this.article.posterUrl as string;
    } catch (error) {
      showError(error);
    }
  }

  firstUpdated() {
    this.init().then(() => {
      const body = document
        .getElementsByTagName("body")
        .item(0) as HTMLBodyElement;

      this.calculateRemainingHandler = debounce(() => {
        const currentPosition = window.scrollY;
        const totalHeight = body.offsetHeight - window.innerHeight;

        const percentRemaining = (currentPosition * 100) / totalHeight;
        this.percentRemaining = percentRemaining.toFixed();
      }, 50);

      window.addEventListener("scroll", this.calculateRemainingHandler);
    });
  }

  disconnectedCallback() {
    this.removeEventListener("scroll", this
      .calculateRemainingHandler as EventListenerOrEventListenerObject);
  }

  showArticleDetail(): TemplateResult {
    const article = this.article as IArticle;

    return html`
      <article class="content is-medium">
        <header class="header">
          ${tags(article)}
          <small>
            Published ${timeSince(new Date(article.publishedAt as string))} ago
          </small>
        </header>
        <h1 class="title">${article.title}</h1>
        <div>${unsafeHTML(article.html)}</div>
        <hr />
        <footer class="section profile">
          <figure
            class="avatar"
            style="background-image: url('${profileConfiguration.avatarUrl}')"
          ></figure>
          <div class="presentation has-text-dark">
            <strong>${profileConfiguration.name}</strong><br />
            <span>${unsafeHTML(profileConfiguration.description)}</span>
          </div>
        </footer>
      </article>
    `;
  }

  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        :host {
          position: relative;
          display: block;
        }

        .poster {
          height: 50vh;
          background-color: #eee;
          background-size: cover;
          background-position: center center;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header .tag {
          margin-right: 4px;
        }

        .header .tag:last-child {
          margin-right: 0;
        }

        .profile {
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding-bottom: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        .avatar {
          min-width: 120px;
          height: 120px;
          overflow: hidden;
          border-radius: 100%;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
          background-color: #eee;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          margin: 0 !important;
        }

        .presentation {
          padding-left: 1.55rem;
          font-size: 0.8em;
        }

        .time-remaining {
          height: 3px;
          position: sticky;
          top: 0;
          z-index: 10;
          transition: width ease-in-out 100ms;
        }

        pre {
          background-color: #202020 !important;
          color: #5de561 !important;
          font-size: 0.825em !important;
        }

        .content blockquote:not(:last-child),
        .content dl:not(:last-child),
        .content ol:not(:last-child),
        .content p:not(:last-child),
        .content pre:not(:last-child),
        .content table:not(:last-child),
        .content ul:not(:last-child) {
          margin-bottom: 1.1em !important;
        }

        .last {
          padding-bottom: 0 !important;
          padding-top: 0 !important;
        }
      </style>
      <ez-navbar></ez-navbar>
      ${
        this.posterUrl
          ? `
          <figure
            class="poster"
            style="background-image: url('${this.posterUrl}')">
            {" "}
          </figure>
          `
          : null
      }
      <div
        class="time-remaining has-background-info"
        style="width: ${this.percentRemaining + "%"};"
      ></div>
      <ez-page .navbar="${false}">
        <section class="section">
          ${
            this.article
              ? this.showArticleDetail()
              : placeholder({
                  count: 1,
                  minLines: 30,
                  maxLines: 50,
                  box: false,
                  image: false,
                })
          }
        </section>
        <section class="section last">
          <a
            href="/"
            class="button is-block"
            @click="${
              (e: Event) => {
                e.preventDefault();
                router.push("/");
              }
            }"
          >
            Back to home
          </a>
        </section>
      </ez-page>
    `;
  }
}
