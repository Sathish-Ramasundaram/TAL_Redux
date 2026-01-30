import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { dummyReducer } from '../dummyReducer';
import { rootSaga } from "./rootSaga";
import { userReducer } from "../features/user/userReducer";
import { searchReducer } from "../features/search/searchReducer";
import { errorReducer } from '../features/error/errorReducer';


// 1. Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Create the Redux store
export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    user: userReducer,
    search: searchReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// 3. Export types (for future use)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 4. Export sagaMiddleware so we can run sagas later
export { sagaMiddleware };
