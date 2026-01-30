
# Project 5 – Testing Redux-Sagas

This project demonstrates how to **test Redux-Saga logic in isolation** using **Jest** and **redux-saga-test-plan**.

The focus is on verifying **success and failure flows** of sagas without involving React components, the DOM, or a real Redux store.

---

## 🧠 What This Project Teaches

- Why Redux-Sagas should be tested separately from UI
- How to test generator functions using `redux-saga-test-plan`
- Mocking API calls in saga tests
- Testing both success and failure scenarios
- Writing reliable and maintainable saga tests

---

## 🛠 Tech Stack

- TypeScript
- Redux-Saga
- Jest
- redux-saga-test-plan

---

## 📁 Project Structure

```

src/
├── features/
│    └── user/
│         ├── userActions.ts
│         ├── userSaga.ts
│         └── userSaga.test.ts

````

---

## 🎯 What Is Being Tested

The `userSaga` is responsible for:
- Calling an API to fetch user data
- Dispatching a success action on success
- Dispatching a failure action on error

```ts
FETCH_USER
  ↓
call(fetchUserApi)
  ↓
FETCH_USER_SUCCESS / FETCH_USER_FAILURE
````

---

## 🔄 Saga Logic Overview

```ts
try {
  const user = yield call(fetchUserApi);
  yield put(fetchUserSuccess(user));
} catch (error) {
  yield put(fetchUserFailure("Failed to fetch user"));
}
```

---

## 🧪 Test Cases Covered

### ✅ Success Case

* Mocks the API call to return user data
* Asserts that `FETCH_USER_SUCCESS` is dispatched

### ❌ Failure Case

* Mocks the API call to throw an error
* Asserts that `FETCH_USER_FAILURE` is dispatched

---

## 🧠 Key Testing Technique

### Mocking `call` effects

```ts
.provide([
  [call(fetchUserApi), { name: "John Doe" }]
])
```

This replaces the real API call and returns controlled test data.

---

## 🧪 How to Run Tests

1. Install dependencies:

   ```bash
   npm install -D jest ts-jest redux-saga-test-plan
   ```

2. Run tests:

   ```bash
   npm test
   ```

### Expected Output

```
PASS src/features/user/userSaga.test.ts
 ✓ userSaga – success case
 ✓ userSaga – failure case
```

---

## 🧠 Why Saga Testing Matters

* Prevents regressions in async logic
* Ensures correct behavior during failures
* Improves confidence during refactoring
* Keeps business logic independent of UI

---

## ✅ Learning Outcome

After completing this project, you should be able to:

* Test sagas without a Redux store
* Mock async calls cleanly
* Validate both success and error paths
* Write production-grade saga tests

---

## 🧠 One-Line Takeaway

> **Sagas are just generator functions — and generator functions can be tested like any other function.**

---

## 🚀 Next Steps

Possible next projects:

* Advanced saga effects (`select`, `throttle`)
* Task cancellation using `race` and `cancel`
* Auto-save forms with Saga
* Redux-Saga interview questions

```

---

