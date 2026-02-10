Note: 
Jest = microscope 🔬
Cypress = real user 👤
Saga = business logic ⚙️

1. 
npm install @reduxjs/toolkit react-redux redux-saga
For modern Redux apps, Redux Toolkit (RTK) is the recommended way — even by the Redux team itself.

2. 
npm install --save-dev cypress

3. src/store/dataReducer.ts

mkdir src\store

type nul > src\store\dataReducer.ts

```

export interface DataState {
  text: string;
  loading: boolean;
}

const initialState: DataState = {
  text: "",
  loading: false,
};

export default function dataReducer(
  state = initialState,
  action: any
): DataState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { text: action.payload, loading: false };

    default:
      return state;
  }
}

```

4. 

type nul > src\store\saga.ts

```

import { put, takeEvery, delay } from "redux-saga/effects";

function* fetchWorker() {
  yield delay(500); // pretend API delay
  yield put({ type: "FETCH_SUCCESS", payload: "Hello from Saga" });
}

export function* rootSaga() {
  yield takeEvery("FETCH_REQUEST", fetchWorker);
}


```

5. 
type nul > src\store\store.ts

```

import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import dataReducer from "./dataReducer";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  data: dataReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

```
6. 

update index.tsx:

```

import { Provider } from "react-redux";
import { store } from "./store/store";

----------------------------------------------------------

<Provider store={store}>
  <App />
</Provider>

```

7. 
update App.tsx

```

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const { text, loading } = useSelector(
    (state: RootState) => state.data
  );

  return (
    <div style={{ padding: 40 }}>
      <button
        data-testid="fetch-btn"
        onClick={() => dispatch({ type: "FETCH_REQUEST" })}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Data
      </button>

      {loading && <p data-testid="loading">Loading...</p>}
      {text && <p data-testid="result">{text}</p>}
    </div>
  );
}

export default App;

```

Run react app


8. Setup Cypress
Run:
npx cypress open

Cypress will open a setup wizard.
You will see options like:

Choose Testing Type
→ E2E Testing
→ Component Testing

👉 Click E2E Testing


9. 
Cypress Creates Files

Click Continue
Cypress will create:

cypress/
cypress.config.ts

Just accept defaults → click Continue → Continue.

10. 
Choose Browser

Cypress asks:
Select a browser

Choose:
Chrome

Click:
Start E2E Testing

Cypress Test Runner window opens.

Good 👍 — setup done.

11. 
Create Your First Test File if not existed.
Now go back to your code editor.

Open this folder:
cypress/e2e/

You may see a sample test file. You can delete it.

12. Create new file:
saga.cy.ts

type nul > cypress\e2e\saga.cy.ts

```

describe("Redux Saga Demo", () => {
  it("fetches data when button clicked", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="fetch-btn"]').click();

    cy.contains("Loading...").should("exist");

    cy.contains("Hello from Saga").should("exist");
  });
});


```

13. 

Sometimes need to do this.

In your Cypress window (Chrome or Edge), click:
Create new spec

Type saga.cy.ts

click Create spec


14. 

Cypress will create the file automatically.

update 
From: 
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})


To: 
describe("Redux Saga Demo", () => {
  it("fetches data when button clicked", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="fetch-btn"]').click();

    cy.contains("Loading...").should("exist");

    cy.contains("Hello from Saga").should("exist");
  });
});


Save

15. make sure React App is running
Cypress tests a running app — not stopped app.

Back in Cypress window:

You will now see:
saga.cy.ts
Click it.

16. What You Should See
A new browser window opens and runs steps:
visit localhost
click button
show Loading
show Hello from Saga

Left panel shows each command running one by one.
Green = PASS ✅

17. 
If You Don’t See saga.cy.ts After Create
Sometimes file is created but not shown.

Click left sidebar:
Specs → Refresh icon

or restart Cypress:
close → npx cypress open

18. Quick Check — Important
Make sure your React button has:

<button data-testid="fetch-btn">

If not — Cypress cannot find it.

19. 
Test Working. But, this is showing red underline error cy.visit('http://localhost:3000'); cy.get('[data-testid="fetch-btn"]').click(); cy.contains('Loading...').should('exist'); cy.contains('Hello from Saga').should('exist'); Under cy - red underline

update tsconfig.json: Or best option create new tsconfig.json inside cypress as below

Add this: 
{
  "compilerOptions": {
    "types": ["cypress"]
  }
}

Restart VS Code TS Server
Very important.
Press:

Ctrl + Shift + P

Type:
TypeScript: Restart TS Server


Click it.


20. If not working, Alternative (Better for React Projects)

Sometimes CRA projects prefer separate Cypress tsconfig.

Create file:
cypress/tsconfig.json

type nul > cypress\tsconfig.json

```

{
  "compilerOptions": {
    "types": ["cypress", "node"]
  }
}

```