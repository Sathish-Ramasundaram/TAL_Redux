1. Project 3 — takeLatest vs takeEvery
(Search Box with API cancellation)

So far you’ve learned:
takeEvery → handles every action
Saga can fetch data
Redux can store async results
But real apps have this problem 👇
❌ Problem
User types fast in a search box:
r → re → rea → reac → react
If you use takeEvery:
5 API calls fire
Old responses may arrive late
UI can show wrong results

Use takeLatest
Cancel previous request, keep only the latest one

2. Goal: 
Build a search input where only the latest search request is processed.

Behavior:
User types in input
Saga listens to SEARCH action
Old API calls are cancelled
Only latest result updates UI

3. Data Flow: 
Input change
  ↓
dispatch(SEARCH_USER)
  ↓
takeLatest hears it
  ↓
cancel previous saga
  ↓
call API
  ↓
store result
  ↓
UI updates

4. Files

src/
 ├── searchActions.ts     🆕
 ├── searchReducer.ts    🆕
 ├── searchSaga.ts       🆕
 ├── saga.ts             🔁 (add searchSaga)
 ├── store.ts            🔁 (add searchReducer)
 └── App.tsx             🔁 (search UI)

5. create 
type nul > src/searchActions.ts       

Add this code: 
```

// Action type constants
export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_FAILURE = "SEARCH_USER_FAILURE";

// Action creators
export const searchUser = (query: string) => ({
  type: SEARCH_USER,
  payload: query,
});

export const searchUserSuccess = (result: string) => ({
  type: SEARCH_USER_SUCCESS,
  payload: result,
});

export const searchUserFailure = (error: string) => ({
  type: SEARCH_USER_FAILURE,
  payload: error,
});

```
6. Note: 
Actions do not care how fast they are fired.
Saga decides what to keep or cancel.

7. create
type nul >src/searchReducer.ts   

Add this code: 
```

import {
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from "./searchActions";

// Shape of search state
interface SearchState {
  loading: boolean;
  query: string;
  result: string | null;
  error: string | null;
}

// Initial state
const initialState: SearchState = {
  loading: false,
  query: "",
  result: null,
  error: null,
};

// Reducer
export function searchReducer(
  state = initialState,
  action: any
): SearchState {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        loading: true,
        query: action.payload,
        error: null,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload,
      };

    case SEARCH_USER_FAILURE:
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
8. Create the Saga using takeLatest

type nul > src/searchSaga.ts

Add this code: 
```

import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEARCH_USER,
  searchUserSuccess,
  searchUserFailure,
} from "./searchActions";

// Fake search API
function searchUserApi(query: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Results for "${query}"`);
    }, 1000);
  });
}

// Worker saga
function* handleSearchUser(action: any) {
  try {
    const result: string = yield call(searchUserApi, action.payload);
    yield put(searchUserSuccess(result));
  } catch (error) {
    yield put(searchUserFailure("Search failed"));
  }
}

// Watcher saga (IMPORTANT)
export function* searchSaga() {
  yield takeLatest(SEARCH_USER, handleSearchUser);
}


```

9. Add searchSaga to rootSaga

update saga.ts ------

import { searchSaga } from "./searchSaga";

Make this one line ------
From: 
import { takeEvery, delay } from "redux-saga/effects";
import { all } from "redux-saga/effects";
To: 
import { takeEvery, delay, all } from "redux-saga/effects";

Add Add searchSaga() inside all([]) -----
To: 
// Root saga
export function* rootSaga() {
  yield all([
    takeEvery(BUTTON_CLICKED, handleButtonClick),
    userSaga(),
    searchSaga(),
  ]);
}

10. Test
App loads fine ✅
No console errors ✅
Project 2 still work ✅
Search won’t do anything yet (UI not wired) — expected

