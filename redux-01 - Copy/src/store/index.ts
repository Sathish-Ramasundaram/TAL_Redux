import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import appReducer from "./appSlice";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import inventoryReducer from "./inventorySlice";
import bundleReducer from "./bundleSlice";
import syncReducer from "./syncSlice";
import mailReducer from "./mailSlice";



// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
    inventory: inventoryReducer,
    bundle: bundleReducer,
    sync: syncReducer,
    mail: mailReducer,
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// run saga later (we will add rootSaga next step)

sagaMiddleware.run(rootSaga);

