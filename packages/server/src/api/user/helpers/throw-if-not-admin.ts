import { HttpError, HttpStatus } from '@marblejs/core';
import { iif, of, throwError } from 'rxjs';
import { InstanceType } from 'typegoose';

import { User, UserRole } from '../model/user.model';

export const throwIfNotAdmin = (user: InstanceType<User>) =>
  iif(
    () => user.roles.includes(UserRole.ADMIN),
    of(user),
    throwError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED))
  );
