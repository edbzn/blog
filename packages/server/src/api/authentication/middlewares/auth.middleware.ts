import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { flatMap } from 'rxjs/operators';

import { Config } from '../../../config';
import { neverNullable } from '../../../utils/never-nullable';
import { throwIfNotAdmin } from '../../user/helpers/throw-if-not-admin';
import { UserDao } from '../../user/model/user.dao';
import { generateTokenPayload } from '../helpers/token.helper';

type Payload = ReturnType<typeof generateTokenPayload>;

const jwtConfig: VerifyOptions = { secret: Config.jwt.secret };

const verifyPayload$ = (payload: Payload) =>
  UserDao.findById(payload._id).pipe(
    flatMap(neverNullable),
    flatMap(throwIfNotAdmin)
  );

export const authorize$ = jwt$(jwtConfig, verifyPayload$);
