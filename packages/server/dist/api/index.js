"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const article_1 = require("./article");
const not_found_effect_1 = require("./common/effects/not-found.effect");
const get_tweets_effect_1 = require("./tweet/effects/get-tweets.effect");
const authentication_1 = require("./authentication");
const user_1 = require("./user");
const comment_1 = require("./comment");
const getTweets$ = core_1.EffectFactory.matchPath('/tweet')
    .matchType('GET')
    .use(get_tweets_effect_1.getTweetsEffect$);
const notFound$ = core_1.EffectFactory.matchPath('*')
    .matchType('*')
    .use(not_found_effect_1.notFoundEffect$);
exports.api$ = core_1.combineRoutes('/api/v1', [
    article_1.article$,
    comment_1.comment$,
    article_1.authorizedArticle$,
    article_1.authorizedDraft$,
    authentication_1.authentication$,
    user_1.user$,
    getTweets$,
    notFound$,
]);
