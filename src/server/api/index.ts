import { combineRoutes, EffectFactory } from "@marblejs/core";
import { notFoundEffect$ } from "./common/effects/not-found.effect";
import { getTweetsEffect$ } from "./tweet/effects/get-tweets.effect";
import { article$ } from "./article";

const getTweets$ = EffectFactory.matchPath("/tweets")
  .matchType("*")
  .use(getTweetsEffect$);

const notFound$ = EffectFactory.matchPath("*")
  .matchType("*")
  .use(notFoundEffect$);

export const api$ = combineRoutes("/api/v1", [article$, getTweets$, notFound$]);
