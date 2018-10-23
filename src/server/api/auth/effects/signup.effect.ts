import { use, HttpError, HttpStatus, Effect } from "@marblejs/core";
import { generateToken } from "@marblejs/middleware-jwt";
import { of, throwError, from } from "rxjs";
import { mergeMap, map, catchError, combineLatest } from "rxjs/operators";
import { UserDao } from "../../user/model/user.dao";
import { Config } from "../../../config";
import { generateTokenPayload } from "../helpers/token.helper";
import { credentialsValidator$ } from "../helpers/credentials.validator";
import * as bcrypt from "bcrypt";

export const loginEffect$: Effect = req$ =>
  req$.pipe(
    use(credentialsValidator$),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        combineLatest([from(req.body), from(createHash(req.body.password))]),
        mergeMap(body =>
          UserDao.create({
            email: body.email,
            password: createHash(),
          }),
        ),
        // map(generateTokenPayload),
        // map(generateToken({ secret: Config.jwt.secret })),
        // map(token => ({ body: { token, user: token } })),
        catchError(() =>
          throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
        ),
      ),
    ),
  );

const createHash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);
