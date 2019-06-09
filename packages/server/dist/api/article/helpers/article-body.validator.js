"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_io_1 = require("@marblejs/middleware-io");
const article_language_1 = require("../model/article-language");
const Positive = middleware_io_1.t.brand(middleware_io_1.t.number, (n) => n >= 0, 'Positive');
exports.articleSchema = middleware_io_1.t.type({
    title: middleware_io_1.t.string,
    markdown: middleware_io_1.t.string,
    html: middleware_io_1.t.string,
    tags: middleware_io_1.t.array(middleware_io_1.t.string),
    slug: middleware_io_1.t.string,
    published: middleware_io_1.t.boolean,
    publishedAt: middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.null]),
    posterUrl: middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.null]),
    metaTitle: middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.null]),
    metaDescription: middleware_io_1.t.union([middleware_io_1.t.string, middleware_io_1.t.null]),
    reactions: middleware_io_1.t.type({
        types: middleware_io_1.t.type({
            unicorn: middleware_io_1.t.type({ count: Positive }),
            heart: middleware_io_1.t.type({ count: Positive }),
            mark: middleware_io_1.t.type({ count: Positive }),
        }),
    }),
    lang: middleware_io_1.t.union([middleware_io_1.t.literal(article_language_1.ArticleLanguage.FR), middleware_io_1.t.literal(article_language_1.ArticleLanguage.EN)]),
});
exports.articleValidator$ = middleware_io_1.requestValidator$({ body: exports.articleSchema });
