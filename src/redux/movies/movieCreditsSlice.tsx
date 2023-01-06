import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "../services";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { MovieCredits } from "../../types/movieCredits";

interface MovieCreditsState {
  data: MovieCredits | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: MovieCreditsState = {
  data: undefined,
  loading: "idle",
  error: "",
};

export const fetchMovieCredits = createAsyncThunk(
  "fetchMovieCredit",
  async (id?: string) => {
    const res = await axios<MovieCredits>(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR`
    );
    return res.data;
  }
);

export const movieCreditsSlice = createSlice({
  name: "movieCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieCredits.pending, (state) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchMovieCredits.fulfilled,
      (state, action: PayloadAction<MovieCredits>) => {
        state.data = action.payload;
        state.loading = "fulfilled";
      }
    );
    builder.addCase(fetchMovieCredits.rejected, (state) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default movieCreditsSlice.reducer;
