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
  lang: 'fr' | 'en';
  reactions: {
    types: {
      heart: {
        count: number;
      };
      unicorn: {
        count: number;
      };
      mark: {
        count: number;
      };
    };
  };
}

export interface Article extends Draft, Resource, TimeStampableResource {}
