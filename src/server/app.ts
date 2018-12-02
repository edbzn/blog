import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { loggerWithOpts$ } from '@marblejs/middleware-logger';

import { api$ } from './api';
import { cors$ } from './api/common/middlewares/cors.middleware';

const middlewares = [loggerWithOpts$(), cors$, bodyParser$];

const effects = [api$];

export const app = httpListener({ middlewares, effects });
