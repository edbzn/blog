import { HttpEffect, HttpError, HttpStatus, use } from "@marblejs/core";
import { generateToken } from "@marblejs/middleware-jwt";
import { forkJoin, of, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { Config } from "../../../config";
import { UserDao } from "../../user/model/user.dao";
import { SignupPayload } from "../helpers/signup-payload";
import { generateTokenPayload } from "../helpers/token.helper";
import { userValidator$ } from "../helpers/user.validator";
import { createHash$ } from "../helpers/hash";

export const signupEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(userValidator$),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap((body: SignupPayload) => UserDao.findByEmail(body.email)),
        mergeMap(
          user =>
            null !== user
              ? throwError(
                  new HttpError(
                    "This email already exists",
                    HttpStatus.CONFLICT,
                  ),
                )
              : forkJoin(of(req.body), createHash$(req.body.password)),
        ),
        mergeMap(payload =>
          UserDao.create({
            email: payload[0].email,
            password: payload[1],
            firstName: payload[0].firstName,
            lastName: payload[0].lastName,
          }),
        ),
        map(generateTokenPayload),
        map(generateToken({ secret: Config.jwt.secret })),
        map(token => ({ body: { token } })),
        catchError(
          err =>
            err instanceof HttpError
              ? throwError(err)
              : throwError(
                  new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR),
                ),
        ),
      ),
    ),
  );
