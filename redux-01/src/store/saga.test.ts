import { expectSaga } from "redux-saga-test-plan";
import { call, fork, cancel, put } from "redux-saga/effects";

import { startLoadingWorker } from "./sagas";
import { fetchDemoStatus } from "../api/demoApi";
import { stopLoading } from "./appSlice";
import { loginWorker, startSyncFlow, stopSyncFlow, syncWorker } from "./sagas";
import { syncStopped } from "./syncSlice";
import { loginApi } from "../api/authApi";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";




test("startLoadingWorker works", () => {
  return expectSaga(startLoadingWorker)

    // pretend API returns this
    .provide([
      [call(fetchDemoStatus), { ok: true }]
    ])

    // expect saga to dispatch this action
    .put(stopLoading())

    .run();
});


test("loginWorker success flow", () => {
 const action = loginRequest({
  email: "demo@demo.com",
  password: "1234",
});


  return expectSaga(loginWorker, action)

    // fake API result
    .provide([
      [call(loginApi, "demo@demo.com", "1234"), { success: true }],
    ])

    // expect success action
    .put(loginSuccess())

    .run();
});


test("loginWorker failure flow", () => {
  const action = loginRequest({
    email: "bad@user.com",
    password: "wrong",
  });

  const error = new Error("Invalid credentials");

  return expectSaga(loginWorker, action)

    // make API throw error
    .provide([
      [call(loginApi, "bad@user.com", "wrong"), Promise.reject(error)],
    ])

    // expect failure action
    .put(loginFailure("Invalid credentials"))

    .run();
});

test("startSyncFlow forks syncWorker", () => {
  return expectSaga(startSyncFlow)
    .fork(syncWorker)
    .run();
});


test("stopSyncFlow cancels task", () => {
  const fakeTask: any = { name: "task" };

  // temporarily set
  (require("./sagas") as any).syncTask = fakeTask;

  const gen = stopSyncFlow();

  expect(gen.next().value).toEqual(
    cancel(fakeTask)
  );

  expect(gen.next().value).toEqual(
    put(syncStopped())
  );
});


