import { html } from "lit-html";
import { until } from "lit-html/directives/until";
import { showPlaceholder } from "../../shared/placeholder";
import _fetch from "../../utils/fetch";
import { apiClient } from "../../utils/api";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { timeSince } from "../../utils/time-since";

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
              <p>
                <strong>${tweet.user.name}</strong>
                <small>@${tweet.user.screen_name.toLowerCase()}</small> 
                - <small>${timeSince(new Date(tweet.created_at))} ago</small>
                <br>
                ${unsafeHTML(tweet.text)}
              </p>
            </div>
          </div>
        </article>
      </div>
    `,
  );
};

export const twitterFeed = () => {
  return html`
    <link href="assets/css/bulma.min.css" rel="stylesheet">
    <style scoped>.uppercase { text-transform: uppercase; }</style>
    <section class="section">
      <h4 class="subtitle uppercase">tweets</h4>
      ${until(
        getTweets().then(resp => showTweets(resp)),
        showPlaceholder({ count: 4, minLines: 1, maxLines: 3, box: true }),
      )}
    </section>
  `;
};
