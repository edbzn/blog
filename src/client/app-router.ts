import { html, render } from "lit-html";
import { browserRouter, ProuterNavigationEvent } from "prouter";
import { authService } from "./app/core/authentication-service";
import { unAuthenticatedErrorMsg } from "./app/utils/unauthenticated-error";
import { createErrorURI } from "./app/utils/show-error";
import { setTitleAndMeta } from "./app/utils/set-document-meta";

const router = browserRouter();
const app = document.getElementById("app")!;

const loadHome = () =>
  Promise.all([
    import(/* webpackChunkName: "app-home" */ "./app/core/home/profile"),
    import(/* webpackChunkName: "app-home" */ "./app/core/home/twitter-feed.component"),
  ]);

const loadLogin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-login" */ "./app/core/login/login.component"),
  ]);

const loadArticleDetail = () =>
  Promise.all([
    import(/* webpackChunkName: "app-article" */ "./app/core/article-detail/article-detail.component"),
    import(/* webpackChunkName: "app-article" */ "./app/core/article-detail/article-comment.component"),
    import(/* webpackChunkName: "app-article" */ "./app/core/article-detail/article-content.component"),
  ]);

const loadArticlesByTag = () =>
  Promise.all([
    import(/* webpackChunkName: "app-articles-by-tag" */ "./app/core/article-feed-by-tag/article-feed-by-tag.component"),
  ]);

const loadAdmin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-admin" */ "./app/core/admin/admin.component"),
    import(/* webpackChunkName: "app-admin" */ "./app/core/admin/draft.component"),
  ]);

const loadError = () =>
  Promise.all([
    import(/* webpackChunkName: "app-error" */ "./app/core/error/error.component"),
  ]);

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
      app,
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
      app,
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
      app,
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
      app,
    );
    resp.end();
  })
  .use("/admin", async (_req, resp) => {
    if (!authService.authenticated) {
      router.push(createErrorURI(unAuthenticatedErrorMsg));
    } else {
      await loadAdmin();

      setTitleAndMeta("Codamit - Admin");
      render(
        html`
          <ez-admin></ez-admin>
        `,
        app,
      );
    }
    resp.end();
  })
  .use("/admin/draft", async (req, resp) => {
    if (!authService.authenticated) {
      router.push(createErrorURI(unAuthenticatedErrorMsg));
    } else {
      await loadAdmin();

      render(
        html`
          <ez-draft id="${req.query.id}"></ez-draft>
        `,
        app,
      );
    }
    resp.end();
  })
  .use("/error", async (req, resp) => {
    await loadError();

    const message = req.query.message;
    setTitleAndMeta("Codamit - Erreur");

    render(
      html`
        <ez-error message="${message}"></ez-error>
      `,
      app,
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
