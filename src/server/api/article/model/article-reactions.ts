export type ReactionType = 'love' | 'poney' | 'mark';

export interface ArticleReaction {
  count: number;
}

export interface ArticleReactions {
  types: { [key in ReactionType]: ArticleReaction };
}

export const defaultReactions: ArticleReactions = {
  types: {
    love: {
      count: 0,
    },
    poney: {
      count: 0,
    },
    mark: {
      count: 0,
    },
  },
};
