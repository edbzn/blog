import { from } from "rxjs";
import {
  applyCollectionQuery,
  CollectionQueryOptions,
} from "../../../utils/collection";
import { ICommentPayload } from "../helpers/comment-payload";
import { Comment } from "./comment.model";

export namespace CommentDao {
  export const model = new Comment().getModelForClass(Comment, {
    schemaOptions: { timestamps: true },
  });

  export const COMMENT_SORTING_FIELDS = ["_id", "createdAt"];

  export const findAllByArticle = (
    articleId: string,
    query: CollectionQueryOptions,
  ) =>
    from(
      applyCollectionQuery(query)(() => model.find({ articleId: articleId })),
    );

  export const create = (body: ICommentPayload) => {
    return from(model.create(new Comment(body)));
  };
}
