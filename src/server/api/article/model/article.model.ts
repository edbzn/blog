import { MongooseDocument } from "mongoose";
import { arrayProp, prop, Typegoose, instanceMethod } from "typegoose";

export type ArticleDocument = Article & MongooseDocument;

export class Article extends Typegoose {
  @prop({ required: String, unique: true })
  title: string;

  @prop({ required: String })
  content: string;

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

  constructor(title: string, content: string, posterUrl: string) {
    super();

    this.title = title;
    this.content = content;
    this.posterUrl = posterUrl;
  }
}
