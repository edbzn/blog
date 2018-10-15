import { MongooseDocument } from "mongoose";
import { arrayProp, prop, Ref, Typegoose } from "typegoose";

import { Tag } from "../../tag/model/tag.model";

export type ArticleDocument = Article & MongooseDocument;

export class Article extends Typegoose {
  @prop({ required: String, unique: true })
  title: string = "";

  @prop({ required: String })
  content: string = "";

  @prop({ required: String, default: new Date() })
  createdAt: Date = new Date();

  @prop({ required: Date, default: new Date() })
  updatedAt: Date = new Date();

  @arrayProp({ itemsRef: Tag, required: true })
  tags: Ref<Tag>[] = [];

  @prop({ required: String })
  posterUrl: string | null = null;

  constructor(title: string, content: string) {
    super();

    this.title = title;
    this.content = content;
  }
}
