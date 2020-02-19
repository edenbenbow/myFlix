export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USERS = 'SET_USERS';
//export const SET_FAVORITE = 'SET_FAVORITE';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setSort(value) {
  return { type: SET_SORT, value };
}

export function setUser(value) {
  return { type: SET_USER, value}
}

export function setUsers(value) {
  return { type: SET_USERS, value}
}

//export function setFavorite(value) {
  //return { type: SET_FAVORITE, value };
//}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}