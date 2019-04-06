import { from } from "rxjs";

import { User, USER_PUBLIC_FIELDS, USER_SECURE_FIELDS } from "./user.model";
import { UserPayload } from "../../auth/effects/signup.effect";

export namespace UserDao {
  export const model = new User().getModelForClass(User, {
    schemaOptions: { timestamps: true },
  });

  export const create = (payload: UserPayload) => {
    const user = new User();
    user.email = payload.email;
    user.password = payload.password;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;

    return from(model.create(user));
  };

  export const findByEmail = (email: string) =>
    from(
      model
        .findOne({ email })
        .select(USER_SECURE_FIELDS)
        .exec(),
    );

  export const findById = (id: string) =>
    from(
      model
        .findById(id)
        .select(USER_SECURE_FIELDS)
        .exec(),
    );

  export const findByIdPublic = (id: string) =>
    from(
      model
        .findById(id)
        .select(USER_PUBLIC_FIELDS)
        .exec(),
    );

  export const findAll = () =>
    from(
      model
        .find()
        .select(USER_SECURE_FIELDS)
        .exec(),
    );

  export const findAllPublic = () =>
    from(
      model
        .find()
        .select(USER_PUBLIC_FIELDS)
        .exec(),
    );
}
