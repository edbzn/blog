import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { neverNullable } from '../../../utils/never-nullable';
import { ArticleDao } from '../model/article.dao';

const validator$ = requestValidator$({
  params: t.type({
    slug: t.string,
  }),
});

export const getArticleBySlugEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req =>
      of(req.params.slug).pipe(
        mergeMap(ArticleDao.findByTitle),
        mergeMap(neverNullable),
        map(article => ({ body: article })),
        catchError(() => throwError(new HttpError('Article does not exist', HttpStatus.NOT_FOUND)))
      )
    )
  );
