import { Effect, use } from "@marblejs/core";
import { of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { ArticleDao } from "../model/article.dao";
import { collectionQueryValidator$ } from "../../common/middlewares/collection-query.validator";
import { CollectionQueryOptions } from "../../../utils/collection";

type Query = CollectionQueryOptions;

export const getArticleListEffect$: Effect = req$ =>
  req$.pipe(
    use(
      collectionQueryValidator$({ sortBy: ArticleDao.ARTICLE_SORTING_FIELDS }),
    ),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.query as Query),
        mergeMap(ArticleDao.findAllPublished),
        map(articleList => ({ body: articleList })),
      ),
    ),
  );
