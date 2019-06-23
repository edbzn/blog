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

  placeholders = Array(8)
    .fill(true)
    .map(Boolean);

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
    if (this.showAdminActions) {
      query.includeDrafts = true;
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

        .tag.main {
          display: block;
          padding: 0 8px;
          height: 32px;
          line-height: 32px;
          font-size: 1rem;
          background: #40a8ff;
          color: #fff;
          border-radius: 8px;
          border: none;
          text-transform: capitalize;
        }

        .poster {
          height: 200px;
          background-color: #f5f5f5;
        }

        .poster > figure {
          height: 200px;
          margin: 0;
          opacity: 0;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          transition: opacity 0.2s ease-in-out;
        }

        .poster figure.loaded {
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

        .placeholder {
          margin-bottom: 1.5rem;
        }

        .placeholder div:nth-child(1) {
          height: 25px;
          width: 25%;
          display: inline-block;
          margin: 12px;
          border-radius: 4px;
          background: #f5f5f5;
        }

        .placeholder div:nth-child(2) {
          height: 25px;
          width: 45%;
          float: right;
          margin: 12px;
          border-radius: 4px;
          background: #f5f5f5;
        }

        .placeholder div:nth-child(3) {
          height: 200px;
          margin: 1rem 0;
          margin-top: 0;
          background: #f5f5f5;
        }

        .placeholder div:nth-child(4) {
          width: 90%;
          height: 30px;
          margin: 12px;
          border-radius: 4px;
          background: #f5f5f5;
        }

        .placeholder div:nth-child(5) {
          height: 60px;
          margin: 12px;
          margin-bottom: 24px;
          border-radius: 4px;
          background: #f5f5f5;
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
                    <div class="poster">
                      <figure
                        class="${this.imagesLoaded[article._id] ? 'loaded' : ''}"
                        style="background-image: url('${article.posterUrl}')"
                      ></figure>
                    </div>
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
    const { moreResult, loading, page } = this.state;

    return html`
      <section class="section">
        <header class="feed-header">
          <h4 class="subtitle">articles</h4>
          ${this.tags.length > 0
            ? html`
                <span class="tag main">${this.tags[0]}</span>
              `
            : nothing}
        </header>
        ${loading && page === 1
          ? this.placeholders.map(
              () => html`
                <div class="card placeholder" no-hover>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              `
            )
          : this.articleList()}
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
