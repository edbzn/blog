import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserDao } from '../../user/model/user.dao';
import { createHash$ } from '../helpers/hash';
import { generateTokenFromUser } from '../helpers/token.helper';
import { User } from '../../user/model/user.model';
import { InstanceType } from 'typegoose';

const userSchema = t.type({
  email: t.string,
  password: t.string,
  firstName: t.string,
  lastName: t.string,
});

export type UserPayload = t.TypeOf<typeof userSchema>;

const throwIfUserAlreadyExists = (body: UserPayload) =>
  UserDao.findByEmail(body.email).pipe(
    mergeMap(user =>
      null != user
        ? throwError(
            new HttpError("This email already exists", HttpStatus.CONFLICT),
          )
        : of(body),
    ),
  );

const createUser = (body: UserPayload) =>
  forkJoin(of(body), createHash$(body.password)).pipe(
    mergeMap(([payload, password]) =>
      UserDao.create({
        email: payload.email,
        password,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    ),
  );

const generateToken = (user: InstanceType<User>) =>
  of(user).pipe(
    mergeMap(generateTokenFromUser),
    catchError(() =>
      throwError(
        new HttpError("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR),
      ),
    ),
  );

export const signupEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: userSchema })),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(throwIfUserAlreadyExists),
        mergeMap(createUser),
        mergeMap(generateToken),
        map(token => ({ body: { token } })),
      ),
    ),
  );
