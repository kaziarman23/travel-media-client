import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import baseApi from "./features/api/baseApi.js";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
