"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_jwt_1 = require("@marblejs/middleware-jwt");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const config_1 = require("../../../config");
exports.generateTokenPayload = (user) => ({
    _id: user.id,
    email: user.email,
    exp: middleware_jwt_1.generateExpirationInHours(24),
});
exports.generateTokenFromUser = (user) => rxjs_1.of(exports.generateTokenPayload(user)).pipe(operators_1.map(middleware_jwt_1.generateToken({ secret: config_1.Config.jwt.secret })));
