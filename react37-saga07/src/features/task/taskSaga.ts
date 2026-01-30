import { take, race, delay, fork, cancel } from "redux-saga/effects";
import { START_TASK, CANCEL_TASK } from "./taskActions";
import { SagaIterator } from "redux-saga";


// Long-running task
function* longRunningTask(): SagaIterator {

  try {
    console.log("Task started...");
    yield delay(5000); // simulate 5-second task
    console.log("Task completed successfully");
  } finally {
    console.log("Task ended (completed or cancelled)");
  }
}

// Watcher saga
export function* taskSaga(): SagaIterator {
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
