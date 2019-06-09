import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';
import { cors$ } from '@marblejs/middleware-cors';

import { api$ } from './api';
import { Config } from './config';

const middlewares = [
  cors$({
    origin: Config.frontAppDomains,
    allowHeaders: ['Content-Type', 'Origin', 'Authorization'],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    maxAge: 86400000, // 1 day
  }),
  logger$({ silent: false }),
  bodyParser$(),
];

const effects = [api$];

export default httpListener({ middlewares, effects });
