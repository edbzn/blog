import { IResource } from "../../utils/resource";

export interface IDraft {
  title: string;
  markdown: string;
  html: string;
  metaTitle?: string;
  metaDescription?: string;
  tags: string[];
  posterUrl: string | null;
  published: boolean;
  publishedAt: string | null;
}

export interface IArticle extends IResource, IDraft {
  createdAt: string;
  updatedAt: string;
}
