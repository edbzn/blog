import { from } from "rxjs";

import {
  applyCollectionQuery,
  CollectionQueryOptions,
} from "../../../utils/collection";
import { CommentPayload } from "../effects/post-comment-by-article.effect";
import { Comment } from "./comment.model";

export namespace CommentDao {
  export const model = new Comment().getModelForClass(Comment, {
    schemaOptions: { timestamps: true, emitIndexErrors: true },
  });

  export const COMMENT_SORTING_FIELDS = ["_id", "createdAt"];

  export const findAllByArticle = (
    articleId: string,
    query: CollectionQueryOptions,
  ) =>
    from(
      applyCollectionQuery(query)(() => model.find({ articleId: articleId })),
    );

  export const create = (body: CommentPayload) => {
    const comment = new Comment();
    comment.articleId = body.articleId;
    comment.author = body.author;
    comment.comment = body.comment;

    return from(model.create(comment));
  };
}
