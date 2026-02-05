fork + cancel

fork = start a background task
cancel = stop it manually

✅ fork and cancel are two separate effects
🤝 But they are usually used together


1. call vs fork:

✅ call
yield call(api)
Means:
start API
WAIT until it finishes
then continue

Saga is blocked.

✅ fork
yield fork(task)
Means:
start task
DO NOT wait
continue immediately

Saga is NOT blocked.


call = cook yourself
cook rice
wait till done
then do next work
You are blocked.

👨‍🍳 fork = tell assistant to cook
tell assistant cook rice
you continue doing other work
Rice cooks in background.
That assistant = forked task.

Timeline differences: 
call (blocking)
start → task running → wait → finish → next line runs

fork (non-blocking)
start → task running in background
next line runs immediately

call → saga waits
fork → saga does NOT wait

all vs fork
all → parallel AND wait
fork → background AND don’t wait

2. create src/store/syncSlice.ts

type nul > src\store\syncSlice.ts  

```
import { createSlice } from "@reduxjs/toolkit";

type SyncState = {
  running: boolean;
};

const initialState: SyncState = {
  running: false,
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    syncStartRequest: () => {},   // saga trigger
    syncStopRequest: () => {},    // saga trigger

    syncStarted: (state) => {
      state.running = true;
    },

    syncStopped: (state) => {
      state.running = false;
    },
  },
});

export const {
  syncStartRequest,
  syncStopRequest,
  syncStarted,
  syncStopped,
} = syncSlice.actions;

export default syncSlice.reducer;


```
syncStarted → running = true
syncStopped → running = false

UI will read this flag later.


3. tiny step: Wire sync slice into Redux store

import syncReducer from "./syncSlice";

Add to reducer map:
sync: syncReducer,

4. open saga.ts

import { delay, put } from "redux-saga/effects"; -----------This is already exist.
import { syncStarted, syncStopped } from "./syncSlice";

Add sync worker: 
function* syncWorker(): SagaIterator {
  yield put(syncStarted());

  let i = 1;

  while (true) {
    console.log("sync tick", i++);
    yield delay(1000);
  }

  // never reached normally — only if cancelled
  // (we’ll handle that next step)
}


5. saga.ts

import { fork, cancel, takeLatest } from "redux-saga/effects";
import {
  syncStartRequest,
  syncStopRequest,
  syncStopped,
} from "./syncSlice";

Check for which are already existed. 


Above worker (Top level) - Add this:
let syncTask: any = null;





Your Code Should Look Like This (Top of File)

Example:

import { fork, cancel } from "redux-saga/effects";

let syncTask: any = null;

function* syncWorker() { ... }
function* startSyncFlow() { ... }
function* stopSyncFlow() { ... }




fork returns a task → must store it → to cancel later

Why It Must Be Outside Functions
Because two different sagas must access it:

startSyncFlow → creates task → stores it
stopSyncFlow → reads task → cancels it

If variable was inside startSyncFlow:
stopSyncFlow cannot see it ❌

So we store it at file level.
Shared memory.

------------------------------



Add this worker: start flow

function* startSyncFlow(): SagaIterator {
  if (!syncTask) {
    syncTask = yield fork(syncWorker);
  }
}



Add Stop Flow (Cancel Happens Here)

function* stopSyncFlow(): SagaIterator {
  if (syncTask) {
    yield cancel(syncTask);
    syncTask = null;
    yield put(syncStopped());
  }
}


Add watcher: 

yield takeLatest(syncStartRequest.type, startSyncFlow);
yield takeLatest(syncStopRequest.type, stopSyncFlow);

6. Next tiny Goal: 
Click Start Sync → background ticks start
Click Stop Sync → ticks stop
UI shows running flag

7. Dashboard: 

import {
  syncStartRequest,
  syncStopRequest,
} from "../store/syncSlice";


--------------------------

Read Sync State

Add selector inside component:

const syncRunning = useSelector(
  (state: any) => state.sync.running
);

--------------------------------------------
Add New Card (Fork Demo)
Add this as another dashboard card div:

{/* Card — Fork/Cancel Demo */}
<div className="bg-white shadow-lg rounded-xl p-8 w-96 text-left">

  <h3 className="font-semibold mb-3">
    Background Sync (fork/cancel)
  </h3>

  <div className="flex gap-3 mb-3">
    <button
      onClick={() => dispatch(syncStartRequest())}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Start Sync
    </button>

    <button
      onClick={() => dispatch(syncStopRequest())}
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Stop Sync
    </button>
  </div>

  <p className="text-sm text-gray-600">
    Status: {syncRunning ? "Running…" : "Stopped"}
  </p>

</div>


8. After clicking dev log in it is going to otp, i want to go it to dashboard page. 
Reason: 
This effect runs whenever isLoggedIn becomes true:

useEffect(() => {
  if (isLoggedIn) {
    navigate("/otp");
  }
}, [isLoggedIn, navigate]);

---------------------
Fix: 

Add this: 
const [devBypass, setDevBypass] = useState(false);


Update useEffect
Change this:

if (isLoggedIn) {
  navigate("/otp");
}

To: 
if (isLoggedIn && !devBypass) {
  navigate("/otp");
}


Replace Dev Button: 
<button
  type="button"
  onClick={() => {
    setDevBypass(true);
    dispatch(loginSuccess());
    navigate("/dashboard");
  }}
  className="w-full mt-3 py-2 rounded border border-gray-400 text-sm hover:bg-gray-100"
>
  Dev Login
</button>


9. 
10. 
11. 
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


