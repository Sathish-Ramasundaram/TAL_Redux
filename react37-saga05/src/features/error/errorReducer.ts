
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./errorActions";

// Shape of error feature state
interface ErrorState {
  loading: boolean;
  data: string | null;
  error: string | null;
}

// Initial state
const initialState: ErrorState = {
  loading: false,
  data: null,
  error: null,
};

// Reducer
export function errorReducer(
  state = initialState,
  action: any
): ErrorState {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
