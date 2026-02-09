race = run multiple effects → whichever finishes first wins → others are cancelled

Like a competition between async tasks.

1. Case A: 

start API (1.2s)
start timeout (2s)

API finishes first → success
timeout cancelled

Case B:

start API (3s)
start timeout (2s)

timeout fires first → show timeout
API cancelled


2. Goal of Step 1:
Create OTP verify API (simulated)

OTP page load → race(userSubmitAction, delay)



3. src/api/otpApi.ts

type nul > src\api\otpApi.ts     

```

export async function verifyOtpApi(otp: string) {
  if (otp === "1234") {
    console.log("OTP fast path");
    await new Promise((r) => setTimeout(r, 1500));
    return { ok: true };
  }

  if (otp === "9999") {
    console.log("OTP slow path");
    await new Promise((r) => setTimeout(r, 6000));
    return { ok: true };
  }

  throw new Error("Invalid OTP");
}


```

Note: We can update with: 

export async function verifyOtpApi(otp: string) {
  if (otp === "1234") {
    console.log("OTP path");
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true };
  }


  throw new Error("Invalid OTP");
}

--- Because, 
That slow path was needed only for:
race(API vs delay)

But you are no longer racing API vs delay.
You are racing:

take(user submit) vs delay

So API speed no longer affects race outcome.

4. src/store/authSlice.ts

Find initialState and add two fields:

otpStatus: "idle" as "idle" | "waiting" | "success" | "timeout" | "error",
otpError: null as string | null,


----


Inside reducers block add:

otpStart: (state) => {
  state.otpStatus = "waiting";
  state.otpError = null;
},

otpSubmitRequest: (_state, _action) => {},

otpSuccess: (state) => {
  state.otpStatus = "success";
  state.isLoggedIn = true;
},

otpTimeout: (state) => {
  state.otpStatus = "timeout";
  state.otpError = "OTP expired";
},

otpFailure: (state, action) => {
  state.otpStatus = "error";
  state.otpError = action.payload;
},


-----

export: 

 otpStart,
  otpSubmitRequest,
  otpSuccess,
  otpTimeout,
  otpFailure,


5. Next: 
update Saga:
otpStart dispatched
→ saga starts race
→ waits for:
   - otpSubmitRequest action
   - OR 3-second timeout

import { put, call, delay, takeLatest, takeEvery, select, race, take } from "redux-saga/effects";
import { verifyOtpApi } from "../api/otpApi";
import {
  otpStart,
  otpSubmitRequest,
  otpSuccess,
  otpTimeout,
  otpFailure,
} from "./authSlice";

------

worker: 

function* otpRaceWorker(): SagaIterator {
  const result: any = yield race({
    submit: take(otpSubmitRequest.type),
    timeout: delay(3000),
  });

  if (result.timeout) {
    yield put(otpTimeout());
    return;
  }

  try {
    const otp = result.submit.payload;

    yield call(verifyOtpApi, otp);

    yield put(otpSuccess());
  } catch (e: any) {
    yield put(otpFailure(e.message));
  }
}

----

Add watcher: 
yield takeLatest(otpStart.type, otpRaceWorker);

Why takeLatest Here?
OTP page opened multiple times → keep latest race only.
Correct pattern.

6. create OTP page

src/pages/OtpPage.tsx

type nul > src\pages\OtpPage.tsx

```

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  otpStart,
  otpSubmitRequest,
} from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function OtpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otpStatus, otpError } = useSelector(
    (state: any) => state.auth
  );

  const [otp, setOtp] = useState("");

  useEffect(() => {
    dispatch(otpStart());
  }, [dispatch]);

  useEffect(() => {
    if (otpStatus === "success") {
      navigate("/dashboard");
    }

    if (otpStatus === "timeout") {
      alert("OTP expired");
      navigate("/");
    }
  }, [otpStatus, navigate]);

  const handleVerify = () => {
    dispatch(otpSubmitRequest(otp));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          OTP Verification
        </h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Enter OTP within 3 seconds
        </p>

        {otpError && (
          <p className="text-red-600 text-sm mb-3">
            {otpError}
          </p>
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}

export default OtpPage;

```
7. Next: 
Add OTP route
Change Login redirect → OTP page (not Dashboard)

8. App: 

import OtpPage from "./pages/OtpPage";

<Route path="/otp" element={<OtpPage />} />


9. Change Login Redirect Target
Login: 

Find this effect: 

useEffect(() => {
  if (isLoggedIn) {
    navigate("/dashboard");
  }
}, [isLoggedIn, navigate]);


Change to: 

useEffect(() => {
  if (isLoggedIn) {
    navigate("/otp");
  }
}, [isLoggedIn, navigate]);


10. Test: 

Login
→ OTP page
enter 1234 quickly (<5s)
→ Dashboard

Case 2:
Login
→ OTP page
wait 5 sec
→ alert
→ back to login


11. After clicking alert button ok it is not taking to login page. 
Problem: 
Problem:

alert() blocks thread
React effect cycle timing shifts
navigation sometimes not executed
Because alert is synchronous + blocking.

Fix: 
OtpPage.tsx
From: 
if (otpStatus === "timeout") {
  alert("OTP expired");
  navigate("/");
}

To: 
if (otpStatus === "timeout") {
  alert("OTP expired");
  setTimeout(() => navigate("/"), 0);
}

12. Test:

Still same issue. Chatgtp suggest to use Tailwind Model.
Goal: 
otpStatus === "timeout"
→ show modal dialog
→ user clicks OK
→ navigate to login

13. OtpPage.tsx

Add Modal State
const [showTimeoutModal, setShowTimeoutModal] = useState(false);


Replace with: 
if (otpStatus === "timeout") {
  setShowTimeoutModal(true);
}

Add this at the bottom of your return JSX
(just before the final closing </div>):

{showTimeoutModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">

      <h3 className="text-lg font-semibold mb-3">
        OTP Expired
      </h3>

      <p className="text-sm text-gray-600 mb-5">
        You did not enter OTP within 5 seconds.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Back to Login
      </button>

    </div>
  </div>
)}

14. Test: 
Still after clicking back to log in button does not work. 

Problem: 
Why “Back to Login” Is Not Navigating
When OTP timeout happens:

otpTimeout reducer runs
→ otpStatus = "timeout"


BUT your auth state still has:
isLoggedIn = true   ❗


Because user already passed login step.
So when you click:

navigate("/")

Login page loads — but your Login.tsx has:

if (isLoggedIn) {
  navigate("/otp");
}


So it immediately sends you back to OTP again.
👉 That’s why it looks like navigation failed.
It didn’t fail — it got overridden.

15. Fix: 
When OTP expires, user should be treated as:
not logged in

Update authSlice to: 

otpTimeout: (state) => {
  state.otpStatus = "timeout";
  state.otpError = "OTP expired";
  state.isLoggedIn = false;
},
