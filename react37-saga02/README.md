# Project 2 – Fetch User Data using Redux & Redux-Saga

This project demonstrates how to **fetch data asynchronously using Redux-Saga**, store the result in Redux state using a reducer, and display it in a React component.

It builds on **Project 1** by introducing **real Redux state**, **reducers**, and **UI → Saga → Redux → UI** data flow.

---

## 🧠 What This Project Teaches

- Why reducers are needed in Redux
- How Redux-Saga handles asynchronous operations
- How Saga dispatches success and failure actions
- How Redux stores fetched data
- How React components read Redux state using `useSelector`
- A complete Redux + Saga data flow

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
├── actions.ts           # Project 1 actions
├── userActions.ts       # User-related actions
├── userReducer.ts       # Reducer for user state
├── userSaga.ts          # Saga handling user fetch
├── saga.ts              # Root saga (combines all sagas)
├── dummyReducer.ts      # Minimal reducer for Redux validity
├── store.ts             # Redux store configuration
├── App.tsx              # UI component
└── index.tsx            # Application entry point

```

---

## 🔄 Application Flow

1. App component mounts
2. `FETCH_USER` action is dispatched
3. Redux-Saga listens for `FETCH_USER`
4. Saga calls a fake API (2-second delay)
5. Saga dispatches `FETCH_USER_SUCCESS`
6. Reducer updates Redux state
7. UI re-renders with fetched data

```

App → Action → Saga → Reducer → Store → UI

```

---

## 🧩 Redux State Shape

```ts
{
  dummy: {},
  user: {
    loading: boolean,
    user: {
      name: string
    } | null,
    error: string | null
  }
}
```

---

## 🧠 Key Concepts Explained

### Redux Reducer

- Stores application state
- Updates state synchronously
- Pure function with no side effects

### Redux-Saga

- Handles side effects like API calls
- Uses generator functions
- Dispatches actions using `put`
- Calls async functions using `call`

### React-Redux Hooks

- `useDispatch` → dispatch actions
- `useSelector` → read Redux state

---

## 🧪 How to Run and Test

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the app in the browser

### Expected Behavior

- On load:

  ```
  Loading user...
  ```

- After 2 seconds:

  ```
  User Name: John Doe
  ```

---

## 🚦 Why a Dummy Reducer Is Used

Redux requires at least one valid reducer.
Since Project 1 focused on Saga behavior, a minimal `dummyReducer` is included to keep the Redux store valid.

---

## ✅ Learning Outcome

After completing this project, you should clearly understand:

- The full Redux + Saga lifecycle
- How async data flows through Saga and reducers
- How UI automatically updates based on Redux state
- Proper separation of concerns in a Redux application
