Redux + Saga Dependencies:

npm install @reduxjs/toolkit react-redux redux-saga

@reduxjs/toolkit ->	Official Redux wrapper (store, reducer, middleware made easy)
react-redux	-> Connects Redux store to React (Provider, useDispatch, useSelector)
redux-saga -> Middleware that handles side effects (async, delay, API, etc.)

Verify: 
In package.json: You see something like these

"dependencies": {
  "@reduxjs/toolkit": "...",
  "react-redux": "...",
  "redux-saga": "..."
}

2. create redux store
type nul > src/store.ts

Add this code: 
```

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// 1. Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Create the Redux store
export const store = configureStore({
  reducer: {}, // empty reducer for now
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // we are using saga, not thunk
    }).concat(sagaMiddleware),
});

// 3. Export types (for future use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 4. Export sagaMiddleware so we can run sagas later
export { sagaMiddleware };

```

3. Connect Redux to React (index.tsx)

import { Provider } from "react-redux";
import { store } from "./store";

And ----- To:

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

4. Verify Redux is working

Add this line
// ✅ TEMPORARY verification log 
console.log("Redux store initialized", store.getState());

Before: 
// 2. Create the Redux store
export const store = configureStore({
  reducer: {}, // empty reducer for now
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // we are using saga, not thunk
    }).concat(sagaMiddleware),
});

// 3. Export types (for future use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

After: 

// 2. Create the Redux store
export const store = configureStore({
  reducer: {}, // empty reducer for now
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // we are using saga, not thunk
    }).concat(sagaMiddleware),
});

// ✅ TEMPORARY verification log 
console.log("Redux store initialized", store.getState());

// 3. Export types (for future use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

Console Output: 
Redux store initialized {}


4.2 Error in console
Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.

to fix this Add a Dummy Reducer

create 
type nul > src/dummyReducer.ts

Add this: 
```

const initialState = {};

export function dummyReducer(state = initialState, action: any) {
  return state;
}

```

What it does?
Always returns state
Never changes anything
Valid reducer function ✔

4.3 update store.ts

Import this: 
import { dummyReducer } from "./dummyReducer";

And,
Before: 
export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

After: 

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

4.4 Test 
No error


5. What is Redux?
Redux is a centralized place to store and manage application state.

Imagine your app is a school:
Students (components) need information
If everyone keeps their own notes → chaos
So the school creates:
📘 One register book (Redux Store)
Everyone:
Reads from the same book
Updates it in a controlled way
That book = Redux Store

6. What problem Redux solves: 
Without Redux:
State scattered across components
Props drilling
Hard to debug
Hard to share data

With Redux:
One source of truth
Predictable updates
Easy debugging

7. Store -> Action -> Reducer

1️⃣ Store
The single object that holds all state

Store = {
  user,
  todos,
  settings,
  ...
}

2️⃣ Action
A plain object that describes what happened

{ type: "LOGIN_CLICKED" }

Actions:
Don’t change state
Just describe events

3️⃣ Reducer
A pure function that updates state

(state, action) => newState

Reducer:
No async
No delay
No API calls

8. Redux must be synchronous and predictable
Redux-Saga handles side effects (async work) outside reducers and components.

9. What are “Side Effects”?
Side effects are things like:
API calls
setTimeout
setInterval
Logging
Background tasks

❌ Reducers are not allowed to do these.


| Redux        | Saga                  |
| ------------ | --------------------- |
| Stores state | Handles async         |
| Sync only    | Async allowed         |
| Reducers     | Generator functions   |
| Predictable  | Powerful flow control |

