import anchorme from 'anchorme';
import { distanceInWordsToNow } from 'date-fns';
import { css, html, LitElement, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { apiClient } from '../../core/services/api-client';
import { languageService } from '../../core/services/language-service';
import { cardStyle } from '../../shared/card';
import like from '../../utils/icons/like';
import retweet from '../../utils/icons/retweet';

export default class TwitterFeedComponent extends LitElement {
  static get styles() {
    return [
      cardStyle,
      css`
        :host {
          display: block;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        a {
          color: #40a8ff;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .subtitle {
          text-transform: uppercase;
          font-family: 'IBM Plex Sans Condensed', sans-serif;
        }

        .retweet svg,
        .heart svg {
          width: 18px;
        }

        .retweet svg {
          fill: #2dae5a;
        }

        .heart svg {
          fill: #df3e3e;
        }

        footer span {
          margin-right: 10px;
        }

        .twitter {
          padding-top: 0;
        }

        .tweet-content {
          margin: 10px 0;
        }

        footer {
          display: flex;
        }

        footer span {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        footer span i {
          height: 18px;
          margin-right: 8px;
        }

        .card {
          margin-bottom: 12px;
        }

        @media screen and (max-width: 800px) {
          .twitter {
            padding: 1rem 0.8rem;
          }
        }
      `,
    ];
  }

  initialized = false;
  tweets: { statuses: any[] } = { statuses: [] };

  firstUpdated() {
    this.getTweets();
  }

  async getTweets(): Promise<void> {
    this.tweets = await apiClient.get<{ statuses: any[] }>('/api/v1/tweet');
    this.initialized = true;
    this.requestUpdate();
  }

  showTweets(): TemplateResult {
    return html`
      ${repeat(
        this.tweets.statuses,
        (tweet: any) => html`
          <article class="card" no-hover>
            <div class="card-content">
              <header>
                <strong>${tweet.user.name}</strong>
                <a href="https://twitter.com/${tweet.user.screen_name.toLowerCase()}">
                  <small>@${tweet.user.screen_name.toLowerCase()}</small>
                </a>
                -
                <small>
                  Il y a
                  ${distanceInWordsToNow(new Date(tweet.created_at), {
                    locale: languageService.dateFnsLocale,
                  })}
                </small>
              </header>
              <div class="tweet-content">
                ${unsafeHTML(anchorme(tweet.text))}
              </div>
              <footer>
                <span>
                  <i class="heart">${like}</i>
                  ${tweet.favorite_count}
                </span>
                <span>
                  <i class="retweet">${retweet}</i>
                  ${tweet.retweet_count}
                </span>
              </footer>
            </div>
          </article>
        `
      )}
    `;
  }

  render() {
    return html`
      ${!this.initialized
        ? html`
            <section class="twitter">
              <h4 class="subtitle">tweets</h4>
              ${html`
                Loading...
              `}
            </section>
          `
        : this.initialized && this.tweets.statuses.length > 0
        ? html`
            <section class="twitter">
              <h4 class="subtitle uppercase">tweets</h4>
              ${this.showTweets()}
            </section>
          `
        : null}
    `;
  }
}

customElements.define('ez-twitter-feed', TwitterFeedComponent);
