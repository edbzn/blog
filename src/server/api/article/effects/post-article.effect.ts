import { Effect, use } from "@marblejs/core";
import { map, mergeMap, catchError } from "rxjs/operators";

import { ArticleDao } from "../model/article.dao";
import { throwError } from "rxjs";
import { articleValidator$ } from "../helpers/article.validator";

export const postArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(articleValidator$),
    map(req => req.body),
    mergeMap(ArticleDao.create),
    map(response => ({ body: response })),
    catchError(err => throwError(err)),
  );
