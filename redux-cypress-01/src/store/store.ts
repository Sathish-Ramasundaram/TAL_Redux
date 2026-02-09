import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import dataReducer from "./dataReducer";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  data: dataReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
