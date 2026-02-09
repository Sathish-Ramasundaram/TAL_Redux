

# 📦 Redux-Saga Concepts Demo App (React + TypeScript + Rspack)

This project is a concept-driven React application built to demonstrate **real-world Redux-Saga patterns** using a UI-visible, feature-based approach.
Each major Redux-Saga effect is implemented with a working screen or interaction, not just console examples.

The application includes authentication flow, OTP race handling, dashboard bundle loading, background sync control, chat messaging, inventory checks using select, and a throttled mail undo system.

Built using **React + TypeScript + Redux Toolkit + Redux-Saga + Tailwind CSS + Rspack**.

---

# 🚀 Features Implemented

## 🔐 Authentication Flow

* Login flow managed with Redux-Saga
* Protected dashboard routing
* Dev login shortcut (bypass OTP for testing)
* Saga-driven async login handling

## 🔢 OTP Verification — Race Effect Demo

* OTP page between Login and Dashboard
* Saga `race` between:

  * user OTP submit
  * timeout delay
* Timeout shows Tailwind modal dialog
* Expired OTP resets auth state and redirects
* Demonstrates: `race`, `take`, `delay`, `call`, `put`

---

## 💬 Chat Demo — takeEvery

* Chat message sender page
* Multiple messages processed concurrently
* Demonstrates `takeEvery`
* Shows parallel saga handling

---

## 📦 Inventory Demo — select Effect

* Inventory items stored in Redux
* Saga reads state using `select`
* Conditional API simulation based on item count
* Demonstrates state-driven saga branching

---

## 📊 Dashboard Bundle Loader — all Effect

* Sidebar profile panel with user icon trigger
* Loads profile, notifications, and stats together
* Saga uses `all` to fetch data in parallel
* UI updates only after all complete
* Demonstrates parallel effect coordination

---

## 🔄 Background Sync — fork + cancel

* Dashboard background sync demo
* Start Sync → forked infinite loop task
* Stop Sync → cancel running task
* UI shows running/stopped status
* Console shows periodic sync ticks
* Demonstrates background saga task control

---

## ✉️ Mail Undo Window — throttle Effect

* Mailbox demo page
* Send Mail → Undo available for 10 seconds
* Undo button remains visible during window
* Only first Undo click is accepted
* Further clicks throttled
* After window expires → undo disabled
* Saga combines:

  * `throttle`
  * `select` state guard
  * timed undo window
* Demonstrates rate-limiting + business rule validation

---

# 🧠 Redux-Saga Concepts Demonstrated

This project includes working examples of:

* saga middleware setup
* worker / watcher pattern
* generator functions (`function*`)
* `yield` flow control

## Effects Used

* `call` — async API execution
* `put` — dispatch Redux actions
* `takeLatest` — latest action wins
* `takeEvery` — handle all actions
* `select` — read Redux state inside saga
* `race` — timeout vs user action
* `all` — parallel effect execution
* `fork` — background task start
* `cancel` — background task stop
* `throttle` — rate-limit actions
* `delay` — saga-controlled timers

---

# 🎨 UI & UX

* Tailwind CSS styled components
* Modal dialog for OTP timeout
* Sidebar profile drawer
* Dashboard cards for each saga concept
* State-driven button behavior
* Console + UI proof for every saga pattern

---

# 🛠 Tech Stack

* React
* TypeScript
* Redux Toolkit
* Redux-Saga
* Tailwind CSS
* Rspack
* React Router

---

# 🎯 Purpose of This Project

This project was built to:

* Learn Redux-Saga deeply through practical features
* Demonstrate saga patterns with UI outcomes
* Serve as a reference for async flow architecture
* Provide interview-ready saga examples
* Show correct state modeling with async workflows

---