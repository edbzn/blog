import { ProuterRequest, ProuterResponse } from 'prouter';

import { router } from '.';
import { errorHandlerService } from '../services';

export const notFoundHandler = (req: ProuterRequest, resp: ProuterResponse) => {
  errorHandlerService.throw('Page not found at path ' + req.path);
  router.push('/error');
  resp.end();
};
