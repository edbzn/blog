import { Effect, HttpError, HttpStatus, use } from "@marblejs/core";
import { of, throwError } from "rxjs";
import { catchError, map, mergeMap, mapTo } from "rxjs/operators";

import { neverNullable } from "../../../utils/never-nullable";
import { ArticleDao } from "../model/article.dao";
import { articleValidator$ } from "../helpers/article.validator";

export const updateArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(articleValidator$),
    mergeMap(req =>
      of(req.params.id).pipe(
        mapTo({
          ...req.body,
          tags: req.body.tags.map((tag: string) => tag.toLowerCase()),
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
