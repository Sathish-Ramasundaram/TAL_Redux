Delete old files from the store folder.

1. Tiny Goal:
   Create Redux store + attach Saga middleware

src/store/index.ts
type nul > src\store\index.ts

```

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {}, // empty for now — we add later
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});



```

8. update in index.tsx

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

----------------

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


    Connect your new slice reducer to the Redux store

src/store/index.ts

import appReducer from "./appSlice";

From:
reducer: {},

To:
reducer: {
app: appReducer,
},

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

Behavior:
    Click Start → Redux updates → UI changes
    Click Stop → Redux updates → UI changes


Add cypress: 

Add Cypress Test Selectors (Important)

Cypress should not rely on CSS classes.
Add data-testid attributes.
Update your App.tsx buttons + status text.

update Status Text: 

<div
  data-testid="status-text"
  className={`mt-2 text-lg font-semibold
    ${loading ? "text-green-600" : "text-red-600"}
  `}
>
  {loading ? "ACTIVE" : "INACTIVE"}
</div>

update Buttons:

<button
  data-testid="start-btn"
  onClick={() => dispatch(startLoading())}
  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Start
</button>

<button
  data-testid="stop-btn"
  onClick={() => dispatch(stopLoading())}
  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
>
  Stop
</button>


create file: 
loading.cy.ts

```

describe("Redux Loading Toggle", () => {
  it("toggles loading state", () => {
    cy.visit("http://localhost:3000");

    // initial state
    cy.get('[data-testid="status-text"]')
      .should("contain", "INACTIVE");

    // click start
    cy.get('[data-testid="start-btn"]').click();

    cy.get('[data-testid="status-text"]')
      .should("contain", "ACTIVE");

    // click stop
    cy.get('[data-testid="stop-btn"]').click();

    cy.get('[data-testid="status-text"]')
      .should("contain", "INACTIVE");
  });
});


```

Start Your React App
Very important.

npm start


Confirm browser shows app at:
http://localhost:3000

✅ Step 7 — Run Cypress Test
In Cypress window → click:

loading.cy.ts

You should see:

visit
check INACTIVE
click Start
check ACTIVE
click Stop
check INACTIVE

Green = PASS ✅

-----------------------

Best practise: 
Add baseUrl in cypress.config.ts

update to:

import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "http://localhost:3000",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

-----

Why This Helps
Now your tests can use:
cy.visit("/");
instead of:
cy.visit("http://localhost:3000");
Cleaner + safer.

Cypress Test (Updated Version):
-------------------------------

describe("Redux Loading Toggle", () => {
  it("toggles loading state", () => {
    cy.visit("/");

    cy.get('[data-testid="status-text"]')
      .should("contain", "INACTIVE");

    cy.get('[data-testid="start-btn"]').click();

    cy.get('[data-testid="status-text"]')
      .should("contain", "ACTIVE");

    cy.get('[data-testid="stop-btn"]').click();

    cy.get('[data-testid="status-text"]')
      .should("contain", "INACTIVE");
  });
});

