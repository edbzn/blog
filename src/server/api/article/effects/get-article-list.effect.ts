import { HttpEffect, use } from "@marblejs/core";
import { of } from "rxjs";
import { map, mapTo, mergeMap } from "rxjs/operators";

import { articleQueryValidator$ } from "../helpers/article-collection-query.validator";
import { ArticleDao } from "../model/article.dao";

export const getArticleListEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(articleQueryValidator$()),
    mergeMap(req =>
      of(req).pipe(
        mapTo(req.query),
        mergeMap(ArticleDao.findAllPublished),
        map(articleList => ({ body: articleList })),
      ),
    ),
  );
