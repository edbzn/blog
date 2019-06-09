"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const never_nullable_1 = require("../../../utils/never-nullable");
const user_dao_1 = require("../model/user.dao");
exports.getMe = (req) => rxjs_1.of(req).pipe(operators_1.map(req => req.user._id), operators_1.mergeMap(user_dao_1.UserDao.findById), operators_1.mergeMap(never_nullable_1.neverNullable));
