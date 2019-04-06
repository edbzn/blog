import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserDao } from '../../user/model/user.dao';
import { generateTokenFromUser } from '../helpers/generate-token';
import { createHash$ } from '../helpers/hash';

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

const createUserFromRequest = (body: UserPayload) =>
  forkJoin(of(body), createHash$(body.password)).pipe(
    mergeMap(([payload, password]) =>
      UserDao.create({
        email: payload.email,
        password,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    ),
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
        mergeMap(createUserFromRequest),
        map(token => ({ body: { token } })),
      ),
    ),
  );
