import { html, render } from "lit-html";
import { browserRouter, ProuterNavigationEvent } from "prouter";
import { authService } from "./app/core/auth";
import { unAuthenticatedErrorMsg } from "./app/utils/unauthenticated-error";
import { createErrorURI } from "./app/utils/show-error";

const router = browserRouter();

router
  .use("/", (_req, resp) => {
    render(
      html`
        <ez-home></ez-home>
      `,
      document.body,
    );
    resp.end();
  })
  .use("/login", (_req, resp) => {
    render(
      html`
        <ez-login></ez-login>
      `,
      document.body,
    );
    resp.end();
  })
  .use("/article/:id", (req, resp) => {
    const id = req.params.id;

    render(
      html`
        <ez-article-detail id="${id}"></ez-article-detail>
      `,
      document.body,
    );
    resp.end();
  })
  .use("/tag/:tag", (req, resp) => {
    const tag = req.params.tag;

    render(
      html`
        <ez-page>
          <style>
            .last {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }
          </style>
          <ez-article-feed tags="${tag}"></ez-article-feed>
          <section class="section last">
            <a
              href="/"
              class="button is-block"
              @click="${
                (e: Event) => {
                  e.preventDefault();
                  router.push("/");
                }
              }"
            >
              Back to home
            </a>
          </section>
        </ez-page>
      `,
      document.body,
    );
    resp.end();
  })
  .use("/admin", (_req, resp) => {
    if (!authService.authenticated) {
      router.push(createErrorURI(unAuthenticatedErrorMsg));
    } else {
      render(
        html`
          <ez-admin></ez-admin>
        `,
        document.body,
      );
    }
    resp.end();
  })
  .use("/admin/draft", (req, resp) => {
    if (!authService.authenticated) {
      router.push(createErrorURI(unAuthenticatedErrorMsg));
    } else {
      render(
        html`
          <ez-draft id="${req.query.id}"></ez-draft>
        `,
        document.body,
      );
    }
    resp.end();
  })
  .use("/error", (req, resp) => {
    const message = req.query.message;

    render(
      html`
        <ez-error message="${message}"></ez-error>
      `,
      document.body,
    );
    resp.end();
  })
  .use("*", (_req, resp) => {
    router.push(createErrorURI("Page not Found"));
    resp.end();
  });

router.listen();

router.on("navigation", (_e: ProuterNavigationEvent) => {
  window.scrollTo({ top: 0 });
});

export default router;
