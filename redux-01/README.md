# redux-01 ⚛️ + Redux + Redux-Saga

**A small starter project demonstrating React + TypeScript + Redux Toolkit + Redux-Saga** with routing, basic auth flow (mocked), and a minimal Rspack + Tailwind setup.

---

## 🚀 Quick overview

- Minimal demo app to learn how to wire up Redux Toolkit, Redux-Saga, and React Router in a TypeScript React project.
- Includes a simple auth flow (Login, Register, Protected Dashboard), API stubs under `src/api`, and a store with slices and sagas under `src/store`.

---

## 🧭 Project structure (key files)

- `src/`
  - `App.tsx` — main app component and routes
  - `index.tsx` — app entry
  - `index.css` — Tailwind entry
  - `api/` — mock API modules (`authApi.ts`, `demoApi.ts`, `registerApi.ts`)
  - `pages/` — `Login`, `Register`, `Dashboard`
  - `routes/ProtectedRoute.tsx` — Route guard
  - `store/` — Redux Toolkit slices, sagas, and store setup (`authSlice.ts`, `appSlice.ts`, `sagas.ts`, `index.ts`)

---

## 🧰 Tech stack

- React 19 + TypeScript
- Redux Toolkit
- Redux-Saga
- React Router DOM
- Rspack (dev server & build)
- Tailwind CSS
- Jest + ts-jest for tests

---

## 💻 Prerequisites

- Node.js (recommended 16+)
- npm (or yarn/pnpm)

---

## Project Description

Implemented a complete Saga-driven authentication flow including login and logout, where UI actions dispatch Redux actions, Saga workers handle async API simulation, and reducers update global state accordingly.

Added protected routing using Redux auth state, ensuring that secured pages like the Dashboard are only accessible after successful login.

Demonstrated core Redux-Saga concepts including worker sagas, watcher sagas, takeLatest behavior for user-intent actions (login/logout), call and put effects, delay simulation, and structured error handling with try/catch inside sagas.

The project is structured to further extend with additional Saga patterns such as takeEvery, race, cancel, throttle, and parallel effects through dashboard and chat-style task demonstrations.

--

## ⚡ Local setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

> Note: There is no `test` script in `package.json` by default — run `npx jest` or add a script: `"test": "jest"` if you want `npm test`.

---

## 🧪 Tests

- Jest is configured via `jest.config.js` and `src/jest.setup.ts`.
- Run tests with:

```bash
npx jest --coverage
```

---

## 💡 Tips & notes

- The `src/api` modules are simple stubs — replace with real API calls or wire up a backend as you progress.
- Sagas live in `src/store/sagas.ts` and coordinate side-effects (API calls, async flows).
- Add additional linting or formatting scripts as needed for your workflow.

---

## ✅ Contributing

Contributions and suggestions welcome — open issues or PRs.

---

## 📄 License

MIT
