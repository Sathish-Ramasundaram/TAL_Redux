1.  Already installed react that used react02 project

2.  Run this inside project root
    npm install @reduxjs/toolkit react-redux redux-saga

What Each Package Does (2-line understanding)

@reduxjs/toolkit
→ Modern Redux setup (store + slices + reducers simplified)

react-redux
→ Connect React components to Redux store

redux-saga
→ Handles async flows (API, delay, retry, cancel)

No Rspack Config Changes Needed
Verify Install Worked
After install, run:

npm run dev

If app runs → we are ready.

3. Tiny Goal:
   Create Redux store + attach Saga middleware

mkdir src\store

src/store/index.ts
type nul > src\store\index.ts

```

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
export const store = configureStore({
  reducer: {}, // empty for now — we add later
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// run saga later (we will add rootSaga next step)


```

4.

import { configureStore } from "@reduxjs/toolkit";
This is the modern Redux way to create a store.
It auto-configures Redux with good defaults (less setup code).

import createSagaMiddleware from "redux-saga";
We import the function that creates Saga middleware.
Middleware = a middle layer that can intercept actions.
Intercept = catch something in the middle before it reaches its final destination.

Flow with Middleware:
dispatch(action)
↓
middleware intercepts it 👈
↓
reducer
↓
state updated

Component → Action → Middleware → Reducer

const sagaMiddleware = createSagaMiddleware();
We are creating the Saga engine instance.
Right now it exists — but not running any saga yet.

export const store = configureStore({
We are creating the Redux store object.
Redux store = one global object that holds your app’s shared data.
Redux store is:
A centralized state container that holds the entire app state and updates it through reducers when actions are dispatched.

export → other files can import and use it.

reducer: {}, -----Reducer Section
Reducers define how state changes.
Right now empty — because we haven’t created slices yet.

middleware section
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(sagaMiddleware),

concat(sagaMiddleware)
We ADD saga middleware to the list.

5. Example — Without Redux
   const [user, setUser] = useState(...)

Only that component knows user.

🧾 Example — With Redux Store
store.user = { name: "Sathish" }
Any component can access it:
Header shows name
Dashboard uses name
Profile edits name
Same data source.

6.  A R S
    Action → message saying “something happened”
    Reducer → function that updates store based on the message
    Store → global data box

Action reports — Reducer decides — Store remembers

Think of a bank system:
📝 Action = deposit slip
👨‍💼 Reducer = bank clerk
🏦 Store = bank account ledger (a book or other collection of financial accounts.)

You don’t change the ledger yourself.
You submit a slip → clerk updates it.

Redux Flow:

Component
↓
dispatch(action)
↓
reducer runs
↓
store updates
↓
UI re-renders

7. Tiny Step:
   Connect Store Using Provider
   Redux gives a wrapper component called Provider.
   Provider makes the Redux store available to all React components.

8. Import in index.tsx

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

Wrap provider around app:
root.render(
<React.StrictMode>
<Provider store={store}>
<App />
</Provider>
</React.StrictMode>
);

<React.StrictMode> is a development-only helper wrapper in React.
It helps you find mistakes and unsafe code patterns early while building your app.

Provider makes the store available to all React components.

9. Before:
   App → no Redux access

Now:
Provider
↓
Redux Store
↓
App + all components can use Redux

No, visual change yet, Because we only connected wiring yet.

10. Tiny Goal:
    Create your first Redux slice (reducer)
    We will store just one thing: loading flag.

Note:
Slice contains reducer
Slice = reducer + actions + setup bundle
Reducer = state update function
Redux Toolkit gives this shortcut so we don’t write long switch statements.

11. create src/store/appSlice.ts

type nul > src\store\appSlice.ts

```

import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  loading: boolean;
};

const initialState: AppState = {
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = appSlice.actions;

export default appSlice.reducer;

```

No visual changes yet

12. Tiny Goal:
    Connect your new slice reducer to the Redux store

13. src/store/index.ts

import appReducer from "./appSlice";

From:
reducer: {},

To:
reducer: {
app: appReducer,
},

14. Your Redux store now has state like:

store
└── app
└── loading: false

15. No UI change Yet. No wiring.

So far we only did
store created ✅
slice created ✅
reducer connected ✅
Provider connected ✅

But no component is reading or dispatching yet → so UI doesn’t change.

16. Tiny Step:
    ✅ read loading from Redux
    ✅ show it on screen
    ✅ add button to toggle it
    ✅ click → UI updates

17. update App.tsx

```

import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "./store/appSlice";

function App() {
  const loading = useSelector((state: any) => state.app.loading);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

        <h1 className="text-2xl font-bold mb-6">
          Redux + Saga Demo
        </h1>

        <div className="mb-6">
          <span className="text-sm text-gray-500">
            Loading State
          </span>

          <div className={`mt-2 text-lg font-semibold
            ${loading ? "text-green-600" : "text-red-600"}
          `}>
            {loading ? "ACTIVE" : "INACTIVE"}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch(startLoading())}
            className="flex-1 bg-blue-600 text-white py-2 rounded
                       hover:bg-blue-700 active:scale-95 transition"
          >
            Start
          </button>

          <button
            onClick={() => dispatch(stopLoading())}
            className="flex-1 bg-gray-600 text-white py-2 rounded
                       hover:bg-gray-700 active:scale-95 transition"
          >
            Stop
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;

```

useSelector reads data from Redux store.
useDispatch sends actions to Redux store.

18. Behavior:
    Click Start → Redux updates → UI changes
    Click Stop → Redux updates → UI changes
