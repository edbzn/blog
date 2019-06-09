import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';
import { InstanceType } from 'typegoose';

import { neverNullable } from '../../../utils/never-nullable';
import { ReactionType } from '../model/article-reactions';
import { ArticleDao } from '../model/article.dao';
import { Article } from '../model/article.model';

export const articleReactionSchema = t.type({
  reaction: t.union([t.literal('unicorn'), t.literal('mark'), t.literal('heart')]),
});

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  }),
  body: articleReactionSchema,
});

const applyReaction = (reaction: ReactionType) => (article: InstanceType<Article>) => {
  const count = ++article.reactions.types[reaction].count;
  article.reactions.types[reaction].count = count;

  return article;
};

export const updateArticleReactionEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req =>
      of(req.params.id).pipe(
        mapTo(req.params.id),
        mergeMap(id => ArticleDao.findById(id)),
        mergeMap(neverNullable),
        map(applyReaction(req.body.reaction)),
        mergeMap(article => ArticleDao.updateById(req.params.id, article.toObject())),
        map(article => ({ body: article })),
        catchError(err => throwError(new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR)))
      )
    )
  );
