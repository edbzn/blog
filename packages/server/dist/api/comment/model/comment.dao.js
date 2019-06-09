"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const collection_1 = require("../../../utils/collection");
const comment_model_1 = require("./comment.model");
var CommentDao;
(function (CommentDao) {
    CommentDao.model = new comment_model_1.Comment().getModelForClass(comment_model_1.Comment, {
        schemaOptions: { timestamps: true, emitIndexErrors: true },
    });
    CommentDao.COMMENT_SORTING_FIELDS = ['_id', 'createdAt'];
    CommentDao.findAllByArticle = (articleId, query) => rxjs_1.from(collection_1.applyCollectionQuery(query)(() => CommentDao.model.find({ articleId: articleId })));
    CommentDao.create = (body) => {
        const comment = new comment_model_1.Comment();
        comment.articleId = body.articleId;
        comment.author = body.author;
        comment.comment = body.comment;
        return rxjs_1.from(CommentDao.model.create(comment));
    };
})(CommentDao = exports.CommentDao || (exports.CommentDao = {}));
