import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import ButtonReducer from "../features/Button/ButtonSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSliceReducer,
      profile: profileReducer,
      Button: ButtonReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: process.env.NODE_ENV !== "production",
  });
};
