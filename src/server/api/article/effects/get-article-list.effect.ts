import { Effect } from "@marblejs/core";
import { of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { ArticleDao } from "../model/article.dao";

export const getArticleListEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        mergeMap(ArticleDao.findAll),
        map(articleList => ({ body: articleList })),
      ),
    ),
  );
