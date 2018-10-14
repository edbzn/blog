import { combineRoutes, EffectFactory } from "@marblejs/core";
import { getArticleEffect$ } from "./effects/get-article.effect";
import { getArticleListEffect$ } from "./effects/get-article-list.effect";
import { postArticleEffect$ } from "./effects/post-article.effect";

const getArticleList$ = EffectFactory.matchPath("/")
  .matchType("GET")
  .use(getArticleListEffect$);

const getArticle$ = EffectFactory.matchPath("/:id")
  .matchType("GET")
  .use(getArticleEffect$);

const postArticle$ = EffectFactory.matchPath("/")
  .matchType("POST")
  .use(postArticleEffect$);

export const article$ = combineRoutes("/article", {
  effects: [getArticleList$, postArticle$, getArticle$],
});
