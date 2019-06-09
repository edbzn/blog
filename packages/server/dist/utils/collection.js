"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var SortDir;
(function (SortDir) {
    SortDir[SortDir["ASC"] = 1] = "ASC";
    SortDir[SortDir["DESC"] = -1] = "DESC";
})(SortDir = exports.SortDir || (exports.SortDir = {}));
exports.applyCollectionQuery = ({ limit = 0, page = 1, sortBy = '_id', sortDir = SortDir.ASC, }) => (dbQuery) => __awaiter(this, void 0, void 0, function* () {
    const collectionQuery = dbQuery()
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .sort({ [sortBy]: sortDir });
    return {
        collection: yield collectionQuery,
        total: yield dbQuery().countDocuments(),
    };
});
