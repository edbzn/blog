import { generateToken } from '@marblejs/middleware-jwt';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InstanceType } from 'typegoose';

import { Config } from '../../../../server/config';
import { User } from '../../user/model/user.model';
import { generateTokenPayload } from './token.helper';

export const generateTokenFromUser = (user: InstanceType<User>) =>
  of(generateTokenPayload(user)).pipe(
    map(generateToken({ secret: Config.jwt.secret })),
  );
