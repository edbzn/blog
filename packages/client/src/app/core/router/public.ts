import { html, render } from 'lit-html';
import { routerGroup } from 'prouter';

import { appSelector, router } from '.';
import { loadArticleDetail } from '../../components/article-detail/lazy';
import { loadArticlesByTag } from '../../components/article-feed-by-tag/lazy';
import { loadError } from '../../components/error/lazy';
import { loadHome } from '../../components/home/lazy';
import { loadLogin } from '../../components/login/lazy';
import { errorHandlerService } from '../services/error-handler-service';

export const publicRoutes = routerGroup()
  .use('/', async (req, resp) => {
    await loadHome();

    render(
      html`
        <ez-home></ez-home>
      `,
      appSelector
    );
    resp.end();
  })
  .use('/login', async (req, resp) => {
    await loadLogin();

    render(
      html`
        <ez-login></ez-login>
      `,
      appSelector
    );
    resp.end();
  })
  .use('/article/:slug', async (req, resp) => {
    await loadArticleDetail();

    const slug = req.params.slug;

    render(
      html`
        <ez-article-detail slug="${slug}"></ez-article-detail>
      `,
      appSelector
    );
    resp.end();
  })
  .use('/tag/:tag', async (req, resp) => {
    await loadArticlesByTag();

    const tag = req.params.tag;

    render(
      html`
        <ez-article-feed-by-tag tag=${tag}></ez-article-feed-by-tag>
      `,
      appSelector
    );
    resp.end();
  })
  .use('/error', async (req, resp) => {
    await loadError();

    if (null === errorHandlerService.getLastError()) {
      router.push('/');
      resp.end();
      return;
    }

    render(
      html`
        <ez-error message="${errorHandlerService.getLastError()}"></ez-error>
      `,
      appSelector
    );
    resp.end();
  });
