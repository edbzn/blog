import { HttpMiddlewareEffect } from '@marblejs/core';
import { tap } from 'rxjs/operators';

import { Config } from '../../../config';

function getAuthorizedOrigin(origin: string | undefined): string {
  if (
    origin &&
    Config.frontAppDomains.some(
      authorizedDomain => origin.includes(authorizedDomain),
    )
  ) {
    return Config.frontAppDomains.filter(
      authorizedDomain => origin.includes(authorizedDomain),
    )[0];
  }

  return "";
}

export const cors$: HttpMiddlewareEffect = (req$, res) =>
  req$.pipe(
    tap(req => {
      res.setHeader(
        "Access-Control-Allow-Origin",
        getAuthorizedOrigin(req.headers.origin as string),
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Authorization,");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
      }
    }),
  );
