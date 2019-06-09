"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const isNullable = (data) => data === null || data === undefined;
exports.neverNullable = (data) => isNullable(data) ? rxjs_1.throwError(new Error()) : rxjs_1.of(data);
