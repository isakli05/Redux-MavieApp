import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "./movies/services";
import { PopularMovies } from "../types/popularMovies";
import axios from "axios";

interface PopularMoviesState {
  data: PopularMovies | null;
  loading: boolean;
  error: string;
}

const initialState: PopularMoviesState = {
  data: null,
  loading: false,
  error: "",
};

export const fetchMovies =getpopularMoviesAsync;

//  export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
//    const res = await axios.get<PopularMovies>(
//      "https://api.themoviedb.org/3/movie/popular?api_key=a005a803cdec9237f52c2801d1f28661"
//    );
//    return res.data;
//  });

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMovies.fulfilled,(state,action:PayloadAction<PopularMovies>)=>{
        state.data=action.payload;
        state.loading=false;
    });
    builder.addCase(fetchMovies.rejected,(state,action)=>{
        state.error="error fetching data";
        state.loading=false;
    })
 },
});

// export const { getMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
