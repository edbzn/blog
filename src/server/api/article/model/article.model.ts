import { MongoError } from 'mongodb';
import { MongooseDocument } from 'mongoose';
import { arrayProp, post, prop, Typegoose } from 'typegoose';

import { ArticleLanguage } from './article-language';

export type ArticleDocument = Article & MongooseDocument;

@post<Article>('save', (error: MongoError, _doc: any, next: Function) => {
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

  @prop({ enum: ArticleLanguage, default: ArticleLanguage.FR })
  lang: ArticleLanguage;

  /**
   * Automatically mapped by mongoose
   */
  createdAt: Date;
  updatedAt: Date;
}
