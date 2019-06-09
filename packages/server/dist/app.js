"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_body_1 = require("@marblejs/middleware-body");
const middleware_logger_1 = require("@marblejs/middleware-logger");
const middleware_cors_1 = require("@marblejs/middleware-cors");
const api_1 = require("./api");
const config_1 = require("./config");
const middlewares = [
    middleware_cors_1.cors$({
        origin: config_1.Config.frontAppDomains,
        allowHeaders: ['Content-Type', 'Origin', 'Authorization'],
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
        maxAge: 86400000,
    }),
    middleware_logger_1.logger$({ silent: false }),
    middleware_body_1.bodyParser$(),
];
const effects = [api_1.api$];
exports.default = core_1.httpListener({ middlewares, effects });
