import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_DATA,
  fetchDataSuccess,
  fetchDataFailure,
} from "./errorActions";

// Fake API that FAILS intentionally
function fetchDataApi() {
  return new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Server is down"));
    }, 1500);
  });
}

// Worker saga
function* handleFetchData() {
  try {
    // This call will fail
    const data: string = yield call(fetchDataApi);

    // This line will NOT run
    yield put(fetchDataSuccess(data));
  } catch (error) {
    // Error is caught here
    yield put(fetchDataFailure("Failed to fetch data"));
  }
}

// Watcher saga
export function* errorSaga() {
  yield takeEvery(FETCH_DATA, handleFetchData);
}
