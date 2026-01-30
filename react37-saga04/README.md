
```md
# Project 4 – Error Handling with Redux-Saga

This project demonstrates **proper error handling in Redux-Saga** using `try / catch`, failure actions, and Redux state to display errors in the UI.

The goal is to show how **asynchronous failures** (API errors, network issues) should be handled **gracefully**, without crashing the application or leaving the UI in a broken state.

---

## 🧠 What This Project Teaches

- Why error handling is mandatory in async flows
- How to use `try / catch` inside Redux-Saga
- Dispatching failure actions from sagas
- Storing error state in Redux
- Displaying error messages in the UI
- Avoiding infinite loading states

---

## 🛠 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React-Redux
- Redux-Saga
- Rspack

---

## 📁 Project Structure (Feature-Based)

```

src/
├── app/
│    ├── store.ts
│    └── rootSaga.ts
│
├── features/
│    └── error/
│         ├── errorActions.ts
│         ├── errorReducer.ts
│         └── errorSaga.ts
│
├── App.tsx
└── index.tsx

```

---

## 🎯 Problem This Project Solves

In real applications:
- APIs can fail
- Network requests can timeout
- Servers can return errors

If errors are not handled properly:
- The app may crash
- The UI may get stuck in loading state
- Users receive no feedback

This project demonstrates the **correct Redux-Saga error-handling pattern**.

---

## 🔄 Application Flow

```

User clicks "Fetch Data"
↓
FETCH_DATA action dispatched
↓
errorSaga listens for FETCH_DATA
↓
API call fails intentionally
↓
Error caught in try/catch
↓
FETCH_DATA_FAILURE dispatched
↓
errorReducer updates state
↓
UI re-renders and shows error

````

---

## 🧩 Redux State Shape

```ts
{
  error: {
    loading: boolean,
    data: string | null,
    error: string | null
  }
}
````

---

## 🧠 Key Concepts Explained

### `try / catch` in Redux-Saga

* Captures errors thrown by async calls
* Prevents application crashes
* Enables controlled failure handling

### Failure Actions (`*_FAILURE`)

* Represent unsuccessful outcomes
* Carry error messages
* Allow reducers to update error state

### Stopping Loading on Failure

Reducers must always set:

```ts
loading: false
```

on both success **and** failure to avoid infinite loaders.

---

## 🧪 How to Run and Test

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the app in the browser

3. Click:

   ```
   Fetch Data (Fail)
   ```

### Expected Behavior

* Immediately:

  ```
  Loading...
  ```
* After ~1.5 seconds:

  ```
  Error: Failed to fetch data
  ```

The application continues running without crashing.

---

## ✅ Learning Outcome

After completing this project, you should clearly understand:

* How Redux-Saga handles errors
* Why `try / catch` is essential in sagas
* How error state flows from Saga → Reducer → UI
* How to build resilient async logic

---

## 🧠 One-Line Takeaway

> **Every async saga must handle failure, not just success.**

---

## 🚀 Next Steps

Possible next projects:

* Testing Redux-Sagas
* Advanced effects (`select`, `throttle`)
* Task cancellation using `race` and `cancel`
* Auto-save forms using Saga

```

---

