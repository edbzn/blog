import { html, TemplateResult } from "lit-html";
import { profile } from "./profile";
import { twitterFeed } from "./twitter-feed";
import { LitElement } from "@polymer/lit-element/lit-element";

export default class Home extends LitElement {
  profileConfiguration = {
    name: "Edouard Bozon",
    description: `Web developer at <a class="link" href="https://www.cospirit.com/">@CoSpirit</a> from French Alps. I play every day with #TypeScript and #PHP.`,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/963311893279625216/xdYbJgZm_400x400.jpg",
  };

  render(): TemplateResult {
    return html`
      <style>
        :host {
          display: block;
        }
        .link {
          text-decoration: underline;
        }
      </style>
      <ez-navbar></ez-navbar>
      ${profile(this.profileConfiguration)}
      <ez-page .navbar=${false}>
        ${twitterFeed()}
        <ez-article-feed></ez-article-feed>
      </ez-page>
    `;
  }
}
