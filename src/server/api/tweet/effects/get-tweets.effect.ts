import { RxHR } from "@akanass/rx-http-request";
import { Effect } from "@marblejs/core";
import { mergeMap } from "rxjs/operators";

import { Config } from "../../../config";

export const getTweetsEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(_ => {
      const oauth = Config.twitter.oAuth;
      const headers = {
        "Content-Type": "application/json",
      };

      return RxHR.get(Config.twitter.baseUrl, {
        json: true,
        qs: {
          from: Config.twitter.fromUserName,
          exclude: "replies",
          count: 5,
        },
        headers,
        oauth,
      });
    }),
  );
