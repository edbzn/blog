import { from } from "rxjs";
import { Article } from "./article.model";

export namespace ArticleDao {
  export const model = new Article("", "", "").getModelForClass(Article, {
    schemaOptions: { timestamps: true },
  });

  export const findAll = () => from(model.find().exec());

  export const findAllPublished = () =>
    from(model.find({ published: true }).exec());

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
