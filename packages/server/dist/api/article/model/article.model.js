"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const article_language_1 = require("./article-language");
const article_reactions_1 = require("./article-reactions");
let Article = class Article extends typegoose_1.Typegoose {
    constructor() {
        super(...arguments);
        this.tags = [];
        this.metaTitle = null;
        this.metaDescription = null;
        this.posterUrl = null;
        this.publishedAt = null;
        this.published = false;
        this.reactions = article_reactions_1.defaultReactions;
    }
};
__decorate([
    typegoose_1.prop({ required: String, unique: true }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ required: String, unique: true }),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    typegoose_1.prop({ required: String }),
    __metadata("design:type", String)
], Article.prototype, "markdown", void 0);
__decorate([
    typegoose_1.prop({ required: String }),
    __metadata("design:type", String)
], Article.prototype, "html", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String, required: true, default: [] }),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    typegoose_1.prop({ required: String }),
    __metadata("design:type", Object)
], Article.prototype, "metaTitle", void 0);
__decorate([
    typegoose_1.prop({ required: String }),
    __metadata("design:type", Object)
], Article.prototype, "metaDescription", void 0);
__decorate([
    typegoose_1.prop({ required: String }),
    __metadata("design:type", Object)
], Article.prototype, "posterUrl", void 0);
__decorate([
    typegoose_1.prop({ default: null }),
    __metadata("design:type", Object)
], Article.prototype, "publishedAt", void 0);
__decorate([
    typegoose_1.prop({ required: Boolean, default: false }),
    __metadata("design:type", Object)
], Article.prototype, "published", void 0);
__decorate([
    typegoose_1.prop({ enum: article_language_1.ArticleLanguage, default: article_language_1.ArticleLanguage.FR }),
    __metadata("design:type", String)
], Article.prototype, "lang", void 0);
__decorate([
    typegoose_1.prop({ default: article_reactions_1.defaultReactions }),
    __metadata("design:type", Object)
], Article.prototype, "reactions", void 0);
Article = __decorate([
    typegoose_1.post('save', (error, _doc, next) => {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('There was a duplicate key error'));
        }
        else {
            next();
        }
    })
], Article);
exports.Article = Article;
