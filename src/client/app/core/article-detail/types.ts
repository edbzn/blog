import { IResource, ITimeStampableResource } from "../../utils/resource";

export interface IComment extends IResource, ITimeStampableResource {
  text: string;
  author: string;
}
