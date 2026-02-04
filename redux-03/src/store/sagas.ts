
import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { startLoading, stopLoading } from "./appSlice";
import { fetchDemoStatus } from "../api/demoApi";
import { loginApi } from "../api/authApi";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";

// worker saga
function* startLoadingWorker(): SagaIterator {
  try {
    const result: any = yield call(fetchDemoStatus);
    console.log("Saga got:", result);

    yield put(stopLoading());
  } catch (e) {
    console.log("Saga error", e);
    yield put(stopLoading());
  }
}


function* loginWorker(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const { email, password } = action.payload;

    yield call(loginApi, email, password);

    yield put(loginSuccess());
  } catch (e: any) {
    yield put(loginFailure(e.message));
  }
}


// watcher saga
export function* rootSaga() {
  yield takeLatest(startLoading.type, startLoadingWorker);
  yield takeLatest(loginRequest.type, loginWorker);
}
