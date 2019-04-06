import { MongoError } from 'mongodb';
import { MongooseDocument } from 'mongoose';
import { post, prop, Typegoose } from 'typegoose';

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
}
