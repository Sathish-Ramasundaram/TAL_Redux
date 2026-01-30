
// Action type constants
export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_FAILURE = "SEARCH_USER_FAILURE";

// Action creators
export const searchUser = (query: string) => ({
  type: SEARCH_USER,
  payload: query,
});

export const searchUserSuccess = (result: string) => ({
  type: SEARCH_USER_SUCCESS,
  payload: result,
});

export const searchUserFailure = (error: string) => ({
  type: SEARCH_USER_FAILURE,
  payload: error,
});