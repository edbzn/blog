import { Effect, HttpError, HttpStatus } from "@marblejs/core";
import { of, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { neverNullable } from "../../../utils/never-nullable";
import { ArticleDao } from "../model/article.dao";

export const getArticleEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req.params.id).pipe(
        mergeMap(ArticleDao.findById),
        mergeMap(neverNullable),
        map(article => ({ body: article })),
        catchError(() =>
          throwError(
            new HttpError("Article does not exist", HttpStatus.NOT_FOUND),
          ),
        ),
      ),
    ),
  );
