export const constructQuery = (
  discoverCategory,
  useReleaseDateRange,
  minRating,
  maxRating,
  releaseStartDate,
  releaseEndDate,
  genre,
  keywords) => {
  let query = "";
  if (minRating !== -1) {
    query = `&vote_average.gte=${minRating}`;
  }
  if (maxRating !== -1) {
    query = query + `&vote_average.lte=${maxRating}`;
  }
  if (useReleaseDateRange) {
    if (discoverCategory === "tv series") {
      query = query + `&air_date.gte=${releaseStartDate}&air_date.lte=${releaseEndDate}`;
    } else if (discoverCategory === "movie") {
      query = query + `&primary_release_date.gte=${releaseStartDate}&primary_release_date.lte=${releaseEndDate}`;
    }
  }
  if (genre !== "" && genre !== undefined) {
    query = query + `&with_genres=${genre}`;
  }
  if (keywords !== "") {
    query = query + `&with_keywords=${keywords}`;
  }
  return query
};