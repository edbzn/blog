import { Effect, use } from "@marblejs/core";
import { of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { CommentDao } from "../model/comment.dao";
import { CollectionQueryOptions } from "../../../utils/collection";
import { commentCollectionQueryValidator$ } from "../helpers/comment-collection-query.validator";

type Query = CollectionQueryOptions;

export const getCommentByArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(
      commentCollectionQueryValidator$({
        sortBy: CommentDao.COMMENT_SORTING_FIELDS,
      }),
    ),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.query as Query),
        mergeMap(query => CommentDao.findAllByArticle(req.params.articleId, query)),
        map(commentCollection => ({ body: commentCollection })),
      ),
    ),
  );
