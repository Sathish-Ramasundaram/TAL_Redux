import {
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from './searchActions';

// Shape of search state
interface SearchState {
  loading: boolean;
  query: string;
  result: string | null;
  error: string | null;
}

// Initial state
const initialState: SearchState = {
  loading: false,
  query: '',
  result: null,
  error: null,
};

// Reducer
export function searchReducer(state = initialState, action: any): SearchState {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        loading: true,
        query: action.payload,
        error: null,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload,
      };

    case SEARCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
