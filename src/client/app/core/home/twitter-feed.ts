import anchorme from "anchorme";
import { distanceInWords } from "date-fns";
import * as frLocale from "date-fns/locale/fr";
import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { until } from "lit-html/directives/until";

import { placeholder } from "../../shared/placeholder";
import like from "../../utils/icons/like";
import retweet from "../../utils/icons/retweet";
import { apiClient } from "../api";

const getTweets = async (): Promise<{ statuses: any[] }> => {
  return apiClient.get<{ statuses: any[] }>("/api/v1/tweet");
};

const showTweets = (resp: any) => {
  return resp.statuses.map(
    (tweet: any) => html`
      <div class="box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <header>
                <strong>${tweet.user.name}</strong>
                <a
                  href="https://twitter.com/${
                    tweet.user.screen_name.toLowerCase()
                  }"
                >
                  <small>@${tweet.user.screen_name.toLowerCase()}</small>
                </a>
                -
                <small>
                  Il y a ${
                    distanceInWords(new Date(tweet.created_at), new Date(), {
                      locale: frLocale,
                    })
                  }
                </small
                >
              </header>
              <div class="content">${unsafeHTML(anchorme(tweet.text))}</div>
              <footer>
                <span>
                  <i class="heart">${like}</i> ${tweet.favorite_count}
                </span>
                <span>
                  <i class="retweet">${retweet}</i> ${tweet.retweet_count}
                </span>
              </footer>
            </div>
          </div>
        </article>
      </div>
    `,
  );
};

export const twitterFeed = () => {
  return html`
    <link href="assets/css/bulma.min.css" rel="stylesheet" />
    <style>
      .uppercase {
        text-transform: uppercase;
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
    </style>
    <section class="section">
      <h4 class="subtitle uppercase">tweets</h4>
      ${
        until(
          getTweets().then(resp => showTweets(resp)),
          placeholder({
            count: 4,
            minLines: 1,
            maxLines: 3,
            box: true,
            image: false,
          }),
        )
      }
    </section>
  `;
};
