throttle
throttle = allow an action only once per time window

Prevents spam clicks.

Example:
user clicks button 10 times in 1 sec
throttle → only first click allowed

Eg: resend email


1. My suggestion: 
Mailbox page
Send button
→ shows “Mail sent”
→ button changes to Undo
→ undo allowed within 10 seconds
→ multiple undo clicks → only first accepted


Problem:
User clicks Undo repeatedly

Rule:
Only first Undo action should execute
Others ignored for 10 seconds

Where Throttle Fits Exactly

Problem:

User clicks Undo repeatedly


Rule:

Only first Undo action should execute
Others ignored for 10 seconds

That is literally
throttle(undoAction, 10000)
Perfect match.

2. Tiny Goal: 
Create mail slice to track:
src/store/mailSlice.ts

type nul > src\store\mailSlice.ts

```

import { createSlice } from "@reduxjs/toolkit";

type MailState = {
  sent: boolean;
  undoAvailable: boolean;
  statusText: string;
};

const initialState: MailState = {
  sent: false,
  undoAvailable: false,
  statusText: "No mail sent",
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    sendMailRequest: () => {},          // saga trigger
    undoMailRequest: () => {},          // saga trigger

    mailSent: (state) => {
      state.sent = true;
      state.undoAvailable = true;
      state.statusText = "Mail sent ✅";
    },

    mailUndone: (state) => {
      state.sent = false;
      state.undoAvailable = false;
      state.statusText = "Mail undone ↩️";
    },

    undoExpired: (state) => {
      state.undoAvailable = false;
      state.statusText = "Undo window expired";
    },
  },
});

export const {
  sendMailRequest,
  undoMailRequest,
  mailSent,
  mailUndone,
  undoExpired,
} = mailSlice.actions;

export default mailSlice.reducer;

```

3. Wire reducer into Store. Wire mail slice into Redux store
index.ts

import mailReducer from "./mailSlice";


Add to reducer map
mail: mailReducer,

--------------------------

Redux store now has:
state.mail.sent
state.mail.undoAvailable
state.mail.statusText

Nothing uses it yet — saga will soon control it.

4. Goal: 
Build saga workers for:
send mail
undo mail
undo expiry timer
Add throttle watcher so only first undo click in 10s works


Add the missings:

import { throttle, delay, put, takeLatest } from "redux-saga/effects";
import {
  sendMailRequest,
  undoMailRequest,
  mailSent,
  mailUndone,
  undoExpired,
} from "./mailSlice";



Send Mail Worker
Add:

function* sendMailWorker(): SagaIterator {
  console.log("MAIL: sending");

  yield delay(500);

  yield put(mailSent());

  console.log("MAIL: sent — undo window open");

  yield delay(10000);

  yield put(undoExpired());

  console.log("MAIL: undo window expired");
}


Undo Worker (Throttle Target)
Add:

function* undoMailWorker(): SagaIterator {
  console.log("UNDO: accepted");

  yield put(mailUndone());
}


Add watcher: 
yield takeLatest(sendMailRequest.type, sendMailWorker);
yield throttle(
  10000,
  undoMailRequest.type,
  undoMailWorker
);


5. create src/pages/MailPage.tsx

type nul > src\pages\MailPage.tsx

```

import { useDispatch, useSelector } from "react-redux";
import {
  sendMailRequest,
  undoMailRequest,
} from "../store/mailSlice";

function MailPage() {
  const dispatch = useDispatch();

  const mail = useSelector((state: any) => state.mail);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

        <h2 className="text-xl font-bold mb-4">
          Mailbox (Throttle Demo)
        </h2>

        <p className="mb-6 text-gray-600">
          {mail.statusText}
        </p>

        {!mail.sent && (
          <button
            onClick={() => dispatch(sendMailRequest())}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Mail
          </button>
        )}

        {mail.sent && mail.undoAvailable && (
          <button
            onClick={() => dispatch(undoMailRequest())}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Undo
          </button>
        )}

        {mail.sent && !mail.undoAvailable && (
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            Undo Expired
          </button>
        )}

      </div>
    </div>
  );
}

export default MailPage;

```

Before send
mail.sent = false
→ show Send button

After send
Saga → mailSent

sent = true
undoAvailable = true
→ show Undo button

After undo or timeout
undoAvailable = false
→ show disabled button


6. Add Route: 
App.tsx

import MailPage from "./pages/MailPage";

<Route path="/mail" element={<MailPage />} />


7. Dashboard.tsx

Add a small card (like your others):

{/* Card — Mail Throttle Demo */}
<div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

  <h3 className="font-semibold mb-3">
    Mail Undo (Throttle)
  </h3>

  <Link
  to="/mail"
  className="text-blue-600 underline text-sm"
>
  Open Mailbox Demo
</Link>

</div>


8. Test: 

Undo click → mailUndone reducer sets sent=false
→ UI shows Send button again ❌

9. Fix:
slice: 

From: 
mailUndone: (state) => {
      state.sent = false;
      state.undoAvailable = false;
      state.statusText = "Mail undone ↩️";
    },

To: 
    mailUndone: (state) => {
      state.statusText = "Mail reverted ↩️";
    },


From: 


To: 
undoExpired: (state) => {
  state.undoAvailable = false;
  state.sent = false;
  state.statusText = "Undo window expired";
},


saga.ts

undo - Worker
To: 

function* undoMailWorker(): SagaIterator {
  const undoAvailable = yield select(
    (state: any) => state.mail.undoAvailable
  );

  if (!undoAvailable) {
    return;
  }

  console.log("UNDO accepted");

  yield put(mailUndone());
}


------

Note: 
I see some problems in my project. If I refresh the page from dashboard, it is come back to log in page. And first login, it is take me through OTP page. FOr second log in after log out, it is skip otp page.

Fix: 1
Reset OTP on New Login

authSlice: 
From: 
loginRequest: (
  state,
  action: { payload: { email: string; password: string } }
) => {
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

  // ✅ reset OTP for fresh login
  state.otpStatus = "idle";
  state.otpError = null;
},


FIX 2 — Reset OTP on Logout
From: 
logoutSuccess: (state) => {
  state.loading = false;
  state.isLoggedIn = false;
},

To: 
logoutSuccess: (state) => {
  state.loading = false;
  state.isLoggedIn = false;

  // ✅ reset OTP
  state.otpStatus = "idle";
  state.otpError = null;
},

Fix 3: Persist Login Across Refresh
We store login flag in browser storage.
Saga.ts
From: 
yield put(loginSuccess());

To: 
yield put(loginSuccess());
localStorage.setItem("isLoggedIn", "true");

-----------------------
From: 
yield put(logoutSuccess());

To: 
yield put(logoutSuccess());
localStorage.removeItem("isLoggedIn");


FIX 4 — Hydrate Initial Login State
📂 File: authSlice.ts

Find: 
isLoggedIn: false,

Replace with: 
isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

