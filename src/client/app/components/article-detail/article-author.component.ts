import { html, LitElement } from 'lit-element';

import { translate } from '../../core/directives/translate.directive';

export default class ArticleAuthorComponent extends LitElement {
  render() {
    return html`
      <div class="profile">
        <figure
          class="avatar"
          style="background-image: url('/assets/images/portrait.jpg')"
        ></figure>
        <div class="presentation has-text-dark">
          <strong>Edouard Bozon</strong><br />
          <span>${translate('profile.description')}</span>
          <div class="follow-me">
            <iframe
              src="https://platform.twitter.com/widgets/follow_button.html?screen_name=edouardbozon&show_screen_name=true&show_count=false"
              title="Follow me"
              width="148"
              height="26"
              style="margin-top: 12px; border: 0; overflow: hidden;"
            ></iframe>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ez-article-author', ArticleAuthorComponent);
