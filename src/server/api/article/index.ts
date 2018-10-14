import { combineRoutes, EffectFactory } from "@marblejs/core";
import { getArticleEffect$ } from "./effects/get-article.effect";
import { getArticleListEffect$ } from "./effects/get-article-list.effect";

const getArticleList$ = EffectFactory.matchPath("/")
  .matchType("GET")
  .use(getArticleListEffect$);

const getArticle$ = EffectFactory.matchPath("/:id")
  .matchType("GET")
  .use(getArticleEffect$);

export const article$ = combineRoutes("/article", {
  effects: [getArticleList$, getArticle$],
});
