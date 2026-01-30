
```md
# Project 6 – Using `select` & `throttle` in Redux-Saga

This project demonstrates how to use **advanced Redux-Saga effects** — `select` and `throttle` — to build real-world side-effect logic.

The example implements a **profile auto-save pattern**, where Redux-Saga:
- reads the latest Redux state using `select`
- limits save frequency using `throttle`

---

## 🧠 What This Project Teaches

- How to read Redux state inside a saga using `select`
- How to prevent action spamming using `throttle`
- Difference between reducers (state) and sagas (side effects)
- Building an auto-save / spam-prevention pattern
- Writing scalable, production-grade saga logic

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
│    └── profile/
│         ├── profileActions.ts
│         ├── profileReducer.ts
│         └── profileSaga.ts
│
├── App.tsx
└── index.tsx

```

---

## 🎯 Problem This Project Solves

In real applications:
- Users may click “Save” many times
- UI should not trigger multiple API calls
- Saga logic often needs current Redux state

This project solves both by:
- Reading state using `select`
- Controlling execution frequency using `throttle`

---

## 🔄 Application Flow

```

User types name
↓
UPDATE_PROFILE action
↓
profileReducer updates Redux state
↓
User clicks Save
↓
SAVE_PROFILE action
↓
profileSaga (throttle)
↓
select(profile state)
↓
Save runs at most once every 3 seconds

````

---

## 🧩 Redux State Shape

```ts
{
  profile: {
    name: string
  }
}
````

---

## 🧠 Key Concepts Explained

### `select`

* Reads the **latest Redux state** inside a saga
* Works independently of React components
* Useful for:

  * auto-save
  * conditional API calls
  * reading user/session data

```ts
yield select((state: RootState) => state.profile);
```

---

### `throttle`

* Limits how often a saga can run
* Ignores repeated actions within a time window
* Ideal for:

  * Save buttons
  * Scroll events
  * Analytics tracking

```ts
yield throttle(3000, SAVE_PROFILE, handleSaveProfile);
```

---

## 🧪 How to Run and Test

1. Start the app:

   ```bash
   npm run dev
   ```

2. Open browser console

3. Type a name and click **Save Profile** rapidly

### Expected Behavior

* Console logs appear **only once every 3 seconds**
* Redux state always contains the latest profile name
* UI remains responsive and stable

---

## ✅ Learning Outcome

After completing this project, you should understand:

* How sagas can read Redux state
* Why sagas (not components) control side effects
* How to prevent action spamming cleanly
* Real-world usage of `select` and `throttle`

---

## 🧠 One-Line Takeaway

> **Reducers store state.
> Sagas read state and control side effects.**

---

## 🚀 Next Steps

Possible next projects:

* `race` & `cancel` in Redux-Saga
* Testing sagas using `select` & `throttle`
* Auto-save with real API calls
* Redux-Saga interview questions

```

