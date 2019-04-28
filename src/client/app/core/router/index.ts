import { browserRouter } from 'prouter';

import { scrollRestorationService } from '../services';
import { adminRoutes } from './admin';
import { clientRoutes } from './client';
import { notFoundHandler } from './not-found-handler';

export const appSelector = document.getElementById('app')!;
export const router = browserRouter();

router
  .use('*', scrollRestorationService.registerScrollPosition)
  .use('', clientRoutes)
  .use('/admin', adminRoutes)
  .use('*', notFoundHandler)
  .listen();

router.on('navigation', scrollRestorationService.restoreScrollPosition);


