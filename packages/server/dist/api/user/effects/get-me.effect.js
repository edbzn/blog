"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const get_me_1 = require("../helpers/get-me");
const throw_if_not_admin_1 = require("../helpers/throw-if-not-admin");
exports.getMeEffect$ = req$ => req$.pipe(operators_1.mergeMap(get_me_1.getMe), operators_1.mergeMap(throw_if_not_admin_1.throwIfNotAdmin), operators_1.map(user => ({ body: user })), operators_1.catchError(err => rxjs_1.throwError(() => err instanceof core_1.HttpError ? err : new core_1.HttpError('User does not exist', core_1.HttpStatus.NOT_FOUND))));
