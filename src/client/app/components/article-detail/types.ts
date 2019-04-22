import { Resource, TimeStampableResource } from '../../utils/resource';

export interface Comment extends Resource, TimeStampableResource {
  comment: string;
  author: string;
}
