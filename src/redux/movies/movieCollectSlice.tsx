import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "../services";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { MovieCollect } from "../../types/movieCollect";

interface MovieCollectState {
  data: MovieCollect | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: MovieCollectState = {
  data: undefined,
  loading: "idle",
  error: "",
};


export const fetchMovieCollect = createAsyncThunk(
  "fetchMovieCollect",
  async (coll_id:string) => {
    const res = await axios<MovieCollect>(
      `https://api.themoviedb.org/3/collection/${coll_id}?api_key=a005a803cdec9237f52c2801d1f28661&language=en-US`
    );
    return res.data;
  }
);

export const movieCollectSlice = createSlice({
  name: "movieCollect",
  initialState,
  reducers: {},
  extraReducers: (builder) => {    
    builder.addCase(fetchMovieCollect.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchMovieCollect.fulfilled,
      (state, action: PayloadAction<MovieCollect>) => {
        state.data =action.payload;
        state.loading = "fulfilled";        
      }
    );
    builder.addCase(fetchMovieCollect.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default movieCollectSlice.reducer;
