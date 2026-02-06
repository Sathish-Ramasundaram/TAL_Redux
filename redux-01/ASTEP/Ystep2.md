Redux-Saga is used for handling asynchronous operations in Redux.

1. Click button → action → Saga runs → delay → reducer updates → UI changes

create src/store/sagas.ts

type nul > src\store\sagas.ts

```

import { put, delay, takeLatest } from "redux-saga/effects";
import { startLoading, stopLoading } from "./appSlice";

// worker saga
function* startLoadingWorker() {
  yield delay(1500); // wait 1.5 sec
  yield put(stopLoading());
}

// watcher saga
export function* rootSaga() {
  yield takeLatest(startLoading.type, startLoadingWorker);
}


```

put → reducer runs
delay → wait
put → reducer runs again

The * means this is a generator function.
yield means:
⏸️ “Pause here and let Redux-Saga handle this step.
A generator function can:
run → pause → run → pause → continue
instead of running fully in one go.
yield is the pause point.

Important rule
yield only works inside:
function* sagaName() {}
Generator function only.

2. Run Saga in Store

import { rootSaga } from "./sagas";

put this at the bottom: 
sagaMiddleware.run(rootSaga);


3. Test: 
Before saga:
Start → immediately TRUE


Now with saga:
Start → becomes TRUE
→ after 1.5 sec → automatically FALSE

You did not click Stop — Saga did it.

4. Tiny Goal: 
Click Start → Saga calls API → API waits → Saga updates Redux → UI changes

5. 
1️⃣ Create fake API file
2️⃣ Update saga to call API
3️⃣ Add success/fail reducers

6. 
src/api/demoApi.ts

mkdir src\api

type nul > src\api\demoApi.ts     

```

export async function fetchDemoStatus() {
  console.log("API called...");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { ok: true };
}

```

7. This simulates:

network request
→ waits 1.5 sec
→ returns data

No server needed — perfect for demo.

8. update Saga to call API: 

```

import { put, call, takeLatest } from "redux-saga/effects";
import { startLoading, stopLoading } from "./appSlice";
import { fetchDemoStatus } from "../api/demoApi";

// worker saga
function* startLoadingWorker() {
  try {
    const result: any = yield call(fetchDemoStatus);
    console.log("Saga got:", result);

    yield put(stopLoading());
  } catch (e) {
    console.log("Saga error", e);
    yield put(stopLoading());
  }
}

// watcher saga
export function* rootSaga() {
  yield takeLatest(startLoading.type, startLoadingWorker);
}

```

9. Getting error red line under yield. Typescript error. 
import SagaIterator

import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

10. Update Worker Signature
Change this:
function* startLoadingWorker() {

to this:
function* startLoadingWorker(): SagaIterator {

Note: 
This generator follows Redux-Saga yield rules — don’t complain.

yield pauses a saga until the effect is completed.
It lets async steps run in order.

11. Test: 

Console:
API called...
Saga got: { ok: true }

UI:
ACTIVE → after delay → INACTIVE
But now delay is coming from API — not saga delay.

12. Tiny Goal: 
Create auth slice file.

13. create src/store/authSlice.ts

type nul > src\store\authSlice.ts

```

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    error: null as string | null,
    isLoggedIn: false,
  },

  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
} = authSlice.actions;

export default authSlice.reducer;

```
14. 
loginRequest → turn loading ON
loginSuccess → mark logged in
loginFailure → store error


15. Next: Connect auth slice to Redux store
src/store/index.ts

import authReducer from "./authSlice";

change to: 
reducer: {
  app: appReducer,
  auth: authReducer,
},


16. Before:
store → app only

Now:
store
 ├── app
 └── auth   ✅

17. Create a fake Login API function
This is needed so Saga can “call an API”.

18. 

src/api/authApi.ts

type nul > src\api\authApi.ts    

```

export async function loginApi(email: string, password: string) {
  console.log("Login API called with:", email);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "demo@demo.com" && password === "1234") {
    return { success: true };
  }

  throw new Error("Invalid credentials");
}


```
Meaning:
wait 1.5 seconds
if demo credentials → success
else → error

19. Next: 
When loginRequest action happens → Saga calls loginApi → dispatch success/failure

src/store/sagas.ts

import { loginApi } from "../api/authApi";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";


Paste this below other worker Saga: 

function* loginWorker(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const { email, password } = action.payload;

    yield call(loginApi, email, password);

    yield put(loginSuccess());
  } catch (e: any) {
    yield put(loginFailure(e.message));
  }
}


Connect Worker to Watcher
Find your rootSaga watcher section. It looks like:

Add one more line inside: 

yield takeLatest(loginRequest.type, loginWorker);

Final Watcher: 

export function* rootSaga() {
  yield takeLatest(startLoading.type, startLoadingWorker);
  yield takeLatest(loginRequest.type, loginWorker);
}



Getting Red underline under email, and password. 

Fix: 
src/store/authSlice.ts

update loginRequest: 
From: 
loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

To:
loginRequest: (
  state,
  action: { payload: { email: string; password: string } }
) => {
  state.loading = true;
  state.error = null;
},


20. Next: 
Build a styled Login page that dispatches loginRequest
Saga will run behind the scenes.


mkdir src\pages

type nul > src\pages\Login.tsx

```

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

```


This line: 
dispatch(loginRequest({ email, password }))

starts the full saga flow:

Login click
→ loginRequest action
→ Saga takeLatest catches
→ loginWorker runs
→ call(loginApi)
→ put(loginSuccess / loginFailure)
→ reducer updates state
→ UI updates

Button: 
disabled={loading}
This is very important UX behavior.
If
loading = true → button disabled
loading = false → button enabled


{loading ? "Logging in..." : "Login"}
This is conditional rendering.
When loading = true
"Logging in..."
When loading = false
"Login"


21. Show Login Page in App

App.tsx

```

import Login from "./pages/Login";

function App() {
  return <Login />;
}

export default App;


```

22. Tiny Goal: After successful login → automatically go to Dashboard page

We already have redux state: 
auth.isLoggedIn


type nul > src\pages\Dashboard.tsx

```

import { useDispatch } from "react-redux";
import { loginFailure } from "../store/authSlice";

function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="mb-6 text-gray-600">
          Login successful ✅
        </p>

        <button
          onClick={() => dispatch(loginFailure("Logged out"))}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout (demo)
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

```
23. update App: 

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

24.  update Login.tsx

import { useNavigate } from "react-router-dom";

Add this effect: 
import { useEffect } from "react";


inside the component add: 
const navigate = useNavigate();

change selector line to: 
const { loading, error, isLoggedIn } = useSelector(
  (state: any) => state.auth
);



Then inside component,

useEffect(() => {
  if (isLoggedIn) {
    navigate("/dashboard");
  }
}, [isLoggedIn, navigate]);

Tiny Rule: 
Define first — use later

25. Test: 

Run app.
Login with:
demo@demo.com
1234

👀 Expected
Login click
→ loading
→ saga API
→ loginSuccess
→ isLoggedIn = true
→ redirect to /dashboard

