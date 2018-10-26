import { IResource } from "../../utils/resource";

export interface IUser extends IResource {
  email: string;
  roles: string[];
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
