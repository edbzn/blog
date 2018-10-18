import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';

import { api$ } from './api';
import { cors$ } from './api/common/middlewares/cors.middleware';

const middlewares = [logger$, cors$, bodyParser$];

const effects = [api$];

export const app = httpListener({ middlewares, effects });
