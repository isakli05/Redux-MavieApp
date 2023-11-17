import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "../services";
import { Movies } from "../../types/Movies";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface PopularMoviesState {
  data: Movies | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  page: number;
}

const initialState: PopularMoviesState = {
  data: undefined,
  loading: "idle",
  error: "",
  page: 1,
};

//server için&language=tr-TR&page=1
//export const fetchMovies =getpopularMoviesAsync;
// `https://api.themoviedb.org/3/movie/popular?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&page=${page}`

export const fetchMovies = createAsyncThunk(
  "fetchMovies",
  async (page?: number) => {
    const res = await axios<Movies>(
      `https://api.themoviedb.org/3/movie/popular?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&page=${page}&adult=false`
    );
    return res.data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch Popular Movies
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchMovies.fulfilled,
      (state, action: PayloadAction<Movies>) => {
        state.data = { ...current(state), ...action.payload };
        //console.log(state.data);
        // console.log(current(state))

        state.loading = "fulfilled";
        state.page++;
      }
    );
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default moviesSlice.reducer;
