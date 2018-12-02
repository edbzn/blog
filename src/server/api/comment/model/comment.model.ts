import { MongooseDocument } from "mongoose";
import { prop, Typegoose } from "typegoose";
import { ICommentPayload } from "../helpers/comment-payload";

export type CommentDocument = Comment & MongooseDocument;

export class Comment extends Typegoose {
  @prop({ required: String, unique: true })
  author: string;

  @prop({ required: String, unique: true })
  comment: string;

  @prop({ required: String })
  articleId: string;

  /**
   * Automatically mapped by mongoose
   */
  createdAt: Date;
  updatedAt: Date;

  constructor(payload?: ICommentPayload) {
    super();

    if (payload) {
      this.author = payload.author;
      this.comment = payload.comment;
      this.articleId = payload.articleId;
    }
  }
}
