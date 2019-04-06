import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { SortDir } from '../../../../server/utils/collection';
import { CommentDao } from '../model/comment.dao';

const commentQuerySchema = {
  params: t.type({
    articleId: t.string,
  }),
};

export const getCommentByArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$(commentQuerySchema)),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.query),
        mergeMap(() =>
          CommentDao.findAllByArticle(
            req.params.articleId,
            {
              sortBy: '_id',
              sortDir: SortDir.DESC,
              limit: 5,
              page: 1
            },
          ),
        ),
        map(commentCollection => ({ body: commentCollection })),
        catchError(err =>
          throwError(
            new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR),
          ),
        ),
      ),
    ),
  );
