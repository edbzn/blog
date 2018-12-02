import { MongooseDocument } from "mongoose";
import { arrayProp, prop, Typegoose, post } from "typegoose";
import { IArticlePayload } from "../helpers/article-payload";
import { MongoError } from "mongodb";

export type ArticleDocument = Article & MongooseDocument;

@post<Article>('save', (error: MongoError, _doc: any, next: any) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
})
export class Article extends Typegoose {
  @prop({ required: String, unique: true })
  title: string;

  @prop({ required: String })
  markdown: string;

  @prop({ required: String })
  html: string;

  @arrayProp({ items: String, required: true, default: [] })
  tags: string[] = [];

  @prop({ required: String })
  metaTitle: string | null = null;

  @prop({ required: String })
  metaDescription: string | null = null;

  @prop({ required: String })
  posterUrl: string | null = null;

  @prop({ default: null })
  publishedAt: Date | null = null;

  @prop({ required: Boolean, default: false })
  published = false;

  /**
   * Automatically mapped by mongoose
   */
  createdAt: Date;
  updatedAt: Date;

  constructor(payload?: IArticlePayload) {
    super();

    if (payload) {
      this.title = payload.title;
      this.markdown = payload.markdown;
      this.html = payload.html;
      this.posterUrl = payload.posterUrl;
      this.tags = payload.tags;
      this.published = payload.published;
      this.publishedAt = payload.publishedAt;
      this.metaTitle = payload.metaTitle;
      this.metaDescription = payload.metaDescription;
    }
  }
}
