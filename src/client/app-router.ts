import { html, render } from 'lit-html';
import { browserRouter, ProuterNavigationEvent, routerGroup } from 'prouter';

import { authService } from './app/core/authentication-service';
import { actions, states } from './app/core/components/admin/draft.stream';
import { errorHandlerService } from './app/core/error-handler-service';
import { unAuthenticatedErrorMsg } from './app/utils/unauthenticated-error';
import { loadAdmin, loadArticleDetail, loadArticlesByTag, loadError, loadHome, loadLogin } from './lazyload';

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
    
    if (null === errorHandlerService.getLastError()) {
      router.push("/");
      resp.end();
      return;
    }

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
