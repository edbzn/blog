import { use, HttpError, HttpStatus, Effect } from "@marblejs/core";
import { generateToken } from "@marblejs/middleware-jwt";
import { of, throwError, forkJoin, iif } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { UserDao } from "../../user/model/user.dao";
import { Config } from "../../../config";
import { generateTokenPayload } from "../helpers/token.helper";
import { neverNullable } from "../../../utils/never-nullable";
import { credentialsValidator$ } from "../helpers/credentials.validator";
import { compare$ } from "../helpers/hash";

export const loginEffect$: Effect = req$ =>
  req$.pipe(
    use(credentialsValidator$),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(body =>
          forkJoin(
            UserDao.findByEmail(body.email).pipe(mergeMap(neverNullable)),
            of(body.password),
          ),
        ),
        mergeMap(data => {
          console.log(data);
          return compare$(data[1], data[0].password);
        }),
        mergeMap(isUser =>
          iif(
            () => isUser,
            UserDao.findByEmail(req.body.email),
            throwError("Unauthorized"),
          ),
        ),
        mergeMap(neverNullable),
        map(generateTokenPayload),
        map(generateToken({ secret: Config.jwt.secret })),
        map(token => ({ body: { token } })),
        catchError(err => {
          console.log(err);
          return throwError(
            new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED),
          );
        }),
      ),
    ),
  );
