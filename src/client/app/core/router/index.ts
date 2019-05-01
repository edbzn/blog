import { browserRouter } from 'prouter';

import { scrollRestorationService, languageService } from '../services';
import { adminRoutes } from './admin';
import { publicRoutes } from './public';
import { notFoundHandler } from './not-found-handler';

export const appSelector = document.getElementById('app')!;
export const router = browserRouter();

router
  .use('*', scrollRestorationService.registerScrollPosition)
  .use('*', languageService.loadLangMiddleware)
  .use('', publicRoutes)
  .use('/admin', adminRoutes)
  .use('*', notFoundHandler)
  .listen();

router.on('navigation', scrollRestorationService.restoreScrollPosition);
