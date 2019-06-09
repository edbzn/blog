"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const rxjs_1 = require("rxjs");
const user_model_1 = require("../model/user.model");
exports.throwIfNotAdmin = (user) => rxjs_1.iif(() => user.roles.includes(user_model_1.UserRole.ADMIN), rxjs_1.of(user), rxjs_1.throwError(new core_1.HttpError('Unauthorized', core_1.HttpStatus.UNAUTHORIZED)));
