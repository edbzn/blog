"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const article_body_validator_1 = require("../helpers/article-body.validator");
const article_dao_1 = require("../model/article.dao");
const validator$ = middleware_io_1.requestValidator$({
    body: article_body_validator_1.articleSchema,
});
exports.postArticleEffect$ = req$ => req$.pipe(core_1.use(validator$), operators_1.mergeMap(req => rxjs_1.of(req).pipe(operators_1.mapTo(req.body), operators_1.mergeMap(article_dao_1.ArticleDao.create), operators_1.map(article => ({ body: article })), operators_1.catchError(err => rxjs_1.throwError(err)))));
