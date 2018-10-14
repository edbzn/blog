import { html } from "lit-html";

let items: any[] = [];

export async function getTweets(fromUserName: string): Promise<Response> {
  const headers = new Headers();

  return await fetch(`http://localhost:8081`);
}

getTweets("edouardbozon").then(resp => {
  console.log(resp);
});

export const twitterFeed = () => html`
<style scoped>
  .twitter-feed {
    padding-top: 40px;
    margin-top: 40px;
    border-top: 2px solid #dfdfdf;
  }

  article {
    padding: 1.4rem;
    background: #dfdfdf;
    border-radius: 2px;
  }
</style>
<section class="twitter-feed">
  ${items.map(
    tweet => html`
    <article>${tweet.title}</article>
  `,
  )}
</section>
`;
