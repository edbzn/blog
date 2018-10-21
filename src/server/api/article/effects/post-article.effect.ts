import { Effect, use } from "@marblejs/core";
import { validator$, Joi } from "@marblejs/middleware-joi";
import { map, mergeMap, catchError } from "rxjs/operators";

import { ArticleDao } from "../model/article.dao";
import { throwError } from "rxjs";

export const articleValidator$ = validator$({
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    posterUrl: Joi.string().required(),
    tags: Joi.array().required(),
    published: Joi.boolean().required(),
    publishedAt: Joi.required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    _id: Joi.string(),
    __v: Joi.number(),
  }),
});

export const postArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(articleValidator$),
    map(req => req.body),
    mergeMap(ArticleDao.create),
    map(response => ({ body: response })),
    catchError(err => throwError(err)),
  );
