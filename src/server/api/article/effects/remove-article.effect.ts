import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { articleSchema } from '../helpers/article-body.validator';
import { ArticleDao } from '../model/article.dao';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  }),
  body: articleSchema,
});

export const removeArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req =>
      of(req.params.id).pipe(
        mergeMap(ArticleDao.removeById),
        map(() => ({ body: null })),
        catchError(err => throwError(new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR)))
      )
    )
  );
