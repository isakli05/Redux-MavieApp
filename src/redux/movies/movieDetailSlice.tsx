import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "../services";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { MovieDetails } from "../../types/movieDetails";

interface MovieDetailState {
  data: MovieDetails | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: MovieDetailState = {
  data: undefined,
  loading: "idle",
  error: "",
};


export const fetchMovieDetail = createAsyncThunk(
  "fetchMovieDetail",
  async (movie_id?:string) => {
    const res = await axios<MovieDetails>(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&adult=false`
      // &append_to_response=videos,images,credits,recommendations,similar,external_ids,keywords,release_dates,translations,watch/providers&include_image_language=en,null&watch_region=US
    );
    return res.data;
  }
);

export const MovieDetailSlice = createSlice({
  name: "MovieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {   
    builder.addCase(fetchMovieDetail.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchMovieDetail.fulfilled,
      (state, action: PayloadAction<MovieDetails>) => {
        state.data =action.payload;
        state.loading = "fulfilled";        
      }
    );
    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default MovieDetailSlice.reducer;
