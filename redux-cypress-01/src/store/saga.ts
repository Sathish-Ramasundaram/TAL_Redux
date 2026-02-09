
import { put, takeEvery, delay } from "redux-saga/effects";

function* fetchWorker() {
  yield delay(500); // pretend API delay
  yield put({ type: "FETCH_SUCCESS", payload: "Hello from Saga" });
}

export function* rootSaga() {
  yield takeEvery("FETCH_REQUEST", fetchWorker);
}
