import { html, render } from "lit-html";
import { browserRouter, ProuterNavigationEvent } from "prouter";
import { authService } from "./app/utils/auth";
import { unAuthenticatedErrorMsg } from "./app/utils/unauthenticated-error";
import { createErrorURI } from "./app/utils/show-error";

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
      html`<ez-article-detail id="${id}"></ez-article-detail>`,
      document.body,
    );
    resp.end();
  })
  .use("/admin", (_req, resp) => {
    if (!authService.authenticated) {
      router.push(createErrorURI(unAuthenticatedErrorMsg));
    } else {
      render(html`<ez-admin></ez-admin>`, document.body);
    }
    resp.end();
  })
  .use("/admin/draft", (req, resp) => {
    if (!authService.authenticated) {
      router.push(createErrorURI(unAuthenticatedErrorMsg));
    } else {
      render(html`<ez-draft id=${req.query.id}></ez-draft>`, document.body);
    }
    resp.end();
  })
  .use("/error", (req, resp) => {
    const message = req.query.message;

    render(html`<ez-error message="${message}"></ez-error>`, document.body);
    resp.end();
  })
  .use("*", (_req, resp) => {
    router.push(createErrorURI(unAuthenticatedErrorMsg));
    resp.end();
  });

router.listen();

router.on("navigation", (_e: ProuterNavigationEvent) => {
  window.scrollTo({ top: 0 });
});

export default router;
