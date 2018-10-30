export interface IArticlePayload {
  title: string;
  markdown: string;
  html: string;
  posterUrl: string;
  tags: string[];
  published: boolean;
  publishedAt: Date;
  metaTitle: string;
  metaDescription: string;
}
