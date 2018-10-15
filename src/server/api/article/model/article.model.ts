import { MongooseDocument } from 'mongoose';
import { arrayProp, prop, Ref, Typegoose } from 'typegoose';

import { Tag } from '../../tag/model/tag.model';

export type ArticleDocument = Article & MongooseDocument;

export class Article extends Typegoose {
  @prop({ required: true, unique: true })
  title: string = "";

  @prop({ required: true })
  content: string = "";

  @prop({ required: true })
  createdAt: Date = new Date();

  @prop({ required: true })
  updatedAt: Date = new Date();

  @arrayProp({ itemsRef: Tag, required: true })
  tags: Ref<Tag>[] = [];

  constructor(title: string, content: string) {
    super();

    this.title = title;
    this.content = content;
  }
}
