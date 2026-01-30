1. Project 4 — Error Handling in Redux-Saga

(try / catch + failure state)
This project is short but very important.

Goal: 
Handle API failure gracefully using Redux-Saga and show the error in UI.

2. 
UI Behavior: 
Loading...
❌ Error: Failed to fetch data

Flow: 
Action dispatched
  ↓
Saga runs
  ↓
API throws error
  ↓
catch block runs
  ↓
FAILURE action dispatched
  ↓
Reducer stores error
  ↓
UI shows error

3. Recommanded folder structure

src/
 ├── app/
 │    ├── store.ts
 │    └── rootSaga.ts
 │
 ├── features/
 │    ├── button/
 │    │    ├── buttonActions.ts
 │    │    └── buttonSaga.ts
 │    │
 │    ├── user/
 │    │    ├── userActions.ts
 │    │    ├── userReducer.ts
 │    │    └── userSaga.ts
 │    │
 │    ├── search/
 │    │    ├── searchActions.ts
 │    │    ├── searchReducer.ts
 │    │    └── searchSaga.ts
 │    │
 │    └── error/
 │         ├── errorActions.ts
 │         ├── errorReducer.ts
 │         └── errorSaga.ts
 │
 ├── App.tsx
 └── index.tsx

4. create seperate for previous projects first

mkdir src\app
mkdir src\features
mkdir src\features\button
mkdir src\features\user
mkdir src\features\search

5. 
Old file	  - rename and move to New location
actions.ts	to buttonActions.ts - features/button/buttonActions.ts

6. Split button saga logic:

features/button/buttonSaga.ts

type nul > src\features\button\buttonSaga.ts

Paste this: 

```

import { takeEvery, delay } from "redux-saga/effects";
import { BUTTON_CLICKED } from "./buttonActions";

function* handleButtonClick() {
  console.log("Saga received BUTTON_CLICKED action");
  yield delay(2000);
  console.log("Button clicked after 2 seconds (from saga)");
}

export function* buttonSaga() {
  yield takeEvery(BUTTON_CLICKED, handleButtonClick);
}


```
7. 
Old file	New location
userActions.ts	features/user/userActions.ts
userReducer.ts	features/user/userReducer.ts
userSaga.ts	features/user/userSaga.ts

8. 
Move files as-is:
Old file	New location
searchActions.ts	features/search/searchActions.ts
searchReducer.ts	features/search/searchReducer.ts
searchSaga.ts	features/search/searchSaga.ts

9. create rootSaga

type nul > src\app\rootSaga.ts

code: 

```

import { all } from "redux-saga/effects";
import { buttonSaga } from "../features/button/buttonSaga";
import { userSaga } from "../features/user/userSaga";
import { searchSaga } from "../features/search/searchSaga";

export function* rootSaga() {
  yield all([
    buttonSaga(),
    userSaga(),
    searchSaga(),
  ]);
}

```
10. 
Move:

src/store.ts → src/app/store.ts

Update imports inside store.ts

import { rootSaga } from "./rootSaga";
import { userReducer } from "../features/user/userReducer";
import { searchReducer } from "../features/search/searchReducer";

old one has dummyReducer.ts
And saga.ts. 
(keep dummyReducer if still present) And delete saga.

11. Fix Imports in App.tsx

*** - keep necessary things

import { buttonClicked } from "./features/button/buttonActions";
import { fetchUser } from "./features/user/userActions";
import { searchUser } from "./features/search/searchActions";
import { RootState } from "./app/store";


12. Fix Import in index.tsx

import { store } from "./app/store";


13. 
You can (and should) delete saga.ts after splitting it into rootSaga.ts and feature sagas.


14. Verify
npm run dev

✅ Button click saga works
✅ User fetch works
✅ Search with takeLatest works
❌ No console warnings
❌ No red errors

