import { html, render } from "lit-html";
import { browserRouter, ProuterNavigationEvent, routerGroup } from "prouter";

import { actions, states } from "./app/core/admin/draft.store";
import { authService } from "./app/core/authentication-service";
import { errorHandlerService } from "./app/core/error-handler-service";
import { setTitleAndMeta } from "./app/utils/set-document-meta";
import { unAuthenticatedErrorMsg } from "./app/utils/unauthenticated-error";
import {
  loadAdmin,
  loadArticleDetail,
  loadArticlesByTag,
  loadError,
  loadHome,
  loadLogin,
} from "./lazyload";

const appSelector = document.getElementById("app")!;
const router = browserRouter();
const adminRoutes = routerGroup();

adminRoutes
  .use("*", (_req, resp, next) => {
    if (!authService.authenticated) {
      errorHandlerService.throw(unAuthenticatedErrorMsg);
      router.push("/error");
      resp.end();
      return;
    }
    next();
  })
  .use("/", async (_req, resp) => {
    await loadAdmin();

    setTitleAndMeta("Codamit - Admin");
    render(
      html`
        <ez-admin></ez-admin>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/draft", async (req, resp) => {
    await loadAdmin();

    const id = req.query.id;
    if (id) {
      actions.setId(id);
    }

    setTitleAndMeta("Draft");
    render(
      html`
        <ez-draft .actions="${actions}" .states="${states}"></ez-draft>
      `,
      appSelector,
    );
    resp.end();
  });

router
  .use("/", async (_req, resp) => {
    await loadHome();

    setTitleAndMeta(
      "Codamit - Tech Blog",
      "I share stuff about code, architecture and best practices",
    );
    render(
      html`
        <ez-home></ez-home>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/login", async (_req, resp) => {
    await loadLogin();

    setTitleAndMeta("Codamit - Connexion");
    render(
      html`
        <ez-login></ez-login>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/article/:id", async (req, resp) => {
    await loadArticleDetail();

    const id = req.params.id;
    const title = (req.query.title = req.query.title);
    setTitleAndMeta(title);
    render(
      html`
        <ez-article-detail id="${id}"></ez-article-detail>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/tag/:tag", async (req, resp) => {
    await loadArticlesByTag();

    const tag = req.params.tag;
    setTitleAndMeta(tag, "Tous les articles au sujet de " + tag);
    render(
      html`
        <ez-article-feed-by-tag tag=${tag}></ez-article-feed-by-tag>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/error", async (req, resp) => {
    await loadError();

    setTitleAndMeta("Codamit - Erreur");
    render(
      html`
        <ez-error message="${errorHandlerService.getLastError()}"></ez-error>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/admin", adminRoutes)
  .use("*", (_req, resp) => {
    errorHandlerService.throw("Heuuu, cette page n'existe pas...");
    router.push("/error");
    resp.end();
  });

router.listen();

router.on("navigation", (_e: ProuterNavigationEvent) => {
  window.scrollTo({ top: 0 });
});

export default router;
