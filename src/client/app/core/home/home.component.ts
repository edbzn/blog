import { html, TemplateResult } from "lit-html";
import { twitterFeed } from "./twitter-feed";
import { LitElement } from "@polymer/lit-element/lit-element";
import { profileConfiguration } from "../../utils/profile-config";

export default class Home extends LitElement {
  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        :host {
          display: block;
        }
        .link {
          text-decoration: underline;
        }
      </style>
      <ez-navbar></ez-navbar>
      <ez-profile .profile="${profileConfiguration}"></ez-profile>
      <ez-page .navbar="${false}">
        <ez-article-feed></ez-article-feed>
        ${twitterFeed()}
      </ez-page>
    `;
  }
}
