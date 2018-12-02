import { validator$, Joi } from "@marblejs/middleware-joi";
import { SortDir } from "../../../utils/collection";

export interface CollectionQueryValidatorOpts {
  sortBy: string[];
}

export const commentCollectionQueryValidator$ = (
  opts: CollectionQueryValidatorOpts,
) =>
  validator$({
    query: Joi.object({
      sortBy: Joi.string()
        .valid(opts.sortBy)
        .default("_id"),
      sortDir: Joi.number()
        .valid(SortDir.DESC, SortDir.ASC)
        .default(SortDir.DESC),
      limit: Joi.number().min(0).default(10),
      page: Joi.number().min(1).default(1),
    }).required(),
  });
