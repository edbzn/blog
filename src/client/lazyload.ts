export const loadHome = () =>
  Promise.all([
    import(/* webpackChunkName: "app-home" */ './app/components/home/home.component'),
    import(/* webpackChunkName: "app-home" */ './app/components/home/profile.component'),
    import(/* webpackChunkName: "app-home" */ './app/components/home/twitter-feed.component'),
    import(
      /* webpackChunkName: "app-home" */ './app/components/article-feed/article-feed.component'
    ),
  ]);

export const loadLogin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-login" */ './app/components/login/login.component'),
  ]);

export const loadArticleDetail = () =>
  Promise.all([
    import(
      /* webpackChunkName: "app-article" */ './app/components/article-detail/article-detail.component'
    ),
    import(
      /* webpackChunkName: "app-article" */ './app/components/article-detail/article-comment.component'
    ),
    import(
      /* webpackChunkName: "app-article" */ './app/components/article-detail/article-content.component'
    ),
    import(
      /* webpackChunkName: "app-article" */ './app/components/article-detail/article-reactions.component'
    ),
  ]);

export const loadArticlesByTag = () =>
  Promise.all([
    import(
      /* webpackChunkName: "app-articles-by-tag" */ './app/components/article-feed-by-tag/article-feed-by-tag.component'
    ),
    import(
      /* webpackChunkName: "app-articles-by-tag" */ './app/components/article-feed/article-feed.component'
    ),
  ]);

export const loadAdmin = () =>
  Promise.all([
    import(/* webpackChunkName: "app-admin" */ './app/components/admin/admin.component'),
    import(/* webpackChunkName: "app-admin" */ './app/components/admin/draft.component'),
    import(
      /* webpackChunkName: "app-admin" */ './app/components/article-feed/article-feed.component'
    ),
  ]);

export const loadError = () =>
  Promise.all([
    import(/* webpackChunkName: "app-error" */ './app/components/error/error.component'),
  ]);
