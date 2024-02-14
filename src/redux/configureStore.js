import storage from "redux-persist/lib/storage";
// import { applyMiddleware, combineReducers, createStore } from "redux";

import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const sagaMiddleware = createSagaMiddle();
// export const middlewares = [thunk, sagaMiddleware];
// if (process.env.NODE_ENV === `development`) {
// 	middlewares.push(logger);
// }
export const store = configureStore({
  // rootReducer, applyMiddleware(...middlewares)
  reducer: rootReducer,
  middleware:
    process.env.NODE_ENV !== "production"
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
