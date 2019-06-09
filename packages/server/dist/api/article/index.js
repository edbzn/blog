"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const auth_middleware_1 = require("../authentication/middlewares/auth.middleware");
const get_article_by_id_effect_1 = require("./effects/get-article-by-id.effect");
const get_article_by_slug_effect_1 = require("./effects/get-article-by-slug.effect");
const get_article_list_effect_1 = require("./effects/get-article-list.effect");
const get_draft_list_effect_1 = require("./effects/get-draft-list.effect");
const post_article_reaction_effect_1 = require("./effects/post-article-reaction.effect");
const post_article_effect_1 = require("./effects/post-article.effect");
const remove_article_effect_1 = require("./effects/remove-article.effect");
const update_article_effect_1 = require("./effects/update-article.effect");
const getArticleList$ = core_1.EffectFactory.matchPath('/')
    .matchType('GET')
    .use(get_article_list_effect_1.getArticleListEffect$);
const getDraftList$ = core_1.EffectFactory.matchPath('/')
    .matchType('GET')
    .use(get_draft_list_effect_1.getDraftListEffect$);
const getArticleById$ = core_1.EffectFactory.matchPath('/:id')
    .matchType('GET')
    .use(get_article_by_id_effect_1.getArticleByIdEffect$);
const getArticleBySlug$ = core_1.EffectFactory.matchPath('/slug/:slug')
    .matchType('GET')
    .use(get_article_by_slug_effect_1.getArticleBySlugEffect$);
const removeArticle$ = core_1.EffectFactory.matchPath('/:id')
    .matchType('DELETE')
    .use(remove_article_effect_1.removeArticleEffect$);
const updateArticle$ = core_1.EffectFactory.matchPath('/:id')
    .matchType('PUT')
    .use(update_article_effect_1.updateArticleEffect$);
const updateArticleReaction$ = core_1.EffectFactory.matchPath('/:id/reaction')
    .matchType('POST')
    .use(post_article_reaction_effect_1.updateArticleReactionEffect$);
const postArticle$ = core_1.EffectFactory.matchPath('/')
    .matchType('POST')
    .use(post_article_effect_1.postArticleEffect$);
exports.article$ = core_1.combineRoutes('/article', {
    effects: [getArticleList$, getArticleById$, getArticleBySlug$, updateArticleReaction$],
});
exports.authorizedArticle$ = core_1.combineRoutes('/article', {
    effects: [postArticle$, removeArticle$, updateArticle$],
    middlewares: [auth_middleware_1.authorize$],
});
exports.authorizedDraft$ = core_1.combineRoutes('/draft', {
    effects: [getDraftList$],
    middlewares: [auth_middleware_1.authorize$],
});
