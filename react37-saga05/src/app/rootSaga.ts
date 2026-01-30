
import { all } from "redux-saga/effects";
import { buttonSaga } from "../features/button/buttonSaga";
import { userSaga } from "../features/user/userSaga";
import { searchSaga } from "../features/search/searchSaga";
import { errorSaga } from "../features/error/errorSaga";

export function* rootSaga() {
  yield all([
    buttonSaga(),
    userSaga(),
    searchSaga(),
    errorSaga(),
  ]);
}
