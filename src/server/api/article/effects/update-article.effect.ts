import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { of, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';

import { neverNullable } from '../../../utils/never-nullable';
// import { articleValidator$ } from '../helpers/article.validator';
import { ArticleDao } from '../model/article.dao';
import { requestValidator$, t } from '@marblejs/middleware-io';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  }),
});

export const updateArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req =>
      of(req.params.id).pipe(
        mapTo({
          ...req.body,
          tags: (req.body.tags.map((tag: string) =>
            tag.toLowerCase(),
          ) as string[]).filter(val => val && val.length > 2),
        }),
        mergeMap(article => ArticleDao.updateById(req.params.id, article)),
        mergeMap(neverNullable),
        map(article => ({ body: article })),
        catchError(err =>
          throwError(new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR)),
        ),
      ),
    ),
  );
