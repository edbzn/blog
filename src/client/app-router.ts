import { render, html } from "lit-html";
import { browserRouter } from "prouter";

const router = browserRouter();

router
  .use("/", (_req, resp) => {
    render(html`<ez-home></ez-home>`, document.body);
    resp.end();
  })
  .use("/login", (_req, resp) => {
    render(html`<ez-login></ez-login>`, document.body);
    resp.end();
  })
  .use("/article/:id", (req, resp) => {
    const id = req.params.id;
    render(
      html`<ez-article-detail @id="${id}"></ez-article-detail>`,
      document.body,
    );
    resp.end();
  })
  .use("/admin", (_req, resp) => {
    render(html`<ez-admin></ez-admin>`, document.body);
    resp.end();
  })
  .use("/error", (_req, resp) => {
    render(html`<ez-error></ez-error>`, document.body);
    resp.end();
  })
  .use("*", (_req, resp) => {
    router.push("/error");
    resp.end();
  });

router.listen();

export default router;
