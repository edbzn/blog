import { html } from "lit-html";

export const placeholder = (
  opt = { count: 5, minLines: 1, maxLines: 5, box: true, image: false },
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

        .image-placeholder {
          height: 200px;
          background: #cdcdcd;
        }
      </style>
      <article class="${opt.box ? "box" : ""}">
        ${opt.image ? html`<div class="image-placeholder"></div>` : ""}
        ${Array(Math.floor(Math.random() * opt.maxLines) + opt.minLines)
          .fill("")
          .map(
            () => html`
              <div class="placeholder"
                style="width: ${Math.floor(Math.random() * 50) + 50}%">
              </div>`,
          )}
      </article>
    `,
    );
};
