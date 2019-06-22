import { distanceInWordsToNow } from 'date-fns';
import { css, html, LitElement, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs/operators';

import { translate } from '../../core/directives/translate.directive';
import { languageService } from '../../core/services';
import { cardStyle } from '../../shared/card';

const getEmoji = (type: string): string => {
  switch (type) {
    case 'DeleteEvent':
      return '🗑';
    case 'PushEvent':
      return '🚀';
    case 'PullRequestEvent':
      return '🔄';
    case 'CreateEvent':
      return '➕';
    case 'WatchEvent':
      return '⭐️';
    default:
      return '🔵';
  }
};

const getDescription = (event: any) => {
  switch (event.type) {
    case 'DeleteEvent':
      return html`
        <code>${event.payload.ref}</code>
      `;
    case 'PushEvent':
      return html`
        Pushed
        <code>${event.payload.ref}</code> - ${event.payload.size}
        ${event.payload.size > 1 ? 'commits' : 'commit'}
      `;
    case 'PullRequestEvent':
      return '🔄';
    case 'CreateEvent':
      return `${event.payload.description}`;
    case 'WatchEvent':
      return '⭐️';
    default:
      return '🔵';
  }
};

export default class GitHubFeedComponent extends LitElement {
  initialized = false;
  events: any;

  firstUpdated() {
    fromFetch(`https://api.github.com/users/edouardbozon/events`)
      .pipe(mergeMap(response => response.json()))
      .subscribe({
        next: events => {
          this.events = events.slice(0, 10);
        },
        complete: () => {
          this.initialized = true;
          this.requestUpdate();
        },
      });
  }

  showActivity(): TemplateResult {
    return html`
      ${repeat(
        this.events,
        (event: any) => html`
          <article class="card">
            <div class="card-content">
              <header>
                <a href="${event.repo.url}">${event.repo.name}</a> -
                <span>
                  Il y a
                  ${distanceInWordsToNow(new Date(event.created_at), {
                    locale: languageService.dateFnsLocale,
                  })}
                </span>
              </header>
              <div>
                <span class="emoji">${getEmoji(event.type)}</span>
                <span>${getDescription(event)}</span>
              </div>
            </div>
          </article>
        `
      )}
    `;
  }

  static get styles() {
    return [
      cardStyle,
      css`
        :host {
          display: block;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        code {
          font-family: 'Fira Code';
        }

        .emoji {
          font-size: 1.1rem;
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

        .activity {
          padding-top: 0;
        }

        .tweet-content {
          margin: 10px 0;
        }

        .card {
          margin-bottom: 12px;
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

        @media screen and (max-width: 800px) {
          .activity {
            padding: 1rem 0.8rem;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      ${!this.initialized
        ? html`
            <section class="activity">
              <h4 class="subtitle">github</h4>
              ${html`
                Loading...
              `}
            </section>
          `
        : html`
            <section class="activity">
              <h4 class="subtitle uppercase">github</h4>
              ${this.showActivity()}
            </section>
          `}
    `;
  }
}

customElements.define('ez-github-feed', GitHubFeedComponent);
