import { RxHR } from "@akanass/rx-http-request";
import { Effect } from "@marblejs/core";
import { switchMap } from "rxjs/operators";

import { Config } from "../../../config";

export const getTweetsEffect$: Effect = (req$, _res) =>
  req$.pipe(
    switchMap(_ => {
      const oauth = Config.twitter.oAuth;
      const headers = {
        "Content-Type": "application/json",
      };

      return RxHR.get(Config.twitter.baseUrl, {
        json: true,
        qs: { from: Config.twitter.fromUserName },
        headers,
        oauth,
      });
    }),
  );
