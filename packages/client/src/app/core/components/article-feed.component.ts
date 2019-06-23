import { format } from 'date-fns';
import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { connect } from 'pwa-helpers';
import { Subject } from 'rxjs';

import { buttonStyle } from '../../shared/button';
import { cardStyle } from '../../shared/card';
import { tags } from '../../shared/tags';
import check from '../../utils/icons/check';
import { navigate } from '../../utils/navigate';
import { translate } from '../directives/translate.directive';
import { languageService } from '../services/language-service';
import { ArticleQuery, clearArticles, loadArticles } from '../store/client.actions';
import { ClientState } from '../store/client.state';
import { AppState } from '../store/state';
import { store } from '../store/store';

export default class ArticleFeedComponent extends connect(store)(LitElement) {
  stateSubject = new Subject<ClientState>();
  state$ = this.stateSubject.asObservable();
  state: ClientState;

  imagesLoaded: { [id: string]: boolean } = {};

  @property({ type: Array })
  tags: string[] = [];

  @property({ type: Boolean })
  showAdminActions = false;

  firstUpdated(): void {
    this.loadArticles();
  }

  stateChanged(state: AppState): void {
    this.state = state.client;
    this.stateSubject.next(state.client);
    this.loadPosters();
    this.requestUpdate('state');
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'tags') {
        store.dispatch(clearArticles());
        this.loadArticles();
      }
    });
  }

  stripTagsAndTruncate(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 180);
  }

  loadMore(): void {
    if (!this.state.moreResult) {
      return;
    }

    this.loadArticles({ next: true });
    this.requestUpdate();
  }

  private loadArticles({ next } = { next: false }): void {
    const { page, limit } = this.state;
    const query: ArticleQuery = { page, limit };
    if (next) {
      ++query.page;
    }
    if (this.tags.length > 0) {
      query.tags = this.tags;
    }

    store.dispatch(loadArticles(query));
  }

  private loadPosters(): void {
    this.state.articles.forEach(article => {
      if (!article.posterUrl) {
        return;
      }

      const img = new Image();
      img.src = article!.posterUrl;
      img.onload = () => {
        this.imagesLoaded = { ...this.imagesLoaded, [article._id]: true };
        this.requestUpdate();
      };
      img.onerror = () => {
        this.imagesLoaded = { ...this.imagesLoaded, [article._id]: false };
        this.requestUpdate();
      };
    });
  }

  static get styles() {
    return [
      cardStyle,
      buttonStyle,
      css`
        :host {
          display: block;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .subtitle {
          text-transform: uppercase;
          font-family: 'IBM Plex Sans Condensed', sans-serif;
        }

        .tag.is-primary {
          height: 32px;
          line-height: 32px;
          font-size: 1rem;
          background: #40a8ff;
          color: #fff;
          transition: none;
          border-radius: 8px;
        }

        .tag.is-primary:hover {
          background: #40a8ff;
        }

        .poster {
          height: 200px;
          margin: 0;
          opacity: 0;
          background-color: #eee;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          transition: opacity 0.2s ease-in-out;
        }

        .poster.loaded {
          opacity: 1;
        }

        .left {
          margin-right: 12px;
          font-weight: 200;
          text-transform: capitalize;
        }

        .left:not(.lang) {
          font-size: 0.9rem;
        }

        .lang {
          font-size: 0.9rem;
          margin-right: 4px;
        }

        .load-complete svg {
          margin-top: 4px;
          width: 24px;
          fill: #666;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .feed-header h4 {
          margin: 0;
        }

        .feed-header .tag {
          text-transform: capitalize;
        }

        @media screen and (max-width: 800px) {
          .section {
            padding: 1rem 0.8rem;
          }
        }
      `,
    ];
  }

  articleList(): TemplateResult {
    const { articles } = this.state;

    return html`
      ${repeat(articles, article => {
        const articleUri = `/article/${article.slug}`;

        return html`
          <a
            class="card-link"
            href="${articleUri}"
            title="${translate('article_feed.read')} ${article.title}"
            @click="${navigate(articleUri)}"
          >
            <article class="card">
              <header class="card-header">
                <p class="card-header-inner">
                  <span class="left">
                    <span class="lang">[${article.lang.toUpperCase()}]</span>
                    ${article.published
                      ? format(new Date(article.publishedAt as string), 'dddd DD MMMM YYYY', {
                          locale: languageService.dateFnsLocale,
                        })
                      : nothing}
                  </span>
                  ${tags(article, this.showAdminActions)}
                </p>
              </header>
              ${article.posterUrl
                ? html`
                    <figure
                      class="poster ${this.imagesLoaded[article._id] ? 'loaded' : ''}"
                      style="background-image: url('${article.posterUrl}')"
                    ></figure>
                  `
                : nothing}
              <div class="card-content">
                <h3 class="title">${article.title}</h3>
                <p>${this.stripTagsAndTruncate(article.html) + '...'}</p>
              </div>

              ${this.showAdminActions
                ? html`
                    <footer class="card-footer">
                      <a
                        class="card-footer-item"
                        href="${`/admin/draft?id=${article._id}`}"
                        title="${translate('article_feed.edit')} ${article.title}"
                        @click="${navigate(`/admin/draft?id=${article._id}`)}"
                      >
                        ${translate('article_feed.edit')}
                      </a>
                      <a
                        class="card-footer-item"
                        type="button"
                        title="${translate('article_feed.remove')} ${article.title}"
                        @click="${() => {
                          throw new Error('not implemented');
                        }}"
                      >
                        ${translate('article_feed.remove')}
                      </a>
                    </footer>
                  `
                : nothing}
            </article>
          </a>
        `;
      })}
    `;
  }

  render() {
    const { moreResult, articles } = this.state;

    return html`
      <section class="section">
        <header class="feed-header">
          <h4 class="subtitle">articles</h4>
          ${this.tags.length > 0
            ? html`
                <span class="tag is-primary is-medium">${this.tags[0]}</span>
              `
            : nothing}
        </header>
        ${articles.length > 0 ? this.articleList() : nothing}
        <button
          title="${translate('article_feed.more')}"
          class="button load-more ${this.state.loading ? 'is-loading' : ''}"
          ?disabled="${moreResult ? false : true}"
          @click="${this.loadMore}"
        >
          ${this.state.moreResult
            ? translate('article_feed.more')
            : html`
                <span class="load-complete">${check}</span>
              `}
        </button>
      </section>
    `;
  }
}

customElements.define('ez-article-feed', ArticleFeedComponent);
