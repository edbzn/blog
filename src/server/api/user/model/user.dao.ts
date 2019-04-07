import { from } from "rxjs";

import { UserPayload } from "../../authentication/effects/signup.effect";
import { User, USER_PUBLIC_FIELDS } from "./user.model";

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
        .select(USER_PUBLIC_FIELDS)
        .exec(),
    );

  export const findById = (id: string) =>
    from(
      model
        .findById(id)
        .select(USER_PUBLIC_FIELDS)
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
