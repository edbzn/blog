"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const operators_1 = require("rxjs/operators");
const comment_dao_1 = require("../model/comment.dao");
const commentSchema = middleware_io_1.t.type({
    author: middleware_io_1.t.string,
    comment: middleware_io_1.t.string,
    articleId: middleware_io_1.t.string,
});
exports.postCommentByArticleEffect$ = req$ => req$.pipe(core_1.use(middleware_io_1.requestValidator$({ body: commentSchema })), operators_1.map(req => req.body), operators_1.mergeMap(comment_dao_1.CommentDao.create), operators_1.map(article => ({ body: article })));
