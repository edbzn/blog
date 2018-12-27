export const loadHome = () =>
  Promise.all([
    import(/* webpackChunkName: "app-home" */ "./app/core/home/profile"),
    import(/* webpackChunkName: "app-home" */ "./app/core/home/twitter-feed.component"),
  ]);

export const loadLogin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-login" */ "./app/core/login/login.component"),
  ]);

export const loadArticleDetail = () =>
  Promise.all([
    import(/* webpackChunkName: "app-article" */ "./app/core/article-detail/article-detail.component"),
    import(/* webpackChunkName: "app-article" */ "./app/core/article-detail/article-comment.component"),
    import(/* webpackChunkName: "app-article" */ "./app/core/article-detail/article-content.component"),
  ]);

export const loadArticlesByTag = () =>
  Promise.all([
    import(/* webpackChunkName: "app-articles-by-tag" */ "./app/core/article-feed-by-tag/article-feed-by-tag.component"),
  ]);

export const loadAdmin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-admin" */ "./app/core/admin/admin.component"),
    import(/* webpackChunkName: "app-admin" */ "./app/core/admin/draft.component"),
  ]);

export const loadError = () =>
  Promise.all([
    import(/* webpackChunkName: "app-error" */ "./app/core/error/error.component"),
  ]);
