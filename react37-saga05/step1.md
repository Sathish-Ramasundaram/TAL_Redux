1. Testing Redux-Sagas
(Jest + redux-saga-test-plan)

2. 
So far:
You run sagas
You see output in the UI

But in real projects:
You must test sagas without UI

You must prove:
correct API calls
correct success actions
correct failure actions
👉 Saga testing = testing business logic in isolation

3. Test a saga without React, without DOM, without browser
We will test:
success case
failure case

4. 
Tools                   Used
Tool	                  Purpose
Jest	                   Test runner
redux-saga-test-plan	  Saga testing utilities

5. Install Testing Dependencies

npm install -D jest @types/jest redux-saga-test-plan

---
jest → runs tests
@types/jest → TypeScript support
redux-saga-test-plan → test sagas like normal functions

6. 
type nul > jest.config.js

```

module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
};

```

7. If ts-jest is not installed, install it:

npm install -D ts-jest

8. 
❌ What we will NOT test
UI
DOM
React components

✅ What we WILL test
call(fetchUserApi)
put(fetchUserSuccess)
put(fetchUserFailure)

9. create Test file

type nul > src\features\user\userSaga.test.ts

```

import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { handleFetchUser, fetchUserApi } from "./userSaga";
import { fetchUserSuccess } from "./userActions";

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


```

*** For this to work, you must export handleFetchUser from userSaga.ts.

10. Open userSaga.ts and change:

From: 
function* handleFetchUser() {

To: 
export function* handleFetchUser() {


Also, update 
To: 
export function fetchUserApi() {

---
What this does?
Runs saga like a normal function
Mocks the API call
Asserts that:
success action is dispatched

No browser.
No Redux store.
Pure logic test.

11. Add script to package.json:

"scripts": {
  "test": "jest"
}

12. Run 
npm test

Expected Output: 
PASS src/features/user/userSaga.test.ts
 ✓ userSaga – success case

13. 
Saga Failure Test
(Testing try / catch)

14. 
Your saga logic (simplified):

try {
  const user = yield call(fetchUserApi);
  yield put(fetchUserSuccess(user));
} catch (error) {
  yield put(fetchUserFailure("Failed to fetch user"));
}


We already tested:
✅ success path
Now we test:
❌ API throws error
✅ failure action is dispatched

🔑 Important Rule (Remember This)
Every saga test must cover BOTH success and failure paths.
If you test only success → test is incomplete.

15. update userSaga.test.ts

Add this import 
From: 
import { fetchUserSuccess } from "./userActions";

To: 
import { fetchUserSuccess, fetchUserFailure } from "./userActions";

Add this failure test below:

```

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

```

16. 
What This Test Does (Plain English)
.provide([
  [call(fetchUserApi), Promise.reject(new Error("API error"))]
])


Means:
“When the saga tries to call fetchUserApi,
pretend it throws an error.”

So:
try block fails
catch block runs
FETCH_USER_FAILURE is dispatched
Exactly what we want to verify.

17. Test

npm test

Expected Output: 

PASS src/features/user/userSaga.test.ts
 ✓ userSaga – success case
 ✓ userSaga – failure case     

