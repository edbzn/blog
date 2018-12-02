import { IResource, ITimeStampableResource } from "../../utils/resource";

export interface IDraft {
  title: string;
  markdown: string;
  html: string;
  tags: string[];
  published: boolean;
  posterUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
}

export interface IArticle extends IDraft, IResource, ITimeStampableResource {}

export interface IDraftFormRefs {
  titleCtrl: HTMLInputElement;
  markdownCtrl: HTMLTextAreaElement;
  posterUrlCtrl: HTMLInputElement;
  posterCtrl: HTMLInputElement;
  tagsCtrl: HTMLInputElement;
  metaTitleCtrl: HTMLInputElement;
  metaDescriptionCtrl: HTMLInputElement;
} 
