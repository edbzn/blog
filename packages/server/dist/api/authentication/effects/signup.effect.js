"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const middleware_io_1 = require("@marblejs/middleware-io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const user_dao_1 = require("../../user/model/user.dao");
const hash_1 = require("../helpers/hash");
const token_helper_1 = require("../helpers/token.helper");
const userSchema = middleware_io_1.t.type({
    email: middleware_io_1.t.string,
    password: middleware_io_1.t.string,
    firstName: middleware_io_1.t.string,
    lastName: middleware_io_1.t.string,
});
const throwIfUserAlreadyExists = (body) => user_dao_1.UserDao.findByEmail(body.email).pipe(operators_1.mergeMap(user => null != user
    ? rxjs_1.throwError(new core_1.HttpError('This email already exists', core_1.HttpStatus.CONFLICT))
    : rxjs_1.of(body)));
const createUser = (body) => rxjs_1.forkJoin(rxjs_1.of(body), hash_1.createHash$(body.password)).pipe(operators_1.mergeMap(([payload, password]) => user_dao_1.UserDao.create({
    email: payload.email,
    password,
    firstName: payload.firstName,
    lastName: payload.lastName,
})));
const generateToken = (user) => rxjs_1.of(user).pipe(operators_1.mergeMap(token_helper_1.generateTokenFromUser), operators_1.catchError(() => rxjs_1.throwError(new core_1.HttpError('Something went wrong', core_1.HttpStatus.INTERNAL_SERVER_ERROR))));
exports.signupEffect$ = req$ => req$.pipe(core_1.use(middleware_io_1.requestValidator$({ body: userSchema })), operators_1.mergeMap(req => rxjs_1.of(req).pipe(operators_1.map(req => req.body), operators_1.mergeMap(throwIfUserAlreadyExists), operators_1.mergeMap(createUser), operators_1.mergeMap(generateToken), operators_1.map(token => ({ body: { token } })))));
