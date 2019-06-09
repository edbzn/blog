import { generateExpirationInHours, generateToken } from '@marblejs/middleware-jwt';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InstanceType } from 'typegoose';

import { Config } from '../../../config';
import { User } from '../../user/model/user.model';

export const generateTokenPayload = (user: InstanceType<User>) => ({
  _id: user.id,
  email: user.email,
  exp: generateExpirationInHours(24),
});

export const generateTokenFromUser = (user: InstanceType<User>) =>
  of(generateTokenPayload(user)).pipe(map(generateToken({ secret: Config.jwt.secret })));
