import { EffectFactory, combineRoutes } from '@marblejs/core';
import { getCommentByArticleEffect$ } from './effects/get-comment-by-article.effect';
import { postCommentByArticleEffect$ } from './effects/post-comment-by-article.effect';

const getCommentByArticle$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getCommentByArticleEffect$);

const postCommentByArticle$ = EffectFactory.matchPath('/')
  .matchType('POST')
  .use(postCommentByArticleEffect$);

// const removeCommentByArticle$ = EffectFactory.matchPath("/:commentId")
//   .matchType("DELETE")
//   .use(removeCommentEffect$);

export const comment$ = combineRoutes('/article/:articleId/comment', {
  effects: [getCommentByArticle$, postCommentByArticle$],
});
