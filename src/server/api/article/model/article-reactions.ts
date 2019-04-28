export type ReactionType = 'heart' | 'unicorn' | 'mark';

export interface ArticleReaction {
  count: number;
}

export interface ArticleReactions {
  types: { [key in ReactionType]: ArticleReaction };
}

export const defaultReactions: ArticleReactions = {
  types: {
    heart: {
      count: 0,
    },
    unicorn: {
      count: 0,
    },
    mark: {
      count: 0,
    },
  },
};
