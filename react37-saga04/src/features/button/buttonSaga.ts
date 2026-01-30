import { takeEvery, delay } from "redux-saga/effects";
import { BUTTON_CLICKED } from "./buttonActions";

function* handleButtonClick() {
  console.log("Saga received BUTTON_CLICKED action");
  yield delay(2000);
  console.log("Button clicked after 2 seconds (from saga)");
}

export function* buttonSaga() {
  yield takeEvery(BUTTON_CLICKED, handleButtonClick);
}
