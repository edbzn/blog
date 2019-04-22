import { ProuterRequest, ProuterResponse } from 'prouter';

import { router } from '.';
import { errorHandlerService } from '../services/error-handler-service';

export const notFoundHandler = (req: ProuterRequest, resp: ProuterResponse) => {
  errorHandlerService.throw('Page not found for path ' + req.path);
  router.push('/error');
  resp.end();
};
