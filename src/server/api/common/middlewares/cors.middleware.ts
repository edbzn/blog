import { Middleware } from "@marblejs/core";
import { tap, filter } from "rxjs/operators";
import { Config } from "../../../config";

export const cors$: Middleware = (req$, res) =>
  req$.pipe(
    tap(() => {
      res.setHeader("Access-Control-Allow-Origin", [Config.frontAppDomain]);
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
