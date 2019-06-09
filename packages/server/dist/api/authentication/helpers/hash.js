"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const rxjs_1 = require("rxjs");
const createHash = (password) => bcrypt.hash(password, 10);
exports.createHash$ = (password) => rxjs_1.from(createHash(password));
const compare = (password, hash) => bcrypt.compare(password, hash);
exports.compare$ = (password, hash) => rxjs_1.from(compare(password, hash));
