"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeEnv;
(function (NodeEnv) {
    NodeEnv["PRODUCTION"] = "production";
    NodeEnv["DEVELOPMENT"] = "development";
})(NodeEnv = exports.NodeEnv || (exports.NodeEnv = {}));
exports.Config = {
    frontAppDomains: process.env.FRONT_APP_DOMAINS.split(' '),
    env: process.env.NODE_ENV,
    jwt: { secret: process.env.JWT_SECRET },
    server: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
    },
    logger: {
        level: process.env.LOG_LEVEL,
    },
    db: {
        urlMain: process.env.DB_URL_MAIN,
        urlTest: process.env.DB_URL_TEST,
    },
    twitter: {
        baseUrl: 'https://api.twitter.com/1.1/search/tweets.json',
        fromUserName: 'edouardbozon',
        oAuth: {
            token: process.env.TWITTER_TOKEN,
            token_secret: process.env.TWITTER_TOKEN_SECRET,
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_KEY_SECRET,
        },
    },
};
