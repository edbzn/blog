import Error from "./app/error/error.component";
import NavBar from "./app/layout/navbar.component";
import Admin from "./app/admin/admin.component";
import Login from "./app/login/login.component";
import Footer from "./app/layout/footer.component";
import Page from "./app/layout/page.component";
import Home from "./app/home/home.component";
import ArticleDetail from "./app/article-detail/article-detail.component";

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
customElements.define("ez-admin", Admin);
customElements.define("ez-error", Error);
customElements.define("ez-article-detail", ArticleDetail);
