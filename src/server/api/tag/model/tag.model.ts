import { prop, Typegoose } from "typegoose";
import { MongooseDocument } from "mongoose";

export type TagDocument = Tag & MongooseDocument;

export class Tag extends Typegoose {
  @prop({ required: true })
  name: string = "";
}
