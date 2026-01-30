// Action type constants
export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// Action creators
export const fetchUser = () => ({
  type: FETCH_USER,
});

export const fetchUserSuccess = (user: { name: string }) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});
