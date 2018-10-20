import Admin from "./app/core/admin/admin.component";
import Draft from "./app/core/admin/draft.component";
import ArticleDetail from "./app/core/article-detail/article-detail.component";
import Error from "./app/core/error/error.component";
import Home from "./app/core/home/home.component";
import Footer from "./app/core/layout/footer.component";
import NavBar from "./app/core/layout/navbar.component";
import Page from "./app/core/layout/page.component";
import Login from "./app/core/login/login.component";

/**
 * Shared components
 */
customElements.define("ez-page", Page);

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

customElements.define("ez-admin", Admin);
customElements.define("ez-draft", Draft);
