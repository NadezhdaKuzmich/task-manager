import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice/AuthSlise";
import BoardsReducer from "../slices/BoardSlice/BoardsSlice";
import modalReducer from "../slices/ModalSlice";

export const rootReducer = combineReducers({
  user: authReducer,
  boards: BoardsReducer,
  modal: modalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};