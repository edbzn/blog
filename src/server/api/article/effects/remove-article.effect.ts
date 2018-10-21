import { Effect, HttpError, HttpStatus, use } from "@marblejs/core";
import { of, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { ArticleDao } from "../model/article.dao";

// @todo add auth validation
export const removeArticleEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req.params.id).pipe(
        mergeMap(ArticleDao.removeById),
        map(() => ({ body: null })),
        catchError(err =>
          throwError(new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR)),
        ),
      ),
    ),
  );
