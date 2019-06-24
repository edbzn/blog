import { distanceInWordsToNow, format } from 'date-fns';
import { css, html, LitElement, property } from 'lit-element';
import { nothing } from 'lit-html';

import { translate } from '../../core/directives/translate.directive';
import { apiClient } from '../../core/services/api-client';
import { errorHandlerService } from '../../core/services/error-handler-service';
import { languageService } from '../../core/services/language-service';
import { buttonStyle } from '../../shared/button';
import { cardStyle } from '../../shared/card';
import { tags } from '../../shared/tags';
import { debounce } from '../../utils/debounce';
import { navigate } from '../../utils/navigate';
import { setPageMeta } from '../../utils/set-document-meta';
import { Article } from '../admin/types';

export default class ArticleDetail extends LitElement {
  @property({ type: String })
  slug: string;

  @property({ type: String })
  posterUrl: string | null = null;

  @property({ type: String })
  percentRemaining: string = '0';

  @property({ type: Object })
  article: Article | null = null;

  calculateRemainingHandler: EventListenerOrEventListenerObject | null = null;

  posterLoaded = false;

  firstUpdated(): void {
    this.init()
      .then(() => {
        this.handleScrollChange();
        this.setPageMeta();
        this.loadPoster();
      })
      .catch(e => {
        errorHandlerService.throw(e);
      });
  }

  async init(): Promise<void> {
    try {
      this.article = await this.getArticle();
      this.posterUrl = this.article.posterUrl;
    } catch (error) {
      errorHandlerService.throw(error);
    }
  }

  getArticle(): Promise<Article> {
    return apiClient.get<Article>(`/api/v1/article/slug/${this.slug}`);
  }

  handleScrollChange(): void {
    const body = document.getElementsByTagName('body').item(0) as HTMLBodyElement;

    this.calculateRemainingHandler = debounce(() => {
      const currentPosition = window.scrollY;
      const totalHeight = body.offsetHeight - window.innerHeight;

      const percentRemaining = (currentPosition * 100) / totalHeight;
      this.percentRemaining = percentRemaining.toFixed();
    }, 10);

    window.addEventListener('scroll', this.calculateRemainingHandler);
  }

  setPageMeta() {
    const metaTitle =
      typeof this.article!.metaTitle === 'string' ? this.article!.metaTitle! : undefined;
    const metaDescription =
      typeof this.article!.metaDescription === 'string'
        ? this.article!.metaDescription!
        : undefined;

    const [firstSentence, secondSentence] = this.article!.html.replace(/<\/?[^>]+(>|$)/g, '')
      .slice(0, 250)
      .split('.');
    const description = [firstSentence, secondSentence + '.'].join('.');

    setPageMeta({
      title: this.article!.title,
      metaTitle,
      description,
      metaDescription,
    });
  }

  loadPoster(): void {
    const img = new Image();

    if (this.article!.posterUrl) {
      img.src = this.article!.posterUrl;
      img.onload = () => {
        this.posterLoaded = true;
        this.requestUpdate();
      };
      img.onerror = () => {
        this.posterLoaded = false;
        this.requestUpdate();
      };
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener('scroll', this
      .calculateRemainingHandler as EventListenerOrEventListenerObject);
  }

  static get styles() {
    return [
      cardStyle,
      buttonStyle,
      css`
        :host {
          position: relative;
          display: block;
        }

        .poster {
          height: 45vh;
          background-color: #eee;
          background-size: cover;
          background-position: center center;
        }

        figure {
          margin: 0;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }

        figure.loaded {
          opacity: 1;
        }

        .content .title {
          font-size: 3.4em;
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

        .date {
          font-family: 'IBM Plex Sans', sans-serif;
          text-transform: capitalize;
          font-weight: 400;
          font-size: 0.8rem;
        }

        .content {
          margin-top: 40px;
        }

        .content .publication {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .content .publication .date {
          text-transform: initial;
        }

        .content .article-footer {
          padding-bottom: 0;
          padding-left: 0;
          padding-right: 0;
        }

        .timeline {
          height: 4px;
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(155, 155, 155, 0.48);
        }

        .timeline > div {
          height: 4px;
          background-color: #40a8ff;
          transition: width cubic-bezier(0.4, 0, 0.2, 1) 200ms;
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

        .previews .card-link {
          width: 50%;
          display: inline-block;
          margin-bottom: 0;
        }

        .placeholder {
          min-height: 100vh;
        }

        @media screen and (max-width: 800px) {
          .content .title {
            font-size: 2.75em;
          }

          .header {
            align-items: initial;
            flex-direction: column-reverse;
          }
          .content .publication {
            align-items: initial;
            flex-direction: column-reverse;
          }
          .date {
            margin-bottom: 4px;
          }
          .container {
            padding: 3rem 0.8rem;
          }
        }
      `,
    ];
  }

  showArticleDetail() {
    const article = this.article!;

    return html`
      <article class="content">
        <header class="header">
          ${tags(article)}
          <span class="date"
            >${format(new Date(article.publishedAt!), 'dddd DD MMMM YYYY', {
              locale: languageService.dateFnsLocale,
            })}
          </span>
        </header>
        <h1 class="title">${article.title}</h1>
        <ez-article-content .content="${article.html}"></ez-article-content>
        <footer class="article-footer">
          <div class="publication">
            ${tags(article)}
            <span class="date">
              ${translate('article_detail.published_at')}
              ${distanceInWordsToNow(new Date(article.publishedAt!), {
                locale: languageService.dateFnsLocale,
              })}
              ${languageService.getLang() === 'en' ? ' ago' : null}
            </span>
          </div>
          <ez-article-reactions .article=${article}></ez-article-reactions>
          <div class="previews">
            <a class="card-link">
              <div class="card">
                <div class="card-content">
                  Article précédent
                </div>
              </div>
            </a>
            <a class="card-link">
              <div class="card">
                <div class="card-content">
                  Article suivant
                </div>
              </div>
            </a>
          </div>
          <a href="/" class="button" @click="${navigate('/')}">
            ${translate('article_detail.home_btn')}
          </a>
          <ez-article-comments articleId=${article._id}></ez-article-comments>
          <ez-article-author></ez-article-author>
        </footer>
      </article>
    `;
  }

  render() {
    const { posterLoaded, posterUrl, percentRemaining, article } = this;

    return html`
      <ez-navbar></ez-navbar>
      ${posterUrl
        ? html`
            <figure
              class="poster ${posterLoaded ? 'loaded' : ''}"
              style="background-image: url('${posterUrl}')"
            ></figure>
          `
        : nothing}
      <div class="timeline">
        <div style="width: ${percentRemaining + '%'};"></div>
      </div>
      <ez-page .navbar="${false}">
        <section class="container">
          ${article
            ? this.showArticleDetail()
            : html`
                <div class="placeholder"></div>
              `}
        </section>
      </ez-page>
    `;
  }
}

customElements.define('ez-article-detail', ArticleDetail);
