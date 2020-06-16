export enum SearchQueryType {
  Q = 'q',
  Genres = 'genres',
}

export const DEFAULT_SEARCH_OPTION = {
  key: SearchQueryType.Q,
  text: 'General',
  value: SearchQueryType.Q,
};

export const SEARCH_OPTIONS = [
  DEFAULT_SEARCH_OPTION,
  {
    key: SearchQueryType.Genres,
    text: 'By Genres',
    value: SearchQueryType.Genres,
  },
];
