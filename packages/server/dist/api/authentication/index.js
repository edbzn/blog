"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const login_effect_1 = require("./effects/login.effect");
const signup_effect_1 = require("./effects/signup.effect");
const login$ = core_1.EffectFactory.matchPath('/login')
    .matchType('POST')
    .use(login_effect_1.loginEffect$);
const signup$ = core_1.EffectFactory.matchPath('/signup')
    .matchType('POST')
    .use(signup_effect_1.signupEffect$);
exports.authentication$ = core_1.combineRoutes('/auth', [login$, signup$]);
