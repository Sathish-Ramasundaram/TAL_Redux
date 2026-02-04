1. Tiny Goal: 
Protect Dashboard route — block access if not logged in


src/routes/ProtectedRoute.tsx

mkdir src\routes   

type nul > src\routes\ProtectedRoute.tsx

```

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useSelector(
    (state: any) => state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;


```

2. update App.tsx

import ProtectedRoute from "./routes/ProtectedRoute";

To: 
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

3. red line under JSX 
function ProtectedRoute({ children }: { children: JSX.Element }) {

Fix: 
To: 

import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {


For wrapper components:
children: ReactNode  ✅ preferred
children: JSX.Element ❌ too strict

Most production code uses ReactNode.

4. Test 1: 

http://localhost:3000/dashboard
Expected:
👉 Redirect to login

Test 2 — Normal Login
Login → redirect → dashboard works

5. Tiny Goal: 
real Logout flow using Redux + Saga.

6. Add logout reducer in authSlice.ts

Add these reducers inside reducers: {}

logoutRequest: (state) => {
  state.loading = true;
},

logoutSuccess: (state) => {
  state.loading = false;
  state.isLoggedIn = false;
},

7. Update export line at bottom

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
} = authSlice.actions;

8. Add Logout Saga Worker
saga.ts

import { logoutRequest, logoutSuccess } from "./authSlice";
import { delay } from "redux-saga/effects";

Add work saga below login saga: 

function* logoutWorker(): SagaIterator {
  yield delay(800); // simulate cleanup
  yield put(logoutSuccess());
}


Register Watcher
In rootSaga() add:

yield takeLatest(logoutRequest.type, logoutWorker);

9. update Dashboard.tsx

import { loginFailure, logoutRequest } from "../store/authSlice";

Change button onClick:

<button
  onClick={() => dispatch(logoutRequest())}


10. Test: 
Flow:
login → dashboard
click logout
→ short delay
→ redirected to login

Because:
logoutSuccess → isLoggedIn false
→ ProtectedRoute blocks dashboard
→ redirect

11. Tiny Goal: 
Register page with Saga
This adds an important Redux-Saga concept:

✅ takeEvery vs takeLatest difference

Difference (simple):

takeLatest → keep only newest request
takeEvery → allow all requests


12. src/api/registerApi.ts

type nul > src\api\registerApi.ts     

```
export async function registerApi(email: string) {
  console.log("Register API:", email);

  await new Promise((r) => setTimeout(r, 1200));

  if (email.includes("@")) {
    return { ok: true };
  }

  throw new Error("Invalid email");
}


```
13. update authSlice.ts: 


Add inside reducers:

registerRequest: (state, _action) => {
  state.loading = true;
  state.error = null;
},

registerSuccess: (state) => {
  state.loading = false;
},

registerFailure: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},


Add to export list
registerRequest,
registerSuccess,
registerFailure,

14. Add Register Saga Worker

import { registerApi } from "../api/registerApi";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./authSlice";

15. Add worker

function* registerWorker(
  action: ReturnType<typeof registerRequest>
): SagaIterator {
  try {
    yield call(registerApi, action.payload.email);
    yield put(registerSuccess());
  } catch (e: any) {
    yield put(registerFailure(e.message));
  }
}

add rootSaga

yield takeEvery(registerRequest.type, registerWorker);


Import at top: 
import { takeEvery } from "redux-saga/effects";

16. src/pages/Register.tsx

type nul > src\pages\Register.tsx

```
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/authSlice";
import { Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest({ email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition
            ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;


```
17. update App

import Register from "./pages/Register";

<Route path="/register" element={<Register />} />


18. update Login: 

import { Link } from "react-router-dom";

Add below Login Button, 

<div className="mt-4 text-center">
  <Link
    to="/register"
    className="text-sm text-blue-600 hover:underline"
  >
    Create account
  </Link>
</div>


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


