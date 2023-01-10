import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import movieCollectSlice from "./movies/movieCollectSlice";
import movieCreditsSlice from "./movies/movieCreditsSlice";
import movieDetailSlice from "./movies/movieDetailSlice";
import moviesSlice from "./movies/moviesSlice";
import nowMoviesSlice from "./movies/nowMoviesSlice";
import upcomingMoviesSlice from "./movies/upcomingMoviesSlice";
import personSlice from "./persons/personSlice";
import tvCreditsSlice from "./tvShows/tvCreditSlice";
import tvOnAirSlice from "./tvShows/tvOnAirSlice";
import tvSeasonsSlice from "./tvShows/tvSeasonsSlice";
import tvDetailSlice from "./tvShows/tvShowsDetailSlice";
import tvShowsSlice from "./tvShows/tvShowsSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    persons: personSlice,
    nowMovies: nowMoviesSlice,
    upcomingMovies: upcomingMoviesSlice,
    movieCollect: movieCollectSlice,
    movieCredits: movieCreditsSlice,
    movieDetail: movieDetailSlice,
    tvs: tvShowsSlice,
    tvDetails: tvDetailSlice,
    tvCredits: tvCreditsSlice,
    tvSeasons:tvSeasonsSlice,
    tvOnAir:tvOnAirSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
