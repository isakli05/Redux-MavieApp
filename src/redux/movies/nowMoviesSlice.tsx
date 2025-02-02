import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getNowMoviesAsync } from "../services";
import { Movies } from "../../types/Movies";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface NowMoviesState {
    data: Movies | undefined;
    loading: "idle" | "pending" | "fulfilled" | "rejected";
    error: string;
    page:number;
  }
  
  const initialState: NowMoviesState = {
    data: undefined,
    loading: 'idle',
    error: "",
    page:1,
  };
  
export const fetchNowMovies = createAsyncThunk(
  "fetchNowMovies",
  async (page?: number) => {
    const res = await axios<Movies>(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&page=${page}&adult=false`
    );
    return res.data;
  }
);

export const nowMoviesSlice = createSlice({
  name: "nowMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch Now Playing Movies
    builder.addCase(fetchNowMovies.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchNowMovies.fulfilled,
      (state, action: PayloadAction<Movies>) => {
        state.data = { ...state.data, ...action.payload };
        state.loading = "fulfilled";
        state.page++;
      }
    );
    builder.addCase(fetchNowMovies.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default nowMoviesSlice.reducer;

