import { html, LitElement, property } from 'lit-element';
import { loadHome } from '../../components/home/lazy';
import { ProuterResponse, ProuterRequest, browserRouter, ProuterBrowserRouter, routerGroup } from 'prouter';
import { loadArticleDetail } from '../../components/article-detail/lazy';

export type Routes = {
  path: string;
  children: Route[];
}[];

export interface Route {
  path: string;
  customElement: string;
  preHandler?: (req: ProuterRequest, res: ProuterResponse) => Promise<void> | void;
}

export default class RouterOutletComponent extends LitElement {
  @property({ type: Array })
  routes: Routes = [];

  private router: ProuterBrowserRouter = browserRouter();

  firstUpdated() {
    this.routes.forEach(parentRoute => {
      const parentGroup = routerGroup();

      parentRoute.children.forEach(route => {
        parentGroup.use(route.path, (req, res, next) => {
          if (route.preHandler) {
            route.preHandler(req, res);
          }
          next();
        });
      });

      this.router.use(parentRoute.path, parentGroup);
    });

    this.router.listen();
  }

  render() {
    return html``;
  }
}

customElements.define('ez-router-outlet', RouterOutletComponent);

const APP_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '/',
        customElement: 'ez-home',
        preHandler: async () => {
          await loadHome();
        },
      },
      {
        path: '/article/:slug',
        customElement: 'ez-home',
        preHandler: async () => {
          await loadArticleDetail();
        },
      },
    ],
  },
  { path: '/admin', children: [] },
];
