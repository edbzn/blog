import { use, HttpError, HttpStatus, Effect } from "@marblejs/core";
import { generateToken } from "@marblejs/middleware-jwt";
import { of, throwError } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { UserDao } from "../../user/model/user.dao";
import { Config } from "../../../config";
import { generateTokenPayload } from "../helpers/token.helper";
import { neverNullable } from "../../../utils/never-nullable";
import { credentialsValidator$ } from "../helpers/credentials.validator";

export const loginEffect$: Effect = req$ =>
  req$.pipe(
    use(credentialsValidator$),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(UserDao.findByEmail),
        mergeMap(neverNullable),
        map(generateTokenPayload),
        map(generateToken({ secret: Config.jwt.secret })),
        map(token => ({ body: { token } })),
        catchError(() =>
          throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
        ),
      ),
    ),
  );
