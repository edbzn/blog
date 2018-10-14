import { from } from "rxjs";
import { Article } from "./article.model";

export namespace ArticleDao {
  export const model = new Article().getModelForClass(Article);

  export const findAll = () => from(model.find().exec());

  export const findById = (id: string) => from(model.findById(id).exec());
}
