```md
# Redux-Saga Learning Projects (Projects 1–7)

This repository contains a **progressive series of mini-projects** designed to build a **strong, real-world understanding of Redux-Saga** in a React + TypeScript application.

Each project focuses on **one core Redux-Saga concept**, starting from basics and moving toward advanced control of asynchronous side effects.

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

## 🧠 Learning Philosophy

The projects follow these principles:

- One concept per project
- Clear separation of concerns (UI / state / side effects)
- Feature-based folder structure
- Real-world patterns, not toy examples
- Incremental complexity

---

## 📁 Overall Folder Structure (Feature-Based)

src/
├── app/
│ ├── store.ts
│ └── rootSaga.ts
│
├── features/
│ ├── button/
│ ├── user/
│ ├── search/
│ ├── error/
│ ├── profile/
│ └── task/
│
├── App.tsx
└── index.tsx

---

# 🚀 Project Overview

---

## 🔹 Project 1 – Redux-Saga Introduction (`takeEvery`)

**Goal:**  
Understand what Redux-Saga is and how it listens to Redux actions.

**Key Concepts:**

- Actions
- Saga middleware
- `takeEvery`
- Side effects outside components

**Behavior:**

- Button click dispatches an action
- Saga listens and performs a delayed side effect

**Learning Outcome:**

> Redux-Saga reacts to actions and handles side effects independently of UI.

---

## 🔹 Project 2 – Data Fetching with Saga + Reducer

**Goal:**  
Fetch data on app load and store it in Redux state.

**Key Concepts:**

- Reducers
- `call` and `put`
- Page-load side effects
- `useSelector`

**Behavior:**

- App loads
- Saga fetches user data
- Reducer stores data
- UI displays result

**Learning Outcome:**

> Full Redux → Saga → Reducer → UI data flow.

---

## 🔹 Project 3 – Search with `takeLatest`

**Goal:**  
Handle fast user input safely.

**Key Concepts:**

- `takeLatest`
- Cancelling previous tasks automatically
- High-frequency actions

**Behavior:**

- User types quickly in search box
- Only the latest request updates UI

**Learning Outcome:**

> `takeLatest` prevents stale or incorrect UI updates.

---

## 🔹 Project 4 – Error Handling with `try / catch`

**Goal:**  
Handle API failures gracefully.

**Key Concepts:**

- `try / catch` in sagas
- Failure actions
- Error state in reducers

**Behavior:**

- API fails intentionally
- Saga catches error
- UI displays error message

**Learning Outcome:**

> Every async saga must handle failure, not just success.

---

## 🔹 Project 5 – Testing Redux-Sagas

**Goal:**  
Test saga logic without UI or Redux store.

**Key Concepts:**

- Jest
- `redux-saga-test-plan`
- Mocking `call`
- Testing success & failure paths

**Behavior:**

- Saga tested in isolation
- API calls mocked
- Actions asserted

**Learning Outcome:**

> Sagas are generator functions and can be tested like pure logic.

---

## 🔹 Project 6 – `select` & `throttle`

**Goal:**  
Read Redux state inside sagas and limit action frequency.

**Key Concepts:**

- `select`
- `throttle`
- Auto-save pattern

**Behavior:**

- User updates profile name
- Save button can be clicked many times
- Saga saves at most once every 3 seconds

**Learning Outcome:**

> Reducers store state; sagas read state and control side effects.

---

## 🔹 Project 7 – `race` & `cancel`

**Goal:**  
Manually control long-running tasks.

**Key Concepts:**

- `race`
- `cancel`
- `fork`
- Task cancellation & cleanup

**Behavior:**

- Start long-running task
- Cancel it manually
- Saga cleans up correctly

**Learning Outcome:**

> `race` and `cancel` provide full control over async workflows.

---

## 🧠 Key Redux-Saga Concepts Covered

| Concept              | Project   |
| -------------------- | --------- |
| `takeEvery`          | Project 1 |
| `call`, `put`        | Project 2 |
| `takeLatest`         | Project 3 |
| Error handling       | Project 4 |
| Saga testing         | Project 5 |
| `select`, `throttle` | Project 6 |
| `race`, `cancel`     | Project 7 |

---

## 🧠 Core Principles Reinforced

- UI only dispatches actions
- Reducers are synchronous and pure
- Sagas handle async logic and side effects
- Feature-based architecture scales
- TypeScript improves correctness
- Tests protect business logic

---

## 🧠 Final Takeaway

> **Redux stores state.  
> Sagas control side effects.  
> Components stay simple.**

---

## 🚀 Possible Next Steps

- Combine sagas with real APIs
- Add authentication flow
- Test advanced saga effects
- Prepare Redux-Saga interview Q&A
- Convert reducers to Redux Toolkit slices

---

## ✅ Status

✔ Projects 1–7 completed  
✔ Feature-based architecture implemented  
✔ Redux-Saga fundamentals to advanced concepts covered  
✔ Cypress tests added/run — redux-cypress-01
```

---
