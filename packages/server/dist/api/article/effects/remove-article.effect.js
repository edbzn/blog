"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const article_dao_1 = require("../model/article.dao");
const validator$ = middleware_io_1.requestValidator$({
    params: middleware_io_1.t.type({
        id: middleware_io_1.t.string,
    }),
});
exports.removeArticleEffect$ = req$ => req$.pipe(core_1.use(validator$), operators_1.mergeMap(req => rxjs_1.of(req.params.id).pipe(operators_1.mergeMap(article_dao_1.ArticleDao.removeById), operators_1.map(() => ({ body: null })), operators_1.catchError(err => rxjs_1.throwError(new core_1.HttpError(err, core_1.HttpStatus.INTERNAL_SERVER_ERROR))))));
