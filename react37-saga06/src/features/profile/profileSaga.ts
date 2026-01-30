import { throttle, select } from "redux-saga/effects";
import { SAVE_PROFILE } from "./profileActions";
import { RootState } from "../../app/store";

// Selector function
const selectProfile = (state: RootState) => state.profile;

// Worker saga
function* handleSaveProfile() {
  // Read latest profile state from Redux
  const profile: ReturnType<typeof selectProfile> = yield select(selectProfile);

  console.log("Saving profile...", profile);
}

// Watcher saga
export function* profileSaga() {
  // Allow SAVE_PROFILE at most once every 3 seconds
  yield throttle(3000, SAVE_PROFILE, handleSaveProfile);
}
