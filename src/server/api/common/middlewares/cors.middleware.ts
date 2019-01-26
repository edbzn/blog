import { Middleware } from "@marblejs/core";
import { tap, filter } from "rxjs/operators";
import { Config } from "../../../config";

function getAuthorizedOrigin(referer: string | undefined): string {
  if (
    referer &&
    Config.frontAppDomains.some(
      authorizedDomain => referer.includes(authorizedDomain),
    )
  ) {
    return Config.frontAppDomains.filter(
      authorizedDomain => referer.includes(authorizedDomain),
    )[0];
  }

  return "";
}

export const cors$: Middleware = (req$, res) =>
  req$.pipe(
    tap(req => {
      res.setHeader(
        "Access-Control-Allow-Origin",
        getAuthorizedOrigin(req.headers.referer),
      );
      res.setHeader("Access-Control-Allow-Headers", [
        "Content-Type",
        "Origin",
        "Authorization",
      ]);
      res.setHeader("Access-Control-Allow-Methods", [
        "OPTIONS",
        "GET",
        "POST",
        "PUT",
        "DELETE",
      ]);
    }),
    filter(req => req.method === "OPTIONS"),
    tap(() => {
      res.writeHead(200);
      res.end();
    }),
  );
