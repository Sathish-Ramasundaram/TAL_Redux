1. Select: 
Saga uses select to read Redux store data and decide which API to call.

Saga can read Redux state using select — not everything must come from action payload.

call fetches data
select reads Redux store state

📞 call → ask outside company (API)
📂 select → check internal files (Redux store)

call → API data ✅
select → Redux state ✅

Same word — different layer
Tool	        Used Where	    Purpose
useSelector	    React component	render UI
select effect	Redux-Saga	    control logic

Components use useSelector to display data.
Sagas use select to make decisions.

2. Goal: 
Saga reads items from Redux store using select
→ checks count
→ decides which API to call



3. Create Inventory Slice (Store Items)
This slice will hold your items:
mobile, laptop, bike, headphone, camera

src/store/inventorySlice.ts

type nul > src\store\inventorySlice.ts

```

import { createSlice } from "@reduxjs/toolkit";

type InventoryState = {
  items: string[];
};

const initialState: InventoryState = {
  items: ["Mobile", "Laptop", "Bike", "Headphone", "Camera"],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { clearItems } = inventorySlice.actions;

export default inventorySlice.reducer;


```
4. update store file: 

import inventoryReducer from "./inventorySlice";

Add to reducer map: 
inventory: inventoryReducer,

------

Tiny Meaning
Redux store now also has:
store.inventory.items

Currently contains:
["Mobile","Laptop","Bike","Headphone","Camera"]


5. Next step: 
show these items in Dashboard using useSelector

import { useSelector } from "react-redux";


Read Inventory From Store

Inside component (near other selectors):

const items = useSelector(
  (state: any) => state.inventory.items
);



Add UI Block to Show Items

<div className="mt-6 text-left">
  <h3 className="font-semibold mb-2">
    Inventory Items
  </h3>

  <ul className="list-disc list-inside text-sm text-gray-700">
    {items.map((item: string, i: number) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
</div>

6. Next: 
Saga reads inventory.items using select
→ checks count
→ decides which API to call

7. many items → available API
few items → demand API
zero items → skip API

src/api/inventoryApi.ts

type nul > src\api\inventoryApi.ts   

```

export async function availableApi() {
  console.log("API: Items widely available");
  await new Promise((r) => setTimeout(r, 700));
  return "Available";
}

export async function demandApi() {
  console.log("API: Few items — high demand");
  await new Promise((r) => setTimeout(r, 700));
  return "Few items — High demand";
}

```
8. Saga reads inventory items from Redux store using select
→ checks count
→ decides which API to call

9. update Saga: 

import { select } from "redux-saga/effects";
import { availableApi, demandApi } from "../api/inventoryApi";


Add Worker Saga (Select Demo)
function* inventoryCheckWorker(): SagaIterator {
  const items: string[] = yield select(
    (state: any) => state.inventory.items
  );

  const count = items.length;

  console.log("Saga select count:", count);

  if (count >= 4) {
    yield call(availableApi);
  } else if (count >= 1) {
    yield call(demandApi);
  } else {
    console.log("No items — skip API");
  }
}

This line: 
yield select(state => state.inventory.items)
Saga reads Redux store directly

10. src/store/inventorySlice.ts

Add this inside reducers:

checkInventoryRequest: () => {},

it becomes, 
reducers: {
  clearItems: (state) => {
    state.items = [];
  },

  checkInventoryRequest: () => {},
}

-----

We do NOT need state change here.

So empty reducer is correct.

Export, 

it becomes, 

export const {
  clearItems,
  checkInventoryRequest,
} = inventorySlice.actions;


Back to saga: 
import { checkInventoryRequest } from "./inventorySlice";


yield takeLatest(
  checkInventoryRequest.type,
  inventoryCheckWorker
);



11. update dashboard: 
import { checkInventoryRequest } from "../store/inventorySlice";


Add this button: 

<button
  onClick={() => dispatch(checkInventoryRequest())}
  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
>
  Check Availability (Saga select)
</button>


12. Add “Dev Login” Button (Best for Demo Projects)

update Login page: 
import { loginSuccess } from "../store/authSlice";



---

<button
  type="button"
  onClick={() => dispatch(loginSuccess())}
  className="w-full mt-3 py-2 rounded border border-gray-400 text-sm hover:bg-gray-100"
>
  Dev Login
</button>

13. update Dashboard UI for better layout: 

<div className="min-h-screen bg-gray-100 p-8">

  {/* Top bar */}
  <div className="flex justify-end mb-6">
    <button
      onClick={() => dispatch(logoutRequest())}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  </div>

  {/* Main content */}
  <div className="flex gap-8 justify-center">

    {/* Card 1 — Chat */}
    <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="mb-6 text-gray-600">
        Login successful ✅
      </p>

      <Link
        to="/chat"
        className="text-blue-600 underline text-sm"
      >
        Open Chat Demo
      </Link>
    </div>

    {/* Card 2 — Inventory */}
    <div className="bg-white shadow-lg rounded-xl p-8 w-96">
      <h3 className="font-semibold mb-3">
        Inventory Items
      </h3>

      <ul className="list-disc list-inside text-sm text-gray-700">
        {items.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <button
        onClick={() => dispatch(checkInventoryRequest())}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Check Availability (Saga select)
      </button>
    </div>

  </div>
</div>
