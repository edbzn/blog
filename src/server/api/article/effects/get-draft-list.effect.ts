import { Effect, use } from "@marblejs/core";
import { of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { ArticleDao } from "../model/article.dao";
import { CollectionQueryOptions } from "../../../utils/collection";
import { articleCollectionQueryValidator$ } from "../helpers/article-collection-query.validator";

type Query = CollectionQueryOptions;

export const getDraftListEffect$: Effect = req$ =>
  req$.pipe(
    use(
      articleCollectionQueryValidator$({
        sortBy: ArticleDao.ARTICLE_SORTING_FIELDS,
      }),
    ),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.query as Query),
        mergeMap(ArticleDao.findAll),
        map(articleList => ({ body: articleList })),
      ),
    ),
  );
