import { html } from "lit-html";
import { until } from "lit-html/directives/until";
import { showPlaceholder } from "./placeholder.component";

const getTweets = async (): Promise<{ statuses: any[] }> => {
  const resp = await fetch(`http://localhost:8081/api/v1/tweet`, {
    method: "GET",
    mode: "cors",
    cache: "default",
  });

  return resp.json();
};

const showTweets = (resp: any) => {
  return resp.statuses.map(
    (tweet: any) => html`
      <article>${tweet.text}</article>
    `,
  );
};

export const twitterFeed = () => {
  return html`
    <style scoped>
      .twitter-feed {
        padding-top: 40px;
        margin-top: 40px;
        border-top: 2px solid #f8f8f8;
      }

      article {
        padding: 1.4rem;
        margin-bottom: 4px;
        background: #f8f8f8;
        border-radius: 2px;
        color: #585858;
      }
    </style>
    <section class="twitter-feed">
      <h4>TWEETS</h4>
      ${until(getTweets().then(resp => showTweets(resp)), showPlaceholder())}
    </section>
  `;
};
