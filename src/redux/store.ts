import { configureStore } from "@reduxjs/toolkit";
import langueReducer from "./slice/langue";

export const store = configureStore({
  reducer: {
    langue: langueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
