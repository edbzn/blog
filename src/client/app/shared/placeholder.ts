import { html } from "lit-html";

export const showPlaceholder = (count: number = 5) => {
  return Array(count)
    .fill(true)
    .map(
      () => html`
      <style>
        .placeholder {
          margin-top: 6px;
          height: 12px;
          background: #cdcdcd;
        }
      </style>
      <article class="box">
        ${Array(Math.floor(Math.random() * 3) + 1)
          .fill("")
          .map(
            () =>
              html`
              <div class="placeholder"
                style="width: ${Math.floor(Math.random() * 50) + 50}%">
              </div>`,
          )}
      </article>
    `,
    );
};
