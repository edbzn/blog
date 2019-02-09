import { from } from 'rxjs';

import { SignupPayload } from '../../auth/helpers/signup-payload';
import { User, USER_PUBLIC_FIELDS, USER_SECURE_FIELDS } from './user.model';

export namespace UserDao {
  export const model = new User().getModelForClass(User, {
    schemaOptions: { timestamps: true },
  });

  export const create = (payload: SignupPayload) =>
    from(
      model.create(
        new User({
          email: payload.email,
          password: payload.password,
          firstName: payload.firstName,
          lastName: payload.lastName,
        }),
      ),
    );

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
