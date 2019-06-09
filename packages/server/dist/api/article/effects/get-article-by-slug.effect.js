"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const never_nullable_1 = require("../../../utils/never-nullable");
const article_dao_1 = require("../model/article.dao");
const validator$ = middleware_io_1.requestValidator$({
    params: middleware_io_1.t.type({
        slug: middleware_io_1.t.string,
    }),
});
exports.getArticleBySlugEffect$ = req$ => req$.pipe(core_1.use(validator$), operators_1.mergeMap(req => rxjs_1.of(req.params.slug).pipe(operators_1.mergeMap(article_dao_1.ArticleDao.findByTitle), operators_1.mergeMap(never_nullable_1.neverNullable), operators_1.map(article => ({ body: article })), operators_1.catchError(() => rxjs_1.throwError(new core_1.HttpError('Article does not exist', core_1.HttpStatus.NOT_FOUND))))));
