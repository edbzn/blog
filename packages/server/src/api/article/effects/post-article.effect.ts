import { HttpEffect, use } from '@marblejs/core';
import { requestValidator$ } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';

import { articleSchema } from '../helpers/article-body.validator';
import { ArticleDao } from '../model/article.dao';

const validator$ = requestValidator$({
  body: articleSchema,
});

export const postArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req =>
      of(req).pipe(
        mapTo(req.body),
        mergeMap(ArticleDao.create),
        map(article => ({ body: article })),
        catchError(err => throwError(err))
      )
    )
  );
