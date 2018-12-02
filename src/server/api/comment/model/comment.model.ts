import { MongooseDocument } from "mongoose";
import { prop, Typegoose, post } from "typegoose";
import { ICommentPayload } from "../helpers/comment-payload";
import { MongoError } from "mongodb";

export type CommentDocument = Comment & MongooseDocument;

@post<Comment>('save', (error: MongoError, _doc: any, next: any) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
})
export class Comment extends Typegoose {
  @prop({ required: String, unique: true })
  author: string;

  @prop({ required: String })
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
