import { html } from "lit-html";

export const showPlaceholder = (
  opt = { count: 5, minLines: 1, maxLines: 5, box: true },
) => {
  return Array(opt.count)
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
      <article class="${opt.box ? "box" : ""}">
        ${Array(Math.floor(Math.random() * opt.maxLines) + opt.minLines)
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
