1. In Project 2:

Saga will fetch data
Reducer will store data
UI will read data using useSelector
This is the full Redux loop.

2. Goal: Fetch user data when the app loads and display it on the screen.

UI: 
Loading...
↓
User Name: John Doe

Flow: 

App mounts
  ↓
FETCH_USER action
  ↓
Saga runs (fake API call)
  ↓
USER_SUCCESS action
  ↓
Reducer updates state
  ↓
UI re-renders with data

3. 

src/
 ├── userActions.ts     🆕
 ├── userReducer.ts    🆕
 ├── userSaga.ts       🆕
 ├── saga.ts           🔁 (rootSaga updated)
 ├── store.ts          🔁 (add reducer)
 └── App.tsx           🔁 (useSelector)

4. create 
type nul > src/userActions.ts

Add this code: 
```

// Action type constants
export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// Action creators
export const fetchUser = () => ({
  type: FETCH_USER,
});

export const fetchUserSuccess = (user: { name: string }) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

```

5. Create 
type nul > src/userReducer.ts

Add this code: 
```

import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userActions";

// Shape of user state
interface UserState {
  loading: boolean;
  user: {
    name: string;
  } | null;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

// Reducer
export function userReducer(
  state = initialState,
  action: any
): UserState {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case FETCH_USER_FAILURE:
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

6. create
type nul > src/userSaga.ts

```

import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_USER,
  fetchUserSuccess,
  fetchUserFailure,
} from "./userActions";

// Fake API function
function fetchUserApi() {
  return new Promise<{ name: string }>((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe" });
    }, 2000);
  });
}

// Worker saga
function* handleFetchUser() {
  try {
    // call the fake API
    const user: { name: string } = yield call(fetchUserApi);

    // dispatch success action
    yield put(fetchUserSuccess(user));
  } catch (error) {
    // dispatch failure action
    yield put(fetchUserFailure("Failed to fetch user"));
  }
}

// Watcher saga
export function* userSaga() {
  yield takeEvery(FETCH_USER, handleFetchUser);
}

```

7. update rootsaga
update saga.ts

import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga";

And update: 
From: 
// Watcher saga
export function* rootSaga() {
  yield takeEvery(BUTTON_CLICKED, handleButtonClick);
}

To: 
// Root saga
export function* rootSaga() {
  yield all([
    takeEvery(BUTTON_CLICKED, handleButtonClick),
    userSaga(),
  ]);
}

8. Test 
npm run dev
Clicking button → Project 1 logs still appear
No errors → good sign