import { MongooseDocument } from "mongoose";
import { arrayProp, prop, Typegoose } from "typegoose";
import { IArticlePayload } from "../helpers/article-payload";

export type ArticleDocument = Article & MongooseDocument;

export class Article extends Typegoose {
  @prop({ required: String, unique: true })
  title: string;

  @prop({ required: String })
  markdown: string;

  @prop({ required: String })
  html: string;

  @prop({ required: String })
  metaTitle?: string;

  @prop({ required: String })
  metaDescription?: string;

  @arrayProp({ items: String, required: true, default: [] })
  tags: string[] = [];

  @prop({ required: String })
  posterUrl: string;

  @prop({ required: Boolean, default: false })
  published = false;

  @prop({ default: null })
  publishedAt: Date | null = null;

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
