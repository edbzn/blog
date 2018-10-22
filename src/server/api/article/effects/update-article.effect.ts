import { Effect, HttpError, HttpStatus, use } from "@marblejs/core";
import { of, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { neverNullable } from "../../../utils/never-nullable";
import { ArticleDao } from "../model/article.dao";
import { articleValidator$ } from "../helpers/article.validator";

export const updateArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(articleValidator$),
    mergeMap(req =>
      of(req.params.id).pipe(
        mergeMap(() => ArticleDao.updateById(req.params.id, req.body)),
        mergeMap(neverNullable),
        map(article => ({ body: article })),
        catchError(err =>
          throwError(new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR)),
        ),
      ),
    ),
  );
