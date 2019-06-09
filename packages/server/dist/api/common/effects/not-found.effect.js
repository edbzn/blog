"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@marblejs/core");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
exports.notFoundEffect$ = req$ => req$.pipe(operators_1.switchMap(() => rxjs_1.throwError(new core_1.HttpError('Route not found', core_1.HttpStatus.NOT_FOUND))));
