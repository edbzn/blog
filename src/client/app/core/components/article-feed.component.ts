import { format } from 'date-fns';
import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';

import { Article } from '../../components/admin/types';
import { tags } from '../../shared/tags';
import { ResourceCollection } from '../../utils/collection';
import check from '../../utils/icons/check';
import { navigate } from '../../utils/navigate';
import { translate } from '../directives/translate.directive';
import { apiClient } from '../services/api-client';
import { errorHandlerService } from '../services/error-handler-service';
import { languageService } from '../services/language-service';

export default class ArticleFeedComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
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
        background-color: #eee;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        transition: 150ms ease;
      }

      .card-link {
        display: block;
        margin-bottom: 1.5rem;
        color: #222;
        text-decoration: none;
      }

      .card {
        border: 1px solid #eee;
        border-radius: 8px;
        transition: 150ms ease;
      }

      .card:hover {
        box-shadow: 0 0 3px rgba(34, 34, 34, 0.2);
      }

      .card:last-child {
        margin-bottom: 0;
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

      .card-header {
        font-family: 'IBM Plex Sans Condensed', sans-serif;
      }

      .card-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 0;
      }

      .card-header,
      .card-content,
      .card-footer {
        padding: 12px;
      }

      .load-complete svg {
        width: 24px;
        fill: #666;
      }

      .load-more {
        display: block;
        width: 100%;
        height: 42px;
        border: 1px solid #eee;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        color: #222;
        font-size: 0.8rem;
        transition: 150ms ease;
      }

      .load-more:hover {
        background: #eee;
      }

      .load-more:focus {
        outline: none;
        border: 2px solid #eee;
      }

      .load-more[disabled] {
        background: #fff;
        cursor: default;
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
        .card-header-inner .left {
          margin-bottom: 4px;
        }

        .section {
          padding: 1rem 0.8rem;
        }
      }
    `;
  }

  @property({ type: Array })
  tags = [];

  @property({ type: Boolean })
  adminMode = false;

  @property({ type: Array })
  articleCollection: Article[] = [];

  @property({ type: Boolean })
  loading = true;

  page = 1;

  limit = 4;

  articleRemaining = true;

  firstUpdated() {
    this.updateArticleCollection();
  }

  updated(props: Map<string | number | symbol, unknown>) {
    const oldTags = props.get('tags');
    if (oldTags instanceof Array && oldTags !== this.tags) {
      this.updateArticleCollection();
    }
  }

  updateArticleCollection(): void {
    this.getArticleCollection().then(articleCollection => {
      const { collection, total } = articleCollection;
      this.articleCollection = collection;
      this.articleRemaining = total > this.articleCollection.length;
      this.loading = false;
      this.requestUpdate();
    });
  }

  getArticleCollection(): Promise<ResourceCollection<Article>> {
    return this.adminMode
      ? apiClient.get<ResourceCollection<Article>>(
          encodeURI(`/api/v1/draft?sortDir=-1&sortBy=_id&limit=${this.limit}&page=${this.page}`)
        )
      : apiClient.get<ResourceCollection<Article>>(
          encodeURI(
            `/api/v1/article?sortDir=-1&sortBy=_id&limit=${this.limit}&page=${this.page}${this.tags
              .map(tag => '&tags[]=' + tag)
              .toString()
              .replace(',', '')}`
          )
        );
  }

  deleteArticle(id: string): Promise<void> {
    return apiClient.delete(`/api/v1/article/${id}`);
  }

  stripTagsAndTruncate(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 180);
  }

  async loadMore(): Promise<void> {
    if (!this.articleRemaining) {
      return Promise.reject('All article are already loaded');
    }

    this.loading = true;

    ++this.page;
    const { collection, total } = (await this.getArticleCollection()) as ResourceCollection<
      Article
    >;

    this.articleCollection = [...(this.articleCollection as Article[]), ...collection];
    this.articleRemaining = total > this.articleCollection.length;
    this.loading = false;
    this.requestUpdate();
  }

  async removeArticle(article: Article): Promise<void> {
    const articleTitle = article.title;
    if (
      (prompt('Enter ' + articleTitle + ' to delete the article') || '').toLowerCase() ===
      articleTitle.toLowerCase()
    ) {
      try {
        await this.deleteArticle(article._id);
        this.articleCollection = (this.articleCollection || []).filter(
          _article => article._id !== _article._id
        );
        this.requestUpdate();
      } catch (error) {
        errorHandlerService.throw(error);
      }
    }
  }

  articleList(): TemplateResult {
    return html`
      ${repeat(this.articleCollection, (article: Article) => {
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
                  ${tags(article, this.adminMode)}
                </p>
              </header>
              ${article.posterUrl
                ? html`
                    <figure
                      class="poster card-image"
                      style="background-image: url('${article.posterUrl}')"
                    ></figure>
                  `
                : nothing}
              <div class="card-content">
                <h3 class="title">${article.title}</h3>
                <p>${this.stripTagsAndTruncate(article.html) + '...'}</p>
              </div>

              ${this.adminMode
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
                        @click="${this.removeArticle.bind(this, article)}"
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
        ${this.articleCollection ? this.articleList() : nothing}
        <button
          title="${translate('article_feed.more')}"
          class="button load-more ${this.loading ? 'is-loading' : nothing}"
          ?disabled="${this.articleRemaining ? false : true}"
          @click="${this.loadMore}"
        >
          ${this.articleRemaining
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
