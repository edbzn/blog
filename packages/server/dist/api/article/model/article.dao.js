"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const collection_1 = require("../../../utils/collection");
const article_model_1 = require("./article.model");
var ArticleDao;
(function (ArticleDao) {
    ArticleDao.model = new article_model_1.Article().getModelForClass(article_model_1.Article, {
        schemaOptions: { timestamps: true, emitIndexErrors: true },
    });
    ArticleDao.ARTICLE_SORTING_FIELDS = ['_id', 'publishedAt'];
    ArticleDao.findAll = (query) => rxjs_1.from(collection_1.applyCollectionQuery(query)(() => ArticleDao.model.find()));
    ArticleDao.findAllPublished = (query) => rxjs_1.from(collection_1.applyCollectionQuery(query)(() => {
        let qb = { published: true };
        if (query.tags) {
            if (typeof query.tags === 'string') {
                qb = Object.assign({}, qb, { tags: query.tags });
            }
            else if (query.tags.length > 0) {
                qb = Object.assign({}, qb, { tags: { $in: [...query.tags] } });
            }
        }
        return ArticleDao.model.find(qb);
    }));
    ArticleDao.findById = (id) => rxjs_1.from(ArticleDao.model.findById(id).exec());
    ArticleDao.findByTitle = (slug) => rxjs_1.from(ArticleDao.model.findOne({ slug }).exec());
    ArticleDao.removeById = (id) => rxjs_1.from(ArticleDao.model.findByIdAndDelete(id).exec());
    ArticleDao.updateById = (id, body) => rxjs_1.from(ArticleDao.model.findByIdAndUpdate(id, body).exec());
    ArticleDao.create = (body) => {
        const article = new article_model_1.Article();
        article.title = body.title;
        article.markdown = body.markdown;
        article.html = body.html;
        article.posterUrl = body.posterUrl;
        article.tags = body.tags;
        article.published = body.published;
        article.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
        article.metaTitle = body.metaTitle;
        article.metaDescription = body.metaDescription;
        article.lang = body.lang;
        article.slug = body.slug;
        article.reactions = body.reactions;
        return rxjs_1.from(ArticleDao.model.create(article));
    };
})(ArticleDao = exports.ArticleDao || (exports.ArticleDao = {}));
