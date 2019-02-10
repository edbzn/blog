export const loadHome = () =>
  Promise.all([
    import(/* webpackChunkName: "app-home" */ "./app/core/components/home/home.component"),
    import(/* webpackChunkName: "app-home" */ "./app/core/components/home/profile.component"),
    import(/* webpackChunkName: "app-home" */ "./app/core/components/home/twitter-feed.component"),
    import(/* webpackChunkName: "app-home" */ "./app/core/components/article-feed/article-feed.component"),
    
  ]);

export const loadLogin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-login" */ "./app/core/components/login/login.component"),
  ]);

export const loadArticleDetail = () =>
  Promise.all([
    import(/* webpackChunkName: "app-article" */ "./app/core/components/article-detail/article-detail.component"),
    import(/* webpackChunkName: "app-article" */ "./app/core/components/article-detail/article-comment.component"),
    import(/* webpackChunkName: "app-article" */ "./app/core/components/article-detail/article-content.component"),
  ]);

export const loadArticlesByTag = () =>
  Promise.all([
    import(/* webpackChunkName: "app-articles-by-tag" */ "./app/core/components/article-feed-by-tag/article-feed-by-tag.component"),
    import(/* webpackChunkName: "app-articles-by-tag" */ "./app/core/components/article-feed/article-feed.component"),
  ]);

export const loadAdmin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-admin" */ "./app/core/components/admin/admin.component"),
    import(/* webpackChunkName: "app-admin" */ "./app/core/components/admin/draft.component"),
    import(/* webpackChunkName: "app-admin" */ "./app/core/components/article-feed/article-feed.component"),
  ]);

export const loadError = () =>
  Promise.all([
    import(/* webpackChunkName: "app-error" */ "./app/core/components/error/error.component"),
  ]);
