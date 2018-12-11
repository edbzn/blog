import Admin from "./app/core/admin/admin.component";
import Draft from "./app/core/admin/draft.component";
import Error from "./app/core/error/error.component";
import Home from "./app/core/home/home.component";
import Footer from "./app/core/layout/footer.component";
import NavBar from "./app/core/layout/navbar.component";
import Page from "./app/core/layout/page.component";
import Login from "./app/core/login/login.component";
import ArticleFeed from "./app/shared/article-feed.component";
import ProfileComponent from "./app/core/home/profile";
import ArticleDetail from "./app/core/article-detail/article-detail.component";
import ArticleContent from "./app/core/article-detail/article-content.component";
import "./app/core/article-detail/article-comment.component";
import "./app/core/home/twitter-feed.component";

/**
 * Shared components
 */
customElements.define("ez-page", Page);
customElements.define("ez-article-feed", ArticleFeed);
customElements.define("ez-profile", ProfileComponent);

/**
 * Layout components
 */
customElements.define("ez-footer", Footer);
customElements.define("ez-navbar", NavBar);

/**
 * Page components
 */
customElements.define("ez-home", Home);
customElements.define("ez-login", Login);
customElements.define("ez-error", Error);
customElements.define("ez-article-detail", ArticleDetail);
customElements.define("ez-article-content", ArticleContent);
customElements.define("ez-admin", Admin);
customElements.define("ez-draft", Draft);
