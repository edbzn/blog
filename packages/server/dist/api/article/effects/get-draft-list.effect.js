"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const article_collection_query_validator_1 = require("../helpers/article-collection-query.validator");
const article_dao_1 = require("../model/article.dao");
exports.getDraftListEffect$ = req$ => req$.pipe(core_1.use(article_collection_query_validator_1.articleQueryValidator$()), operators_1.mergeMap(req => rxjs_1.of(req).pipe(operators_1.mapTo(req.query), operators_1.mergeMap(article_dao_1.ArticleDao.findAll), operators_1.map(articleList => ({ body: articleList })))));
