import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector,TypedUseSelectorHook } from "react-redux";
import moviesSlice from "./movies/moviesSlice";
import personSlice from "./persons/personSlice";

export  const store= configureStore({
  reducer: {
    movies: moviesSlice,
    persons: personSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector