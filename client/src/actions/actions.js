export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_USER = 'SET_USER';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setSort(value) {
  return { type: SET_SORT, value };
}

export function setUser(value) {
  return { type: SET_USER, value}
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}