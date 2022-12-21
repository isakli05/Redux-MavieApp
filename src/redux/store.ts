import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector,TypedUseSelectorHook } from "react-redux";
import moviesSlice from "./moviesSlice";

export  const store= configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector