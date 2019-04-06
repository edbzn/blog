import { HttpEffect, HttpError, HttpStatus, use } from "@marblejs/core";
import { requestValidator$, t } from "@marblejs/middleware-io";
import { generateToken } from "@marblejs/middleware-jwt";
import { forkJoin, iif, of, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { InstanceType } from "typegoose";

import { Config } from "../../../config";
import { neverNullable } from "../../../utils/never-nullable";
import { UserDao } from "../../user/model/user.dao";
import { User } from "../../user/model/user.model";
import { compare$ } from "../helpers/hash";
import { generateTokenPayload } from "../helpers/token.helper";

const credentialsSchema = t.type({
  email: t.string,
  password: t.string,
});

export type CredentialsPayload = t.TypeOf<typeof credentialsSchema>;

const checkUserExists = (body: CredentialsPayload) =>
  UserDao.findByEmail(body.email).pipe(mergeMap(neverNullable));

const combineHashAndPassword = (body: CredentialsPayload) =>
  forkJoin(checkUserExists(body), of(body.password));

const checkPassword = ([user, password]: [InstanceType<User>, string]) =>
  compare$(password, user.password);

const getUserIfAuthorized = (authorized: boolean, email: string) =>
  iif(
    () => authorized,
    UserDao.findByEmail(email).pipe(mergeMap(neverNullable)),
    throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
  );

export const loginEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: credentialsSchema })),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(combineHashAndPassword),
        mergeMap(checkPassword),
        mergeMap(authorized => getUserIfAuthorized(authorized, req.body.email)),
        map(generateTokenPayload),
        map(generateToken({ secret: Config.jwt.secret })),
        map(token => ({ body: { token } })),
        catchError(() =>
          throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
        ),
      ),
    ),
  );
