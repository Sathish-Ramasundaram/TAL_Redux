npm install redux-saga-test-plan --save-dev

1. We Test ONLY ONE Saga First

This one: 
function* startLoadingWorker() {
  const result = yield call(fetchDemoStatus);
  yield put(stopLoading());
}

2. Export That Worker
Open saga.ts

From: 
function* startLoadingWorker()

To: 
export function* startLoadingWorker()

3. Create Test File
Create this file:
src/store/saga.test.ts

type nul > src\store\saga.test.ts

```

import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";

import { startLoadingWorker } from "./saga";
import { fetchDemoStatus } from "../api/demoApi";
import { stopLoading } from "./appSlice";

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

```
4. update package.json.

"test": "jest"

Run this: 
npm install --save-dev jest ts-jest @types/jest redux-saga-test-plan


5. Test: 
npm test


Expected: success. 


6. Test loginWorker (Success Case)
Change to: 
export function* loginWorker(...)

7. Add this in your test file: saga.test.ts

import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";

import { loginWorker } from "./sagas";
import { loginApi } from "../api/authApi";
import { loginSuccess } from "./authSlice";

Add This Test ----------------------------------------

test("loginWorker success flow", () => {
  const action = {
    payload: {
      email: "demo@demo.com",
      password: "1234",
    },
  };

  return expectSaga(loginWorker, action)

    // fake API result
    .provide([
      [call(loginApi, "demo@demo.com", "1234"), { success: true }],
    ])

    // expect success action
    .put(loginSuccess())

    .run();
});

8. Showing red line under action: 
import this in test file: 

import { loginRequest, loginSuccess } from "./authSlice";

Replace your action with: 
const action = loginRequest({
  email: "demo@demo.com",
  password: "1234",
});


9. npm test

success


10. Test Failure Case
import { loginFailure } from "./authSlice";


Add this below: 

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


11. npm test


12. sync test
To: 
export function* startSyncFlow()
export function* stopSyncFlow()
export function* syncWorker()

13. update test file: 
import { fork, cancel } from "redux-saga/effects";
import { startSyncFlow, stopSyncFlow, syncWorker } from "./sagas";
import { syncStopped } from "./syncSlice";


Add test: 
test("startSyncFlow forks syncWorker", () => {
  return expectSaga(startSyncFlow)
    .fork(syncWorker)
    .run();
});

14. Test cancel: 
import { createMockTask } from "redux-saga-test-plan";

Add this: 

test("stopSyncFlow cancels task and dispatches stopped", () => {
  const mockTask = createMockTask();

  // we must set the module variable manually
  const sagas = require("./sagas");
  sagas.syncTask = mockTask;

  return expectSaga(stopSyncFlow)
    .cancel(mockTask)
    .put(syncStopped())
    .run();
});



Saga.ts 
At top
From: 
let syncTask: any = null;

To: 
export let syncTask: any = null;

15. import { expectSaga, createMockTask } from "redux-saga-test-plan"; 
.cancel(mockTask) 
I receive two red line error. one -> createMockTask Two -> under cancel

16. Fix: 
Delete this 
import { createMockTask } from "redux-saga-test-plan";

Keep this: 
import { call, fork, cancel, put } from "redux-saga/effects";


Add this working test: 

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


update saga.ts to: 
export function* stopSyncFlow(): SagaIterator {
  const task = syncTask;

  if (task) {
    yield cancel(task);
    syncTask = null;
    yield put(syncStopped());
  }
}


17. 
18. 
19. 
20. 
21. 
22. 
23. 
24.  
25. 
26. 
27. 
28. 
29. 
30. 
31. 
32. 
33. 
34. 
35. 
36. 
37. 
38. 
39. 
40. 
41. 
42. 
43. 
44. 
45. 
46. 
47. 
48. 
49. 
50.  
51. 
52. 
53. 
54. 
55. 
56. 
57. 
58. 
59. 
60. 



