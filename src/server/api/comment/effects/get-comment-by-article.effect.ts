import { HttpEffect, use } from "@marblejs/core";
import { of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { CommentDao } from "../model/comment.dao";
import { CollectionQueryOptions } from "../../../utils/collection";
import { commentCollectionQueryValidator$ } from "../helpers/comment-collection-query.validator";
import { requestValidator$, t } from "@marblejs/middleware-io";

type Query = CollectionQueryOptions;

const validator$ = requestValidator$({
  params: t.type({
    articleId: t.string,
  }),
});

export const getCommentByArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(
      commentCollectionQueryValidator$({
        sortBy: CommentDao.COMMENT_SORTING_FIELDS,
      }),
    ),
    use(validator$),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.query as Query),
        mergeMap(query => CommentDao.findAllByArticle(req.params.articleId, query)),
        map(commentCollection => ({ body: commentCollection })),
      ),
    ),
  );
