import { Effect, use } from "@marblejs/core";
import { validator$, Joi } from "@marblejs/middleware-joi";
import { map, mergeMap, tap } from "rxjs/operators";

import { ArticleDao } from "../model/article.dao";

const articleValidator$ = validator$({
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
});

export const postArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(articleValidator$),
    map(req => req.body),
    mergeMap(ArticleDao.create),
    map(response => ({ body: response })),
  );
