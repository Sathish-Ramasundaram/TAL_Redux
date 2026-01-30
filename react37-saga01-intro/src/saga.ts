import { takeEvery, delay } from "redux-saga/effects";
import { BUTTON_CLICKED } from "./actions";

// Worker saga
function* handleButtonClick() {
  console.log("Saga received BUTTON_CLICKED action");
  yield delay(2000);
  console.log("Button clicked after 2 seconds (from saga)");
}

// Watcher saga
export function* rootSaga() {
  yield takeEvery(BUTTON_CLICKED, handleButtonClick);
}
