import { Resource } from '../../utils/resource';

export interface IUser extends Resource {
  email: string;
  roles: string[];
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
