import { Middleware } from "@marblejs/core";
import { tap, filter } from "rxjs/operators";

export const cors$: Middleware = (req$, res) =>
  req$.pipe(
    tap(() => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
    }),
    filter(req => req.method === "OPTIONS"),
    tap(() => {
      res.writeHead(200);
      res.end();
    }),
  );
