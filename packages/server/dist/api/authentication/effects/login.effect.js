"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const throw_if_not_admin_1 = require("../../user/helpers/throw-if-not-admin");
const check_password_1 = require("../helpers/check-password");
const get_user_by_email_1 = require("../helpers/get-user-by-email");
const token_helper_1 = require("../helpers/token.helper");
const credentialsSchema = middleware_io_1.t.type({
    email: middleware_io_1.t.string,
    password: middleware_io_1.t.string,
});
exports.loginEffect$ = req$ => req$.pipe(core_1.use(middleware_io_1.requestValidator$({ body: credentialsSchema })), operators_1.mergeMap(req => rxjs_1.of(req).pipe(operators_1.map(req => req.body), operators_1.mergeMap(check_password_1.checkPassword), operators_1.mergeMap(get_user_by_email_1.getUser), operators_1.mergeMap(throw_if_not_admin_1.throwIfNotAdmin), operators_1.mergeMap(token_helper_1.generateTokenFromUser), operators_1.map(token => ({ body: { token } })), operators_1.catchError(() => rxjs_1.throwError(new core_1.HttpError('Unauthorized', core_1.HttpStatus.UNAUTHORIZED))))));
