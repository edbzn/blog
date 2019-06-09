"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const auth_middleware_1 = require("../authentication/middlewares/auth.middleware");
const get_me_effect_1 = require("./effects/get-me.effect");
const get_users_effect_1 = require("./effects/get-users.effect");
exports.getUsers$ = core_1.EffectFactory.matchPath('/')
    .matchType('GET')
    .use(get_users_effect_1.getUsersEffect$);
exports.getMe$ = core_1.EffectFactory.matchPath('/me')
    .matchType('GET')
    .use(get_me_effect_1.getMeEffect$);
exports.user$ = core_1.combineRoutes('/user', {
    effects: [exports.getUsers$, exports.getMe$],
    middlewares: [auth_middleware_1.authorize$],
});
