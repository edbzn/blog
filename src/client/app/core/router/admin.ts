import { html, render } from 'lit-html';
import { routerGroup } from 'prouter';

import { appSelector } from '.';
import { loadAdmin } from '../../components/admin/lazy';
import { store } from '../store/store';
import { loadDraft } from '../../components/admin/store/api.actions';

export const adminRoutes = routerGroup()
  .use('/', async (req, resp) => {
    await loadAdmin();

    render(
      html`
        <ez-admin></ez-admin>
      `,
      appSelector
    );
    resp.end();
  })
  .use('/draft', async (req, resp) => {
    await loadAdmin();
    
    if (req.query.id) {
      store.dispatch(loadDraft(req.query.id));
    }

    render(
      html`
        <ez-draft></ez-draft>
      `,
      appSelector
    );
    resp.end();
  });
