
```md
# Project 3 – Search Feature using Redux-Saga (`takeLatest`)

This project demonstrates how to handle **high-frequency user actions** (like typing in a search box) using **Redux-Saga’s `takeLatest` effect**.

The main goal is to show **why `takeLatest` is preferred over `takeEvery`** for scenarios such as search inputs, where old requests must be cancelled.

---

## 🧠 What This Project Teaches

- Difference between `takeEvery` and `takeLatest`
- How Redux-Saga cancels previous tasks automatically
- Handling fast user input safely
- Implementing a search feature using Redux + Saga
- Proper separation of UI, state, and side effects

---

## 🛠 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React-Redux
- Redux-Saga
- Rspack

---

## 📁 Project Structure

```

src/
├── searchActions.ts     # Search-related actions
├── searchReducer.ts    # Stores search state
├── searchSaga.ts       # Saga using takeLatest
├── saga.ts             # Root saga (combines all sagas)
├── store.ts            # Redux store configuration
├── App.tsx             # Search UI
└── index.tsx           # App entry point

```

---

## 🔍 Problem This Project Solves

### Without `takeLatest`
If a user types quickly:

```

r → re → rea → reac → react

```

Using `takeEvery` would:
- Fire multiple API calls
- Allow old responses to update the UI
- Cause **wrong or flickering results**

---

### With `takeLatest`
- Previous API calls are **cancelled**
- Only the **latest request** is processed
- UI always shows the correct result

---

## 🔄 Application Flow

```

User types in input
↓
SEARCH_USER action dispatched
↓
searchSaga listens (takeLatest)
↓
Previous saga task cancelled
↓
Fake API call (1 second delay)
↓
SEARCH_USER_SUCCESS
↓
searchReducer updates state
↓
UI re-renders with latest result

````

---

## 🧩 Redux State Shape

```ts
{
  search: {
    loading: boolean,
    query: string,
    result: string | null,
    error: string | null
  }
}
````

---

## 🧠 Key Concepts Explained

### `takeLatest`

* Cancels previous running saga tasks
* Keeps only the most recent action
* Ideal for:

  * Search inputs
  * Autocomplete
  * Filters
  * Rapid user interactions

---

### Fake API Delay

The delay is intentionally added to simulate a real backend call:

```ts
setTimeout(() => {
  resolve(`Results for "${query}"`);
}, 1000);
```

This makes cancellation behavior visible and easy to understand.

---

## 🧪 How to Run and Test

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the app in the browser

3. Type quickly in the search input

### Expected Behavior

* While typing:

  ```
  Searching...
  ```

* After ~1 second (only for latest input):

  ```
  Results for "react"
  ```

Old searches never appear.

---

## ✅ Learning Outcome

After completing this project, you should clearly understand:

* Why `takeLatest` exists
* When to use `takeLatest` vs `takeEvery`
* How Redux-Saga cancels async work
* How to handle fast user input correctly
* A real-world Redux-Saga search pattern

---

## 🧠 One-Line Takeaway

> **Use `takeEvery` for independent actions.
> Use `takeLatest` for fast, user-driven actions like search.**

---
