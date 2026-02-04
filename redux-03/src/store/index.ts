
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appReducer from "./appSlice";
import authReducer from "./authSlice";
import { rootSaga } from "./sagas";

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  }, // empty for now — we add later
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// run saga later (we will add rootSaga next step)

sagaMiddleware.run(rootSaga);
