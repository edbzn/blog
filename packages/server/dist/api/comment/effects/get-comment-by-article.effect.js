"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const collection_1 = require("../../../utils/collection");
const comment_dao_1 = require("../model/comment.dao");
const commentQuerySchema = {
    params: middleware_io_1.t.type({
        articleId: middleware_io_1.t.string,
    }),
};
exports.getCommentByArticleEffect$ = req$ => req$.pipe(core_1.use(middleware_io_1.requestValidator$(commentQuerySchema)), operators_1.mergeMap(req => rxjs_1.of(req).pipe(operators_1.map(req => req.query), operators_1.mergeMap(() => comment_dao_1.CommentDao.findAllByArticle(req.params.articleId, {
    sortBy: '_id',
    sortDir: collection_1.SortDir.DESC,
    limit: 5,
    page: 1,
})), operators_1.map(commentCollection => ({ body: commentCollection })), operators_1.catchError(err => rxjs_1.throwError(new core_1.HttpError(err, core_1.HttpStatus.INTERNAL_SERVER_ERROR))))));
