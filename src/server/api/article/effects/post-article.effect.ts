import { Effect, use } from "@marblejs/core";
import { map, mergeMap, catchError } from "rxjs/operators";

import { ArticleDao } from "../model/article.dao";
import { throwError } from "rxjs";
import { articleValidator$ } from "../helpers/article.validator";

export const postArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(articleValidator$),
    map(req => ({
      ...req.body,
      tags: (req.body.tags.map((tag: string) =>
        tag.toLowerCase(),
      ) as string[]).filter(val => val && val.length > 2),
    })),
    mergeMap(ArticleDao.create),
    map(article => ({ body: article })),
    catchError(err => throwError(err)),
  );
