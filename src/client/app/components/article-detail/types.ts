import { Resource, TimeStampableResource } from '../../utils/resource';

export interface IComment extends Resource, TimeStampableResource {
  comment: string;
  author: string;
}
