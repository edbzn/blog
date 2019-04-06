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

const compareHashAndPassword = ([user, password]: [InstanceType<User>, string]) =>
  compare$(password, user.password);

const checkPassword = (body: CredentialsPayload) =>
  combineHashAndPassword(body).pipe(
    mergeMap(compareHashAndPassword),
    mergeMap(authorized =>
      iif(
        () => authorized,
        of(body),
        throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
      ),
    ),
  );

const getUser = ({ email }: { email: string }) =>
  UserDao.findByEmail(email).pipe(mergeMap(neverNullable));

const generateTokenFromUser = (user: InstanceType<User>) =>
  of(generateTokenPayload(user)).pipe(
    map(generateToken({ secret: Config.jwt.secret })),
  );

export const loginEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: credentialsSchema })),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(checkPassword),
        mergeMap(getUser),
        mergeMap(generateTokenFromUser),
        map(token => ({ body: { token } })),
        catchError(() =>
          throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
        ),
      ),
    ),
  );
