import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function sortCollection (key, ascending, numeric) {
  return (function sortFunction(a, b) {
    if (ascending) {
      if (numeric) {
        return a[key].toString().localeCompare(b[key].toString(), undefined, { numeric: true })
      } 
      return a[key].toString().localeCompare(b[key].toString());
    } else {
      if (numeric) {
        return b[key].toString().localeCompare(a[key].toString(), undefined, { numeric: true })
      }
      return b[key].toString().localeCompare(a[key].toString());
    }
  });
}

export const movieSortKeys = [
  {
    "key": "popularity.ascending",
    "sort_key": "popularity",
    "ascending": true,
    "numeric": true,
  },
  {
    "key": "popularity.descending",
    "sort_key": "popularity",
    "ascending": false,
    "numeric": true,
  },
  {
    "key": "title.ascending",
    "sort_key": "title",
    "ascending": true,
    "numeric": false,
  },
  {
    "key": "title.descending",
    "sort_key": "title",
    "ascending": false,
    "numeric": false,
  },
  {
    "key": "average_vote.ascending",
    "sort_key": "vote_average",
    "ascending": true,
    "numeric": true,
  },
  {
    "key": "average_vote.descending",
    "sort_key": "vote_average",
    "ascending": false,
    "numeric": true,
  },
]

export const tvSeriesSortKeys = [
  {
    "key": "popularity.ascending",
    "sort_key": "popularity",
    "ascending": true,
    "numeric": true,
  },
  {
    "key": "popularity.descending",
    "sort_key": "popularity",
    "ascending": false,
    "numeric": true,
  },
  {
    "key": "title.ascending",
    "sort_key": "original_name",
    "ascending": true,
    "numeric": false,
  },
  {
    "key": "title.descending",
    "sort_key": "original_name",
    "ascending": false,
    "numeric": false,
  },
  {
    "key": "average_vote.ascending",
    "sort_key": "vote_average",
    "ascending": true,
    "numeric": true,
  },
  {
    "key": "average_vote.descending",
    "sort_key": "vote_average",
    "ascending": false,
    "numeric": true,
  },
]