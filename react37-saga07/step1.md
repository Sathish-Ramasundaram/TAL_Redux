1. 
So far you learned:
takeEvery → handle all actions
takeLatest → cancel previous automatically
throttle → limit frequency
select → read Redux state

But sometimes you need manual control:
Real-world problems:
Cancel an API call when user clicks Cancel
Timeout an API request
Stop a long-running task when user navigates away
👉 This is where race and cancel come in.

2. Goal of Project 7
We’ll build a long-running task that:
Starts on button click
Can be cancelled manually
Can be timed out automatically

3. 
Behavior:
Click Start → long task begins (5 sec)
Click Cancel → task stops immediately
If not cancelled → task completes
Console logs show exactly what happened

4. 
src/
 ├── features/
 │    └── task/
 │         ├── taskActions.ts
 │         ├── taskSaga.ts
 │
 ├── app/
 │    ├── store.ts
 │    └── rootSaga.ts
 │
 ├── App.tsx
 └── index.tsx

5. 
create 
mkdir src\features\task

type nul > src\features\task\taskActions.ts

```

// Action type constants
export const START_TASK = "START_TASK";
export const CANCEL_TASK = "CANCEL_TASK";

// Action creators
export const startTask = () => ({
  type: START_TASK,
});

export const cancelTask = () => ({
  type: CANCEL_TASK,
});


```

6. 

Create taskSaga.ts
(race + cancel)

This saga will:
start a long-running task
race it against a cancel action
log what actually happened

type nul > src\features\task\taskSaga.ts

```
import { take, race, delay, fork, cancel } from "redux-saga/effects";
import { START_TASK, CANCEL_TASK } from "./taskActions";

// Long-running task
function* longRunningTask() {
  try {
    console.log("Task started...");
    yield delay(5000); // simulate 5-second task
    console.log("Task completed successfully");
  } finally {
    console.log("Task ended (completed or cancelled)");
  }
}

// Watcher saga
export function* taskSaga() {
  while (true) {
    // Wait for START_TASK
    yield take(START_TASK);

    console.log("START_TASK received");

    // Start the task in background
    const task = yield fork(longRunningTask);

    // Race between completion and cancel
    const { cancelTask } = yield race({
      completed: delay(5000),
      cancelTask: take(CANCEL_TASK),
    });

    // If cancel wins, stop the task
    if (cancelTask) {
      console.log("CANCEL_TASK received");
      yield cancel(task);
    }
  }
}

```

7. 
Add taskSaga to rootSaga

import { taskSaga } from "../features/task/taskSaga";

And, 
Add taskSaga() to all([])

8. Sanity test
Expected Output: 
App loads fine ✅
No console errors ✅
No visible change yet (UI not wired)

9. Update App.tsx for task start/cancel.

Replace the code with this, or update if you require other projects here to demonstrate. 

```

import { useDispatch } from "react-redux";
import { startTask, cancelTask } from "./features/task/taskActions";

function App() {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 40 }}>
      <h2>Project 7 – race & cancel (Task Control)</h2>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button
          onClick={() => dispatch(startTask())}
          className="px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700"
        >
          Start Task
        </button>

        <button
          onClick={() => dispatch(cancelTask())}
          className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700"
        >
          Cancel Task
        </button>
      </div>

      <p style={{ marginTop: 20, color: "#555" }}>
        Open the browser console to see saga logs.
      </p>
    </div>
  );
}

export default App;

```

10. 

Saga flow: 
START_TASK
  ↓
fork(longRunningTask)
  ↓
race(
  delay(5s),
  take(CANCEL_TASK)
)

11. Test

Expected OutCome: 
✅ Scenario 1 — Let task complete

Click Start Task

Do nothing

Console output:

START_TASK received
Task started...
Task completed successfully
Task ended (completed or cancelled)

❌ Scenario 2 — Cancel early

Click Start Task

Click Cancel Task within 5 seconds

Console output:

START_TASK received
Task started...
CANCEL_TASK received
Task ended (completed or cancelled)


Notice:

No “completed successfully”

Clean cancellation

12. Why yield is red-underlined
TypeScript is complaining because it doesn’t know what type your generator yields.

Fix:
At taskSaga.ts

import
import { SagaIterator } from "redux-saga";

And:
before: 
export function* taskSaga() {

Now: 
export function* taskSaga(): SagaIterator {

Do same for workerSaga

function* longRunningTask(): SagaIterator {
