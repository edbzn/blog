"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const get_comment_by_article_effect_1 = require("./effects/get-comment-by-article.effect");
const post_comment_by_article_effect_1 = require("./effects/post-comment-by-article.effect");
const getCommentByArticle$ = core_1.EffectFactory.matchPath('/')
    .matchType('GET')
    .use(get_comment_by_article_effect_1.getCommentByArticleEffect$);
const postCommentByArticle$ = core_1.EffectFactory.matchPath('/')
    .matchType('POST')
    .use(post_comment_by_article_effect_1.postCommentByArticleEffect$);
// const removeCommentByArticle$ = EffectFactory.matchPath("/:commentId")
//   .matchType("DELETE")
//   .use(removeCommentEffect$);
exports.comment$ = core_1.combineRoutes('/article/:articleId/comment', {
    effects: [getCommentByArticle$, postCommentByArticle$],
});
