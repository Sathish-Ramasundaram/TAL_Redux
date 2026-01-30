
# Project 1 – Redux-Saga Introduction (Button Click Logger)

This project demonstrates the **basic working of Redux and Redux-Saga** in a React + TypeScript application.

The goal of this project is to understand **why Redux-Saga is used**, how it integrates with Redux, and how it handles **side effects** separately from UI components.

---

## 🧠 What This Project Teaches

- What Redux is and why it is used
- What Redux-Saga is and why it exists
- How actions flow through Redux
- How Saga listens to Redux actions
- How side effects (like delays) are handled outside components
- Clean separation of concerns (UI vs logic)

---

## 🛠 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React-Redux
- Redux-Saga
- Rspack (bundler)

---

## 📁 Project Structure

```

src/
├── actions.ts          # Redux action definitions
├── saga.ts             # Saga (side-effect handling)
├── dummyReducer.ts     # Minimal reducer to satisfy Redux
├── store.ts            # Redux store configuration
├── App.tsx             # UI component
└── index.tsx           # Application entry point

```

---

## 🔄 Application Flow

1. User clicks the **Click Me** button
2. `BUTTON_CLICKED` action is dispatched
3. Redux store receives the action
4. Redux-Saga middleware intercepts the action
5. Saga waits for 2 seconds
6. Saga logs a message to the console

```

UI → Action → Redux → Saga → Side Effect

````

---

## 🧩 Key Concepts Explained

### Redux
- Centralized state management
- Actions describe **what happened**
- Reducers update state synchronously

### Redux-Saga
- Handles asynchronous logic (side effects)
- Uses generator functions
- Listens to Redux actions using effects like `takeEvery`
- Keeps UI components clean and simple

---

## 🧪 How to Test This Project

1. Start the development server:
   ```bash
   npm run dev
````

2. Open the browser console
3. Click the **Click Me** button

### Expected Output

Immediately:

```
Saga received BUTTON_CLICKED action
```

After 2 seconds:

```
Button clicked after 2 seconds (from saga)
```

---

## 🚦 Why This Project Uses a Dummy Reducer

Redux requires at least one valid reducer.
This project focuses on **Saga behavior**, so a minimal `dummyReducer` is used to keep the setup valid without adding unnecessary state logic.

---

## ✅ Learning Outcome

After completing this project, you should clearly understand:

* The role of Redux vs Redux-Saga
* How Saga reacts to Redux actions
* Why side effects should not live in components or reducers
* How to structure a Redux-Saga project correctly

---

