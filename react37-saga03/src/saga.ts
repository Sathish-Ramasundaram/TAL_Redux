import { takeEvery, delay, all } from "redux-saga/effects";
import { BUTTON_CLICKED } from "./actions";
import { userSaga } from "./userSaga";
import { searchSaga } from "./searchSaga";


// Worker saga
function* handleButtonClick() {
  console.log("Saga received BUTTON_CLICKED action");
  yield delay(2000);
  console.log("Button clicked after 2 seconds (from saga)");
}

// Root saga
export function* rootSaga() {
  yield all([
    takeEvery(BUTTON_CLICKED, handleButtonClick),
    userSaga(),
    searchSaga(),
  ]);
}
