# Redux + Redux-Saga E2E Testing Demo

A learning project demonstrating state management using **Redux Toolkit** and **Redux-Saga** with end-to-end testing using **Cypress**.

## 🎯 Purpose

This project teaches how to:

- Set up Redux with Redux Toolkit (RTK)
- Integrate Redux-Saga middleware for side effects
- Write end-to-end tests with Cypress
- Connect React components to Redux state
- Test real user interactions

## 📚 Learning Concepts

- **Jest** = Unit testing (microscope 🔬)
- **Cypress** = E2E testing with real user interactions (👤)
- **Redux-Saga** = Business logic and side effects (⚙️)

## 🛠 Tech Stack

| Technology    | Version  | Purpose                 |
| ------------- | -------- | ----------------------- |
| React         | ^19.2.4  | UI framework            |
| Redux Toolkit | ^2.11.2  | State management        |
| Redux-Saga    | ^1.4.2   | Side effects middleware |
| React-Redux   | ^9.2.0   | React-Redux bindings    |
| Cypress       | ^15.10.0 | E2E testing             |
| Rspack        | ^1.7.5   | Build tool              |
| Tailwind CSS  | ^3.4.17  | Styling                 |
| TypeScript    | ^5.9.3   | Type safety             |

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm build
```

## 🧪 Testing

### Run Cypress E2E Tests

```bash
npm run test:e2e
```

Or open Cypress UI:

```bash
npx cypress open
```

### Jest Unit Tests

```bash
npm run test
```

## 📁 Project Structure

```
src/
├── App.tsx              # Main React component
├── index.tsx            # React entry point
├── index.css            # Global styles
├── jest.setup.ts        # Jest configuration
└── store/
    ├── index.ts         # Redux store configuration
    └── appSlice.ts      # Redux state slice with actions

cypress/
├── e2e/                 # E2E test files
│   ├── loading.cy.ts    # Loading toggle tests
│   └── saga.cy.ts       # Redux-Saga tests
├── fixtures/            # Test data
├── support/             # Cypress helpers
└── tsconfig.json        # TypeScript config

public/                  # Static assets
```

## 💡 Features

### Redux Store Setup

- Modern Redux using Redux Toolkit (`createSlice`)
- Redux-Saga middleware for async operations
- Redux DevTools integration (built-in with RTK)

### Loading State Management

- `startLoading()` action - sets loading to true
- `stopLoading()` action - sets loading to false
- Visual UI indicator (ACTIVE/INACTIVE)

### Cypress Tests

- **loading.cy.ts** - Tests the loading toggle functionality
  - Initial state check (INACTIVE)
  - Start button interaction
  - Stop button interaction

- **saga.cy.ts** - Tests Redux-Saga integration
  - Fetch button click
  - Loading state display
  - Data retrieval from Saga

### UI Components

- Clean, centered layout with Tailwind CSS
- Start/Stop buttons to control loading state
- Status indicator showing current loading state
- Responsive design

## 📖 Learning Steps

Follow the step-by-step guides in the repository:

- **Cstep01.md** - Initial setup and data reducer
- **Cstep2.md** - Store configuration and Redux middleware

## 🔧 Configuration Files

- `rspack.config.js` - Rspack bundler configuration
- `tailwind.config.js` - Tailwind CSS setup
- `postcss.config.js` - PostCSS configuration
- `jest.config.js` - Jest testing setup
- `cypress.config.ts` - Cypress E2E testing configuration
- `tsconfig.json` - TypeScript compiler configuration

## 📝 Data Attributes for Testing

The app includes data-testid attributes for easy element selection in tests:

- `data-testid="status-text"` - Loading status display
- `data-testid="start-btn"` - Start button
- `data-testid="stop-btn"` - Stop button
- `data-testid="fetch-btn"` - Fetch button (for Saga tests)

## 🎓 Key Takeaways

1. **Redux Toolkit** simplifies Redux boilerplate with `createSlice`
2. **Redux-Saga** handles complex async logic cleanly
3. **Cypress** tests user-facing behavior reliably
4. **TypeScript** provides type safety across the stack
5. **Tailwind CSS** enables rapid UI styling

## 📦 Dependencies Overview

### Production

- `@reduxjs/toolkit` - Opinionated Redux setup
- `react-redux` - Official React bindings for Redux
- `redux-saga` - Middleware for side effects
- `react-router-dom` - Routing (if needed)

### Development

- `cypress` - E2E testing
- `jest` - Unit testing
- `typescript` - Type checking
- Rspack ecosystem for bundling and dev server

## ⚡ Quick Reference

| Command            | Purpose                  |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Build for production     |
| `npx cypress open` | Open Cypress Test Runner |
| `npm run test`     | Run Jest unit tests      |

## 🔗 Resources

- [Redux Documentation](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Cypress Testing](https://docs.cypress.io/)
- [React Documentation](https://react.dev/)

---

**Status**: This is a training/learning project demonstrating Redux and E2E testing patterns.
