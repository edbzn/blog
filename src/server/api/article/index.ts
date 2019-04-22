import { combineRoutes, EffectFactory } from '@marblejs/core';

import { authorize$ } from '../authentication/middlewares/auth.middleware';
import { getArticleListEffect$ } from './effects/get-article-list.effect';
import { getArticleByIdEffect$ } from './effects/get-article-by-id.effect';
import { getArticleBySlugEffect$ } from './effects/get-article-by-slug.effect';
import { getDraftListEffect$ } from './effects/get-draft-list.effect';
import { postArticleEffect$ } from './effects/post-article.effect';
import { removeArticleEffect$ } from './effects/remove-article.effect';
import { updateArticleEffect$ } from './effects/update-article.effect';

const getArticleList$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getArticleListEffect$);

const getDraftList$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getDraftListEffect$);

const getArticleById$ = EffectFactory.matchPath('/:id')
  .matchType('GET')
  .use(getArticleByIdEffect$);

const getArticleBySlug$ = EffectFactory.matchPath('/slug/:slug')
  .matchType('GET')
  .use(getArticleBySlugEffect$);

const removeArticle$ = EffectFactory.matchPath('/:id')
  .matchType('DELETE')
  .use(removeArticleEffect$);

const updateArticle$ = EffectFactory.matchPath('/:id')
  .matchType('PUT')
  .use(updateArticleEffect$);

const postArticle$ = EffectFactory.matchPath('/')
  .matchType('POST')
  .use(postArticleEffect$);

export const article$ = combineRoutes('/article', {
  effects: [getArticleList$, getArticleById$, getArticleBySlug$],
});

export const authorizedArticle$ = combineRoutes('/article', {
  effects: [postArticle$, removeArticle$, updateArticle$],
  middlewares: [authorize$],
});

export const authorizedDraft$ = combineRoutes('/draft', {
  effects: [getDraftList$],
  middlewares: [authorize$],
});
