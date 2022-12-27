import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "../services";
import { PopularMovies } from "../../types/popularMovies";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface PopularMoviesState {
  data: PopularMovies | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  page:number;
}

const initialState: PopularMoviesState = {
  data: undefined,
  loading: 'idle',
  error: "",
  page:1,
};

//server için&language=tr-TR&page=1
//export const fetchMovies =getpopularMoviesAsync;
// `https://api.themoviedb.org/3/movie/popular?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&page=${page}`

 export const fetchMovies = createAsyncThunk("fetchMovies", async (page?:number) => {
   const res = await axios<PopularMovies>(
    "https://api.themoviedb.org/3/movie/popular?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&page="+page
   );
   return res.data;
 });

 
export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch Popular Movies
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = 'pending';
      state.error = "";
    });
    builder.addCase(fetchMovies.fulfilled,(state,action:PayloadAction<PopularMovies>)=>{
      state.data={...current(state),...action.payload};
      console.log(state.data);
        
        // console.log(current(state))
        
        state.loading="fulfilled";
        state.page++;

    });
    builder.addCase(fetchMovies.rejected,(state,action)=>{
        state.error="error fetching data";
        state.loading="rejected";
    })

    //fetch Now Playing Movies

 },
});

// export const { getMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
