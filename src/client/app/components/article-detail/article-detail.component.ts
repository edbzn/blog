import { distanceInWords, format } from 'date-fns';
import { css, html, LitElement, property } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';
import { apiClient } from '../../core/services/api-client';
import { errorHandlerService } from '../../core/services/error-handler-service';
import { languageService } from '../../core/services/language-service';
import { placeholder } from '../../shared/placeholder';
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

  firstUpdated(): void {
    this.init()
      .then(() => {
        this.handleScrollChange();
        this.setPageMeta();
      })
      .catch(e => {
        errorHandlerService.throw(e);
      });
  }

  async init(): Promise<void> {
    try {
      this.article = await this.getArticle();
      this.posterUrl = this.article.posterUrl as string;
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
      typeof this.article!.metaTitle === 'string' ? (this.article!.metaTitle as string) : undefined;
    const metaDescription =
      typeof this.article!.metaDescription === 'string'
        ? (this.article!.metaDescription as string)
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

  disconnectedCallback(): void {
    this.removeEventListener('scroll', this
      .calculateRemainingHandler as EventListenerOrEventListenerObject);
  }

  static get styles() {
    return css`
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

      .profile {
        margin: 0 auto;
        display: flex;
        align-items: center;
      }

      .follow-me {
        max-height: 36px;
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

      .date {
        text-transform: capitalize;
        font-weight: 100;
        font-size: 14px;
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

      @media screen and (max-width: 600px) {
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
        .container.section {
          padding: 3rem 0.8rem;
        }
      }
    `;
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
              ${distanceInWords(new Date(article.publishedAt!), new Date(), {
                locale: languageService.dateFnsLocale,
              })}
              ${languageService.getLang() === 'en' ? ' ago' : null}
            </span>
          </div>
          <ez-article-reactions .article=${article}></ez-article-reactions>
          <a href="/" class="button back-to-home" @click="${navigate('/')}">
            ${translate('article_detail.home_btn')}
          </a>
          <ez-article-comments articleId=${article._id}></ez-article-comments>
          <ez-article-author></ez-article-author>
        </footer>
      </article>
    `;
  }

  render() {
    return html`
      <ez-navbar></ez-navbar>
      ${this.posterUrl
        ? html`
            <figure class="poster" style="background-image: url('${this.posterUrl}')"></figure>
          `
        : html`
            <div class="poster"></div>
          `}
      <div class="timeline">
        <div style="width: ${this.percentRemaining + '%'};"></div>
      </div>
      <ez-page .navbar="${false}">
        <section class="container">
          ${this.article
            ? this.showArticleDetail()
            : placeholder({
                count: 1,
                minLines: 200,
                maxLines: 300,
                box: false,
                image: false,
              })}
        </section>
      </ez-page>
    `;
  }
}

customElements.define('ez-article-detail', ArticleDetail);
