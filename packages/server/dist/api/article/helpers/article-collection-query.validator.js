"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_io_1 = require("@marblejs/middleware-io");
const collection_1 = require("../../../utils/collection");
const collection_query_validator_1 = require("../../../utils/collection-query.validator");
exports.articleCollectionQuery = (options) => middleware_io_1.t.intersection([
    collection_query_validator_1.createQuery(options),
    middleware_io_1.t.type({
        tags: middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.array(middleware_io_1.t.string), middleware_io_1.t.undefined]),
    }),
]);
exports.defaultArticleQuery = {
    page: 1,
    limit: 4,
    sortBy: ['_id', 'createdAt'],
    sortDir: collection_1.SortDir.DESC,
};
const queryReturnType = exports.articleCollectionQuery(exports.defaultArticleQuery);
exports.articleQueryValidator$ = (options = exports.defaultArticleQuery) => middleware_io_1.requestValidator$({
    query: exports.articleCollectionQuery(options),
});
