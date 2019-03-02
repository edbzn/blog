import { FilterQuery } from "mongodb";
import { from } from "rxjs";

import {
  applyCollectionQuery,
  ArticleCollectionQueryOptions,
} from "../../../utils/collection";
import { IArticlePayload } from "../helpers/article-payload";
import { ArticleLanguage } from "./article-language";
import { Article } from "./article.model";

export namespace ArticleDao {
  export const model = new Article().getModelForClass(Article, {
    schemaOptions: { timestamps: true, emitIndexErrors: true },
  });

  export const ARTICLE_SORTING_FIELDS = ["_id", "publishedAt"];

  export const findAll = (query: ArticleCollectionQueryOptions) =>
    from(applyCollectionQuery(query)(() => model.find()));

  export const findAllPublished = (query: ArticleCollectionQueryOptions) =>
    from(
      applyCollectionQuery(query)(() => {
        let qb: FilterQuery<Article> = { published: true };

        if (query.tags) {
          if (typeof query.tags === "string") {
            qb = { ...qb, tags: query.tags };
          } else if (query.tags.length > 0) {
            qb = { ...qb, tags: { $in: [...query.tags] } };
          }
        }

        return model.find(qb);
      }),
    );

  export const findById = (id: string) => from(model.findById(id).exec());

  export const findByTitle = (slug: string) =>  from(model.findOne({ slug }).exec());

  export const removeById = (id: string) =>
    from(model.findByIdAndDelete(id).exec());

  export const updateById = (id: string, body: IArticlePayload) =>
    from(model.findByIdAndUpdate(id, body).exec());

  export const create = (body: IArticlePayload) => {
    const article = new Article();
    article.title = body.title;
    article.markdown = body.markdown;
    article.html = body.html;
    article.posterUrl = body.posterUrl;
    article.tags = body.tags;
    article.published = body.published;
    article.publishedAt = body.publishedAt;
    article.metaTitle = body.metaTitle;
    article.metaDescription = body.metaDescription;
    article.lang = body.lang as ArticleLanguage;

    return from(model.create(article));
  };
}
