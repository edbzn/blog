import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';

import { neverNullable } from '../../../utils/never-nullable';
import { articleSchema } from '../helpers/article-body.validator';
import { ArticleDao } from '../model/article.dao';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  }),
  body: articleSchema,
});

export const updateArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req =>
      of(req.params.id).pipe(
        mapTo(req.body),
        mergeMap(article => ArticleDao.updateById(req.params.id, article)),
        mergeMap(neverNullable),
        map(article => ({ body: article })),
        catchError(err => throwError(new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR)))
      )
    )
  );
