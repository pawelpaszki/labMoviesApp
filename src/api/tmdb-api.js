export const signup = (email, password, firstName, lastName) => {
  return fetch('/api/accounts', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
  }).then((response) => {
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const login = (email, password) => {
  return fetch('/api/accounts/security/token', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ email: email, password: password })
  }).then(res => res.json())
};

export const getFavouriteCollection = (collection) => {
  return fetch(`/api/accounts/${window.localStorage.getItem('accountId')}/favourite_${collection}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
  }).then(res => res.json())
};

export const addToFavouriteCollection = (id, collection) => {

  return fetch(`/api/accounts/${window.localStorage.getItem('accountId')}/favourite_${collection}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ id: id })
  }).then(res => res.json()).catch((error) => {
    console.log(error);
  });
};

export const removeFromFavouriteCollection = (id, collection) => {
  return fetch(`/api/accounts/${window.localStorage.getItem('accountId')}/favourite_${collection}/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
  }).then(res => res.json())
};

export const getSearchResults = (resource, query) => {
  let url = `/api/movies?vote_count.gte=200${query}`;
  if (resource === "tv") {
    url = `/api/tv?vote_count.gte=200&${query}`;
  }
  return fetch(
    url, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getSeries = (page = 1) => {
  return fetch(
    `/api/tv?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getSimilarMovies = (page = 1, id) => {
  return fetch(
    `/api/movies/${id}/similar?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const searchActors = (query) => {
  return fetch(
    `/api/actors/search?query=${query}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getSimilarTvSeries = (page = 1, id) => {
  return fetch(
    `/api/tv/${id}/similar?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovies = (page = 1) => {
  return fetch(
    `/api/movies?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovie = (args) => {
  let id = ""
  if (args?.queryKey) {
    const [, idPart] = args.queryKey;
    id = idPart.id;
  } else {
    id = args.id;
  }
  return fetch(
    `/api/movies/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((res) => res.json());
};

export const getTvSeriesById = (args) => {
  let id = ""
  if (args?.queryKey) {
    const [, idPart] = args.queryKey;
    id = idPart.id;
  } else {
    id = args.id;
  }
  return fetch(
    `/api/tv/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((res) => res.json());
};

export const getPopularActors = (page = 1) => {
  return fetch(
    `/api/actors?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `/api/movies/upcoming?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getActorDetails = (args) => {
  let id = ""
  if (args?.queryKey) {
    const [, idPart] = args.queryKey;
    id = idPart.id;
  } else {
    id = args.id;
  }
  return fetch(
    `/api/actors/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((res) => res.json());
};

export const getGenres = async () => {
  return fetch(
    `/api/genres`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieImages = (args) => {
  const id = args.queryKey[1].id;
  return fetch(
    `/api/movies/${id}/images`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
    .catch((error) => {
      throw error
    });
};

export const getTvSeriesImages = (args) => {
  const id = args.queryKey[1].id;
  return fetch(
    `/api/tv/${id}/images`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
    .catch((error) => {
      throw error
    });
};

export const getActorImages = (args) => {
  const id = args.queryKey[1].id;
  return fetch(
    `/api/actors/${id}/images`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
    .catch((error) => {
      throw error
    });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};
