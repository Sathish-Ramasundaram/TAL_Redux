
```md
# Project 7 – Using `race` & `cancel` in Redux-Saga

This project demonstrates **manual control of long-running tasks** in Redux-Saga using the `race` and `cancel` effects.

The goal is to show how to:
- start a background task
- cancel it manually
- handle timeouts and competing outcomes cleanly

This pattern is essential for **real-world applications** such as file uploads, background jobs, or cancellable API requests.

---

## 🧠 What This Project Teaches

- How to start long-running sagas using `fork`
- How to cancel a running saga using `cancel`
- How to compete between multiple effects using `race`
- Difference between automatic cancellation (`takeLatest`) and manual cancellation
- Handling cleanup logic using `finally`

---

## 🛠 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React-Redux
- Redux-Saga
- Tailwind CSS
- Rspack

---

## 📁 Project Structure (Feature-Based)

```

src/
├── app/
│    ├── store.ts
│    └── rootSaga.ts
│
├── features/
│    └── task/
│         ├── taskActions.ts
│         └── taskSaga.ts
│
├── App.tsx
└── index.tsx

```

---

## 🎯 Problem This Project Solves

In real applications:
- Long-running tasks may need to be cancelled
- Users may navigate away or click “Cancel”
- API requests may need timeouts

This project demonstrates how Redux-Saga provides **full control** over these scenarios.

---

## 🔄 Application Flow

```

User clicks "Start Task"
↓
START_TASK action dispatched
↓
Saga forks longRunningTask
↓
race(
task completes after delay,
CANCEL_TASK action
)
↓
If CANCEL_TASK wins → task is cancelled
If delay wins → task completes successfully

````

---

## 🧩 Key Saga Logic

### Long-running task

```ts
function* longRunningTask() {
  try {
    yield delay(5000);
  } finally {
    console.log("Task ended (completed or cancelled)");
  }
}
````

---

### `race` & `cancel`

```ts
const task = yield fork(longRunningTask);

const { cancelTask } = yield race({
  completed: delay(5000),
  cancelTask: take(CANCEL_TASK),
});

if (cancelTask) {
  yield cancel(task);
}
```

---

## 🧠 Key Concepts Explained

### `race`

* Runs multiple effects in parallel
* The **first one to complete wins**
* Remaining effects are automatically cancelled

### `cancel`

* Stops a running saga immediately
* Triggers the `finally` block in the cancelled saga

### `fork`

* Starts a saga in the background
* Required for manual cancellation

---

## 🧪 How to Run and Test

1. Start the app:

   ```bash
   npm run dev
   ```

2. Open the browser console

3. Click **Start Task**

4. Optionally click **Cancel Task** before 5 seconds

---

### Expected Console Output

#### Let task complete:

```
Task started...
Task completed successfully
Task ended (completed or cancelled)
```

#### Cancel task early:

```
Task started...
CANCEL_TASK received
Task ended (completed or cancelled)
```

---

## ✅ Learning Outcome

After completing this project, you should understand:

* How Redux-Saga manages long-running tasks
* When to use `race` instead of `takeLatest`
* How to cancel sagas manually
* How to build cancellable and resilient async flows

---

## 🧠 One-Line Takeaway

> **Use `race` when multiple outcomes compete.
> Use `cancel` when you need full control over async tasks.**

---

