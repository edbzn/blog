import { HttpEffect, HttpError, HttpStatus, use } from "@marblejs/core";
import { requestValidator$, t } from "@marblejs/middleware-io";
import { generateToken } from "@marblejs/middleware-jwt";
import { forkJoin, of, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { Config } from "../../../config";
import { UserDao } from "../../user/model/user.dao";
import { createHash$ } from "../helpers/hash";
import { generateTokenPayload } from "../helpers/token.helper";

const userSchema = t.type({
  email: t.string,
  password: t.string,
  firstName: t.string,
  lastName: t.string,
});

export type UserPayload = t.TypeOf<typeof userSchema>;

const checkUserAlreadyExists = (body: UserPayload) =>
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
    map(generateTokenPayload),
    map(generateToken({ secret: Config.jwt.secret })),
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
        mergeMap(body => checkUserAlreadyExists(body)),
        mergeMap(body => createUserFromRequest(body)),
        map(token => ({ body: { token } })),
      ),
    ),
  );
