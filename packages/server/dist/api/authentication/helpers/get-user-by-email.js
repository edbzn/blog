"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const never_nullable_1 = require("../../../utils/never-nullable");
const user_dao_1 = require("../../user/model/user.dao");
exports.getUser = ({ email }) => user_dao_1.UserDao.findByEmail(email).pipe(operators_1.mergeMap(never_nullable_1.neverNullable));
