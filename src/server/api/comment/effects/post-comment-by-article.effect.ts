import { Effect, use } from "@marblejs/core";
import { map, mergeMap, catchError } from "rxjs/operators";

import { CommentDao } from "../model/comment.dao";
import { throwError } from "rxjs";
import { commentValidator$ } from "../helpers/comment-validator";

export const postCommentByArticleEffect$: Effect = req$ =>
  req$.pipe(
    use(commentValidator$),
    map(req => req.body),
    mergeMap(CommentDao.create),
    map(article => ({ body: article })),
    catchError(err => throwError(err)),
  );
