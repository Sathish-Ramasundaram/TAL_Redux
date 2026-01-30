import { UPDATE_PROFILE } from "./profileActions";

// Shape of profile state
interface ProfileState {
  name: string;
}

// Initial state
const initialState: ProfileState = {
  name: "",
};

// Reducer
export function profileReducer(
  state = initialState,
  action: any
): ProfileState {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
}
