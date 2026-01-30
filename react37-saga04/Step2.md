Goal: 
1. Intentionally fail an API call, catch the error in Saga, store it in Redux, and show it in the UI.

src/
 ├── app/
 │    ├── store.ts
 │    └── rootSaga.ts
 │
 ├── features/
 │    ├── error/
 │    │    ├── errorActions.ts
 │    │    ├── errorReducer.ts
 │    │    └── errorSaga.ts
 │
 ├── App.tsx
 └── index.tsx

2. 
mkdir src\features\error

type nul > src\features\error\errorActions.ts

```

// Action type constants
export const FETCH_DATA = "FETCH_DATA";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Action creators
export const fetchData = () => ({
  type: FETCH_DATA,
});

export const fetchDataSuccess = (data: string) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});


```
3. 

type nul > src\features\error\errorReducer.ts

```

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./errorActions";

// Shape of error feature state
interface ErrorState {
  loading: boolean;
  data: string | null;
  error: string | null;
}

// Initial state
const initialState: ErrorState = {
  loading: false,
  data: null,
  error: null,
};

// Reducer
export function errorReducer(
  state = initialState,
  action: any
): ErrorState {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

```
4. 

src\features\error\errorSaga.ts

type nul > src\features\error\errorSaga.ts 

we’ll intentionally fail an API, catch the error in Saga, and dispatch a failure action.

```

import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_DATA,
  fetchDataSuccess,
  fetchDataFailure,
} from "./errorActions";

// Fake API that FAILS intentionally
function fetchDataApi() {
  return new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Server is down"));
    }, 1500);
  });
}

// Worker saga
function* handleFetchData() {
  try {
    // This call will fail
    const data: string = yield call(fetchDataApi);

    // This line will NOT run
    yield put(fetchDataSuccess(data));
  } catch (error) {
    // Error is caught here
    yield put(fetchDataFailure("Failed to fetch data"));
  }
}

// Watcher saga
export function* errorSaga() {
  yield takeEvery(FETCH_DATA, handleFetchData);
}

```
5. 

dispatch(FETCH_DATA)
  ↓
errorSaga hears it
  ↓
fetchDataApi (fails after 1.5s)
  ↓
catch block runs
  ↓
FETCH_DATA_FAILURE dispatched
  ↓
errorReducer stores error
  ↓
UI can show error

6. 

Add errorSaga to rootSaga.

import { errorSaga } from "../features/error/errorSaga";

Add errorSaga() to all([])

7. Test
Expected:
App loads fine
No console errors
No behavior change yet (UI not wired) — correct

8. Add errorReducer to store.

import { errorReducer } from '../features/error/errorReducer';

To: 
reducer: {
  dummy: dummyReducer,
  user: userReducer,
  search: searchReducer,
  error: errorReducer,
},

9. Optional verification

Add temporarily (after store creation):

console.log("Redux state:", store.getState());

You should see an error key (as key) in the output.
Remove the log after confirming.

10. 

update App.tsx

Replace code with 
```

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./features/error/errorActions";
import { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.error
  );

  return (
    <div style={{ padding: 40 }}>
      <h2>Project 4 – Error Handling with Redux-Saga</h2>

      <button
        onClick={() => dispatch(fetchData())}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer font-medium border-none"
      >
        Fetch Data (Fail)
      </button>

      <div style={{ marginTop: 20 }}>
        {loading && <p>Loading...</p>}

        {data && <p>Data: {data}</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
    </div>
  );
}

export default App;

```
11. Test

Click “Fetch Data (Fail)”
What you should see:
Immediately:
Loading...
After ~1.5 seconds:
Error: Failed to fetch data

✅ No crash
✅ No infinite loading
✅ Controlled failure

✅ PROJECT 4 — COMPLETED 🎉🎉🎉

You now understand:

✔ Why error handling is mandatory
✔ How try / catch works in sagas
✔ How failure actions are used
✔ How reducers store error state
✔ How UI reacts to errors cleanly

This is real production knowledge.