import { html } from "lit-html";
import page from "./layout/page";
import { profile } from "./profile";
import { twitterFeed } from "./twitter-feed";

const profileConfiguration = {
  name: "Edouard Bozon",
  description:
    "Web developer at @CoSpirit from French Alps. I play every day with #TypeScript and #PHP",
  avatarUrl:
    "https://pbs.twimg.com/profile_images/963311893279625216/xdYbJgZm_400x400.jpg",
};

const home = html`
<style scoped>
</style>
${profile(profileConfiguration)}
${twitterFeed()}
`;

export default page(home);
