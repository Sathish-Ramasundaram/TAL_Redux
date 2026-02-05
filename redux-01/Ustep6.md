all = run multiple effects in parallel and wait for all to finish

1. Real-World Use Case (Very Common)
When Dashboard loads, apps often fetch:
profile data
notifications
stats
settings

At the same time — not one by one.

Instead of:
call api1
wait
call api2
wait
call api3

We do:
all([api1, api2, api3])

Parallel = faster.


2. Tiny Goal: 
Create 3 fake server APIs
profile, notifications, stats
Each returns data with small delay
Later Saga all will call them in parallel.

They will behave like:
GET /profile
GET /notifications
GET /stats

3. create src/api/dashboardBundleApi.ts

```
export async function fetchProfileApi() {
  console.log("profile start");
  await new Promise((r) => setTimeout(r, 1200));

  console.log("profile done");
  return {
    name: "Sathish",
    role: "Admin",
    lastLogin: "Today",
  };
}

export async function fetchNotificationsApi() {
  console.log("notifications start");
  await new Promise((r) => setTimeout(r, 800));

  console.log("notifications done");
  return [
    "New message received",
    "Report generated",
  ];
}

export async function fetchStatsApi() {
  console.log("stats start");
  await new Promise((r) => setTimeout(r, 1500));

  console.log("stats done");
  return {
    orders: 24,
    users: 310,
    tasks: 18,
  };
}

```


4. Next Tiny Goal: 
Create Redux slice to store bundle data
profile + notifications + stats
plus loading flag

5. create src/store/bundleSlice.ts

type nul > src\store\bundleSlice.ts     

```

import { createSlice } from "@reduxjs/toolkit";

type BundleState = {
  loading: boolean;
  profile: any | null;
  notifications: string[];
  stats: any | null;
};

const initialState: BundleState = {
  loading: false,
  profile: null,
  notifications: [],
  stats: null,
};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleRequest: (state) => {
      state.loading = true;
    },

    bundleSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
      state.notifications = action.payload.notifications;
      state.stats = action.payload.stats;
    },

    bundleFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  bundleRequest,
  bundleSuccess,
  bundleFailure,
} = bundleSlice.actions;

export default bundleSlice.reducer;


```
6. Wire reducer to store
index.ts

import bundleReducer from "./bundleSlice";

Add to reducer map: 
bundle: bundleReducer,

7. Next: 
One worker saga
One watcher line

8. sagas.ts:

import { all } from "redux-saga/effects";
import {
  fetchProfileApi,
  fetchNotificationsApi,
  fetchStatsApi,
} from "../api/dashboardBundleApi";

import {
  bundleRequest,
  bundleSuccess,
  bundleFailure,
} from "./bundleSlice";


Add ALL Worker Saga

function* bundleWorker(): SagaIterator {
  try {
    const [profile, notifications, stats] = yield all([
      call(fetchProfileApi),
      call(fetchNotificationsApi),
      call(fetchStatsApi),
    ]);

    yield put(
      bundleSuccess({
        profile,
        notifications,
        stats,
      })
    );
  } catch (e) {
    yield put(bundleFailure());
  }
}

------
Add watcher:

yield takeLatest(bundleRequest.type, bundleWorker);

-----

call = run an async function (usually API)
put = dispatch a Redux action
📞 call → talk to outside world (API / async work)
📨 put → send message to Redux store (dispatch action)


9. dashboard: 
import { bundleRequest } from "../store/bundleSlice";
import { useSelector } from "react-redux"; (Ignore if already there)

----------------

const bundle = useSelector((state: any) => state.bundle);
--------

Add this as a third card div next to your existing cards
(Chat + Inventory). Put inside your main flex row.

{/* Card — Bundle (ALL demo) */}
<div className="bg-white shadow-lg rounded-xl p-8 w-96 text-left">

  <h3 className="font-semibold mb-3">
    Dashboard Bundle (Saga all)
  </h3>

  <button
    onClick={() => dispatch(bundleRequest())}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
  >
    Load Bundle
  </button>

  {bundle.loading && (
    <p className="text-sm text-gray-500">
      Loading bundle...
    </p>
  )}

  {bundle.profile && (
    <div className="text-sm mb-3">
      <div><b>Name:</b> {bundle.profile.name}</div>
      <div><b>Role:</b> {bundle.profile.role}</div>
      <div><b>Last Login:</b> {bundle.profile.lastLogin}</div>
    </div>
  )}

  {bundle.notifications.length > 0 && (
    <ul className="list-disc list-inside text-sm mb-3">
      {bundle.notifications.map((n: string, i: number) => (
        <li key={i}>{n}</li>
      ))}
    </ul>
  )}

  {bundle.stats && (
    <div className="text-sm">
      <div><b>Orders:</b> {bundle.stats.orders}</div>
      <div><b>Users:</b> {bundle.stats.users}</div>
      <div><b>Tasks:</b> {bundle.stats.tasks}</div>
    </div>
  )}

</div>


10. UX update for more realistic: 


const [sidebarOpen, setSidebarOpen] = useState(false);

import { useState } from "react"; Add if missing


Add Profile Icon (Top Left)
At the very top inside your page container div, add:

<div className="absolute top-6 left-6">
  <button
    onClick={() => setSidebarOpen(true)}
    className="text-2xl"
  >
    👤
  </button>
</div>



Add Overlay (Click Outside to Close)
Add near bottom of JSX:

{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/30"
    onClick={() => setSidebarOpen(false)}
  />
)}


Add Sidebar Drawer
Add this block after overlay block:

<div
  className={`
    fixed top-0 left-0 h-full w-80 bg-white shadow-xl p-6
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>

  <h3 className="text-lg font-semibold mb-4">
    Profile Panel
  </h3>

  {bundle.profile && (
    <div className="text-sm mb-4">
      <div><b>Name:</b> {bundle.profile.name}</div>
      <div><b>Role:</b> {bundle.profile.role}</div>
      <div><b>Last Login:</b> {bundle.profile.lastLogin}</div>
    </div>
  )}

  {bundle.stats && (
    <div className="text-sm mb-4">
      <div><b>Orders:</b> {bundle.stats.orders}</div>
      <div><b>Users:</b> {bundle.stats.users}</div>
      <div><b>Tasks:</b> {bundle.stats.tasks}</div>
    </div>
  )}

  {bundle.notifications.length > 0 && (
    <ul className="text-sm list-disc list-inside">
      {bundle.notifications.map((n: string, i: number) => (
        <li key={i}>{n}</li>
      ))}
    </ul>
  )}

</div>


11. After clicking icon, it is blank. 

Fix: 
From: 
<button onClick={() => setSidebarOpen(true)}>
To: 
<button
  onClick={() => {
    setSidebarOpen(true);
    dispatch(bundleRequest());
  }}
>




Delete the previous create box for this. 

12. 
13. 
14. 
15. 
16. 
17. 
18. 
19. 
20. 
21. 
22. 
23. 
24.  
25. 
26. 
27. 
28. 
29. 
30. 
31. 
32. 
33. 
34. 
35. 
36. 
37. 
38. 
39. 
40. 
41. 
42. 
43. 
44. 
45. 
46. 
47. 
48. 
49. 
50.  
51. 
52. 
53. 
54. 
55. 
56. 
57. 
58. 
59. 
60. 


