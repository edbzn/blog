export interface IDraft {
  title: string;
  content: string;
  tags: string[];
  posterUrl: string | null;
  published: boolean;
  publishedAt: Date | null;
}

export interface IArticle extends IDraft {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
