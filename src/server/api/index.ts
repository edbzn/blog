import { combineRoutes, EffectFactory } from "@marblejs/core";

import { article$, authorizedArticle$, authorizedDraft$ } from "./article";
import { notFoundEffect$ } from "./common/effects/not-found.effect";
import { getTweetsEffect$ } from "./tweet/effects/get-tweets.effect";
import { auth$ } from "./auth";
import { user$ } from "./user";
import { comment$ } from "./comment";

const getTweets$ = EffectFactory.matchPath("/tweet")
  .matchType("GET")
  .use(getTweetsEffect$);

const notFound$ = EffectFactory.matchPath("*")
  .matchType("*")
  .use(notFoundEffect$);

export const api$ = combineRoutes("/api/v1", [
  article$,
  comment$,
  authorizedArticle$,
  authorizedDraft$,
  auth$,
  user$,
  getTweets$,
  notFound$,
]);
