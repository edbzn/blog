import { browserRouter, ProuterNavigationEvent } from 'prouter';

import { adminRoutes } from './admin';
import { clientRoutes } from './client';
import { notFoundHandler } from './not-found-handler';

export const appSelector = document.getElementById('app')!;
export const router = browserRouter();

router
  .use('', clientRoutes)
  .use('/admin', adminRoutes)
  .use('*', notFoundHandler)
  .listen();

router.on('navigation', (_e: ProuterNavigationEvent) => {
  window.scrollTo({ top: 0 });
});
