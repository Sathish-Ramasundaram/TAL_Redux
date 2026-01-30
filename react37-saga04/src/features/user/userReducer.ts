import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './userActions';

// Shape of user state
interface UserState {
  loading: boolean;
  user: {
    name: string;
  } | null;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

// Reducer
export function userReducer(state = initialState, action: any): UserState {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
