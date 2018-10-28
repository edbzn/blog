import { from } from "rxjs";
import { Article } from "./article.model";
import {
  CollectionQueryOptions,
  applyCollectionQuery,
} from "../../../utils/collection";

export namespace ArticleDao {
  export const model = new Article("", "", "").getModelForClass(Article, {
    schemaOptions: { timestamps: true },
  });

  export const ARTICLE_SORTING_FIELDS = ["_id", "publishedAt"];

  export const findAll = (query: CollectionQueryOptions) =>
    from(applyCollectionQuery(query)(() => model.find()));

  export const findAllPublished = (query: CollectionQueryOptions) =>
    from(applyCollectionQuery(query)(() => model.find({ published: true })));

  export const findById = (id: string) => from(model.findById(id).exec());

  export const removeById = (id: string) =>
    from(model.findByIdAndDelete(id).exec());

  export const updateById = (id: string, body: any) =>
    from(model.findByIdAndUpdate(id, body).exec());

  export const create = (body: any) => {
    return from(
      model.create(new Article(body.title, body.content, body.posterUrl)),
    );
  };
}
