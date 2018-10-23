import { combineRoutes, EffectFactory } from "@marblejs/core";

import { article$, authorizedArticle$, authorizedDraft$ } from "./article";
import { notFoundEffect$ } from "./common/effects/not-found.effect";
import { getTweetsEffect$ } from "./tweet/effects/get-tweets.effect";
import { getDocEffect$ } from "./common/effects/get-doc.effect";
import { auth$ } from "./auth";
import { user$ } from "./user";

const getTweets$ = EffectFactory.matchPath("/tweet")
  .matchType("GET")
  .use(getTweetsEffect$);

const getDoc$ = EffectFactory.matchPath("/doc")
  .matchType("GET")
  .use(getDocEffect$);

const notFound$ = EffectFactory.matchPath("*")
  .matchType("*")
  .use(notFoundEffect$);

export const api$ = combineRoutes("/api/v1", [
  article$,
  authorizedArticle$,
  authorizedDraft$,
  auth$,
  user$,
  getTweets$,
  getDoc$,
  notFound$,
]);
