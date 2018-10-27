import { IResource } from "../../utils/resource";

export interface IDraft {
  title: string;
  content: string;
  tags: string[];
  posterUrl: string | null;
  published: boolean;
  publishedAt: string | null;
}

export interface IArticle extends IResource, IDraft {
  createdAt: string;
  updatedAt: string;
}
