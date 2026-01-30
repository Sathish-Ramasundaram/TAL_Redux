
import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_USER,
  fetchUserSuccess,
  fetchUserFailure,
} from "./userActions";

// Fake API function
function fetchUserApi() {
  return new Promise<{ name: string }>((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe" });
    }, 2000);
  });
}

// Worker saga
function* handleFetchUser() {
  try {
    // call the fake API
    const user: { name: string } = yield call(fetchUserApi);

    // dispatch success action
    yield put(fetchUserSuccess(user));
  } catch (error) {
    // dispatch failure action
    yield put(fetchUserFailure("Failed to fetch user"));
  }
}

// Watcher saga
export function* userSaga() {
  yield takeEvery(FETCH_USER, handleFetchUser);
}