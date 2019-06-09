"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const get_me_1 = require("../helpers/get-me");
const throw_if_not_admin_1 = require("../helpers/throw-if-not-admin");
const user_dao_1 = require("../model/user.dao");
exports.getUsersEffect$ = req$ => req$.pipe(operators_1.flatMap(get_me_1.getMe), operators_1.flatMap(throw_if_not_admin_1.throwIfNotAdmin), operators_1.flatMap(user_dao_1.UserDao.findAllPublic), operators_1.map(body => ({ body })));
