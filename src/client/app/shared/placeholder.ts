import { html } from "lit-html";

export const showPlaceholder = (count: number = 5) => {
  return Array(count)
    .fill(true)
    .map(
      () => html`
      <style scoped>      
        article.placeholder {
          position: relative;
        }

        article.placeholder::after {
          content: '';
          display: block;
          position: absolute;
          left: 17px;
          right: 17px;
          top: 17px;
          bottom: 17px;
          background: #cdcdcd;
        }
      </style>
      <article class="placeholder"></article>
    `,
    );
};
