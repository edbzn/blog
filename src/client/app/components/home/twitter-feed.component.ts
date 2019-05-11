import anchorme from 'anchorme';
import { distanceInWords } from 'date-fns';
import { css, html, LitElement, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { apiClient } from '../../core/services/api-client';
import { languageService } from '../../core/services/language-service';
import { placeholder } from '../../shared/placeholder';
import like from '../../utils/icons/like';
import retweet from '../../utils/icons/retweet';

export default class TwitterFeedComponent extends LitElement {
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

  showTweets(): TemplateResult[] {
    return this.tweets.statuses.map(
      (tweet: any) => html`
        
          <article class="card">
            <div class="card-content">
              <div class="content">
                <header>
                  <strong>${tweet.user.name}</strong>
                  <a href="https://twitter.com/${tweet.user.screen_name.toLowerCase()}">
                    <small>@${tweet.user.screen_name.toLowerCase()}</small>
                  </a>
                  -
                  <small>
                    Il y a
                    ${distanceInWords(new Date(tweet.created_at), new Date(), {
                      locale: languageService.dateFnsLocale,
                    })}
                  </small>
                </header>
                <div class="content">
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
            </div>
          </article>
      `
    );
  }

  static get styles() {
    return css`
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

      .card {
        margin-bottom: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;
      }

      .card-content {
        padding: 12px;
      }

      @media screen and (max-width: 600px) {
        .twitter {
          padding: 1rem 0.8rem;
        }
      }
    `;
  }

  render() {
    return html`
      ${!this.initialized
        ? html`
            <section class="twitter">
              <h4 class="subtitle">tweets</h4>
              ${placeholder({
                count: 4,
                minLines: 1,
                maxLines: 3,
                box: true,
                image: false,
              })}
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
