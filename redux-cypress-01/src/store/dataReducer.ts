
export interface DataState {
  text: string;
  loading: boolean;
}

const initialState: DataState = {
  text: "",
  loading: false,
};

export default function dataReducer(
  state = initialState,
  action: any
): DataState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { text: action.payload, loading: false };

    default:
      return state;
  }
}
