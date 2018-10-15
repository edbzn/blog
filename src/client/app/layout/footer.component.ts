import { LitElement } from '@polymer/lit-element/lit-element';
import { html, TemplateResult } from 'lit-html';

import heart from '../../assets/images/heart';

export default class Footer extends LitElement {
  render(): TemplateResult {
    return html`
      <style scoped>
        footer {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #313131;
          font-size: 0.8rem;
        }

        .heart svg {
          padding-left: 0.6rem;
          width: 24px;
          fill: #df3e3e;
        }
      </style>
      <footer>
        <span>Made with</span>
        <i class="heart">${heart}</i>
      </footer>
    `;
  }
}
