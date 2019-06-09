"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_io_1 = require("@marblejs/middleware-io");
const collection_1 = require("./collection");
exports.createQuery = (opts) => middleware_io_1.t.partial({
    sortBy: middleware_io_1.t.union(opts.sortBy.map(s => middleware_io_1.t.literal(s))),
    sortDir: middleware_io_1.t.union([
        middleware_io_1.t.refinement(middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.number]), n => Number(n) === collection_1.SortDir.ASC, 'SortDir.ASC'),
        middleware_io_1.t.refinement(middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.number]), n => Number(n) === collection_1.SortDir.DESC, 'SortDir.DESC'),
    ]),
    limit: middleware_io_1.t.refinement(middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.number]), n => Number(n) >= 0, 'number.0+'),
    page: middleware_io_1.t.refinement(middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.number]), n => Number(n) >= 1, 'number.1+'),
});
exports.collectionQueryValidator$ = (opts) => middleware_io_1.requestValidator$({ query: exports.createQuery(opts) });
