import { html, LitElement, property } from '@polymer/lit-element';
import { distanceInWords, format } from 'date-fns';
import * as frLocale from 'date-fns/locale/fr';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import router from '../../../app-router';
import { placeholder } from '../../shared/placeholder';
import { tags } from '../../shared/tags';
import { debounce } from '../../utils/debounce';
import { profileConfiguration } from '../../utils/profile-config';
import { showError } from '../../utils/show-error';
import { IArticle } from '../admin/types';
import { apiClient } from '../api-client';

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

  firstUpdated(): void {
    this.init().then(() => {
      this.handleScrollChange();
    });
  }

  async init(): Promise<void> {
    try {
      this.article = await this.getArticle();
      this.posterUrl = this.article.posterUrl as string;
    } catch (error) {
      showError(error);
    }
  }

  getArticle(): Promise<IArticle> {
    return apiClient.get<IArticle>(`/api/v1/article/${this.id}`);
  }

  handleScrollChange(): void {
    const body = document
      .getElementsByTagName("body")
      .item(0) as HTMLBodyElement;

    this.calculateRemainingHandler = debounce(() => {
      const currentPosition = window.scrollY;
      const totalHeight = body.offsetHeight - window.innerHeight;

      const percentRemaining = (currentPosition * 100) / totalHeight;
      this.percentRemaining = percentRemaining.toFixed();
    }, 10);

    window.addEventListener("scroll", this.calculateRemainingHandler);
  }

  disconnectedCallback(): void {
    this.removeEventListener("scroll", this
      .calculateRemainingHandler as EventListenerOrEventListenerObject);
  }

  showArticleDetail() {
    const article = this.article as IArticle;

    return html`
      <article class="content is-medium">
        <header class="header">
          ${tags(article)}
          <span class="article-date"
            >${
              format(
                new Date(article.publishedAt as string),
                "dddd DD MMMM YYYY",
                { locale: frLocale },
              )
            }</span
          >
        </header>
        <h1 class="title">${article.title}</h1>
        <ez-article-content .content="${article.html}"></ez-article-content>
        <footer class="section article-footer">
          <div class="publication">
            ${tags(article)}
            <span class="article-date"
              >Publié il y a
              ${
                distanceInWords(
                  new Date(article.publishedAt as string),
                  new Date(),
                  { locale: frLocale },
                )
              }</span
            >
          </div>
          <a
            href="/"
            class="button is-block back-to-home"
            @click="${
              (e: Event) => {
                e.preventDefault();
                router.push("/");
              }
            }"
          >
            Accueil
          </a>
          <ez-comment .articleId="${article._id}"></ez-comment>
          <div class="profile">
            <figure
              class="avatar"
              style="background-image: url('${profileConfiguration.avatarUrl}')"
            ></figure>
            <div class="presentation has-text-dark">
              <strong>${profileConfiguration.name}</strong><br />
              <span>${unsafeHTML(profileConfiguration.description)}</span>
              <div>
                <iframe
                  src="https://platform.twitter.com/widgets/follow_button.html?screen_name=edouardbozon&show_screen_name=true&show_count=false"
                  title="Follow me"
                  width="148"
                  height="26"
                  style="margin-top: 12px; border: 0; overflow: hidden;"
                ></iframe>
              </div>
            </div>
          </div>
        </footer>
      </article>
    `;
  }

  render() {
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
        }

        .avatar {
          min-width: 110px;
          height: 110px;
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

        .article-date {
          text-transform: capitalize;
          font-weight: 100;
          font-size: 14px;
        }

        .content .publication {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .content .publication .article-date {
          text-transform: initial;
        }

        .content .article-footer {
          padding-bottom: 0;
          padding-left: 0;
          padding-right: 0;
        }

        .time-remaining {
          height: 3px;
          position: sticky;
          top: 0;
          z-index: 10;
          transition: width ease-in-out 100ms;
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

        @media screen and (max-width: 600px) {
          .header {
            align-items: initial;
            flex-direction: column-reverse;
          }
          .content .publication {
            align-items: initial;
            flex-direction: column-reverse;
          }
          .article-date {
            margin-bottom: 4px;
          }
          .meta-container.section {
            padding: 3rem 0.8rem;
          }
        }
      </style>
      <ez-navbar></ez-navbar>
      ${
        this.posterUrl
          ? html`
              <figure
                class="poster"
                style="background-image: url('${this.posterUrl}')"
              ></figure>
            `
          : null
      }
      <div
        class="time-remaining has-background-info"
        style="width: ${this.percentRemaining + "%"};"
      ></div>
      <ez-page .navbar="${false}">
        <section class="section meta-container">
          ${
            this.article
              ? this.showArticleDetail()
              : placeholder({
                  count: 1,
                  minLines: 200,
                  maxLines: 300,
                  box: false,
                  image: false,
                })
          }
        </section>
      </ez-page>
    `;
  }
}

customElements.define("ez-article-detail", ArticleDetail);
