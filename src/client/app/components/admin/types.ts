import { ArticleReactions } from '../../../..//server/api/article/model/article-reactions';
import { ArticleLanguage } from '../../../../server/api/article/model/article-language';
import { Resource, TimeStampableResource } from '../../utils/resource';

export interface Draft {
  title: string;
  slug: string;
  markdown: string;
  html: string;
  tags: string[];
  published: boolean;
  posterUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  lang: ArticleLanguage;
  reactions: ArticleReactions;
}

export interface Article extends Draft, Resource, TimeStampableResource {}
