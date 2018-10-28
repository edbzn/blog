import { html, TemplateResult } from "lit-html";
import { profile } from "./profile";
import { twitterFeed } from "./twitter-feed";
import { LitElement } from "@polymer/lit-element/lit-element";

export default class Home extends LitElement {
  profileConfiguration = {
    name: "Edouard Bozon",
    description: `Web developer at <a class="link" href="https://www.cospirit.com/">@CoSpirit</a> from French Alps. I play every day with #TypeScript and #PHP.`,
    avatarUrl: "assets/images/portrait.jpg",
  };

  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet">
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
        <ez-article-feed></ez-article-feed>
        ${twitterFeed()}
      </ez-page>
    `;
  }
}
