import { HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { map, mergeMap } from 'rxjs/operators';

import { CommentDao } from '../model/comment.dao';

const commentSchema = t.type({
  author: t.string,
  comment: t.string,
  articleId: t.string,
});

export type CommentPayload = t.TypeOf<typeof commentSchema>;

export const postCommentByArticleEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: commentSchema })),
    map(req => req.body),
    mergeMap(CommentDao.create),
    map(article => ({ body: article }))
  );
