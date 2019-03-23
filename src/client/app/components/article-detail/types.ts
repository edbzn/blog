import { IResource, ITimeStampableResource } from "../../utils/resource";

export interface IComment extends IResource, ITimeStampableResource {
  comment: string;
  author: string;
}
