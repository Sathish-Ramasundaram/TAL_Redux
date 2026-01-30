
// Action type constants
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SAVE_PROFILE = "SAVE_PROFILE";

// Action creators
export const updateProfile = (name: string) => ({
  type: UPDATE_PROFILE,
  payload: name,
});

export const saveProfile = () => ({
  type: SAVE_PROFILE,
});
