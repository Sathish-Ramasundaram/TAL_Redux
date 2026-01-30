import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEARCH_USER,
  searchUserSuccess,
  searchUserFailure,
} from "./searchActions";

// Fake search API
function searchUserApi(query: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Results for "${query}"`);
    }, 1000);
  });
}

// Worker saga
function* handleSearchUser(action: any) {
  try {
    const result: string = yield call(searchUserApi, action.payload);
    yield put(searchUserSuccess(result));
  } catch (error) {
    yield put(searchUserFailure("Search failed"));
  }
}

// Watcher saga (IMPORTANT)
export function* searchSaga() {
  yield takeLatest(SEARCH_USER, handleSearchUser);
}
