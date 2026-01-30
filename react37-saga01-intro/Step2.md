Project 1 — Button Click Logger (Saga Intro)

This project proves:
Redux receives an action
Saga reacts to it
Component stays dumb

What We’ll Build (Again)
Button click
Action dispatched
Saga listens
Waits 2 seconds
Logs message

2. create actions.ts in src folder

type nul > src/actions.ts

Add this code.
```

// Action type constant
export const BUTTON_CLICKED = "BUTTON_CLICKED";

// Action creator (optional but good practice)
export const buttonClicked = () => ({
  type: BUTTON_CLICKED,
});

```

Actions do NOT contain logic.
They only describe events.

3. create saga.ts inside src
type nul > src/saga.ts

Add this code: 
```

import { takeEvery, delay } from "redux-saga/effects";
import { BUTTON_CLICKED } from "./actions";

// Worker saga
function* handleButtonClick() {
  console.log("Saga received BUTTON_CLICKED action");
  yield delay(2000);
  console.log("Button clicked after 2 seconds (from saga)");
}

// Watcher saga
export function* rootSaga() {
  yield takeEvery(BUTTON_CLICKED, handleButtonClick);
}

```

4. run saga in store
Update store.ts

import { rootSaga } from "./saga";

Add this after store is created ---

sagaMiddleware.run(rootSaga);

To:

export const store = configureStore({
  reducer: {}, // empty reducer for now
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // we are using saga, not thunk
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// 3. Export types (for future use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

5. Dispatch Action from App.tsx
```

Update App.tsx

import { useDispatch } from "react-redux";
import { buttonClicked } from "./actions";

function App() {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={() => dispatch(buttonClicked())}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer font-medium border-none"
      >
        Click Me
      </button>
    </div>
  );
}

export default App;

```
6. Test
After clicking, and console

