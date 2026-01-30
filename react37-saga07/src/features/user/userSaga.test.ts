import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { handleFetchUser, fetchUserApi } from "./userSaga";
import { fetchUserSuccess, fetchUserFailure } from "./userActions";



describe("userSaga – success case", () => {
  it("dispatches success action when API call succeeds", () => {
    return expectSaga(handleFetchUser)
      .provide([
        [call(fetchUserApi), { name: "John Doe" }]
      ])
      .put(fetchUserSuccess({ name: "John Doe" }))
      .run();
  });
});


describe("userSaga – failure case", () => {
  it("dispatches failure action when API call fails", () => {
    return expectSaga(handleFetchUser)
      .provide([
        [call(fetchUserApi), Promise.reject(new Error("API error"))]
      ])
      .put(fetchUserFailure("Failed to fetch user"))
      .run();
  });
});
