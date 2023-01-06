import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getpopularMoviesAsync } from "../services";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { TvDetails } from "../../types/tvsDetails";

interface TvDetailState {
  data: TvDetails | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: TvDetailState = {
  data: undefined,
  loading: "idle",
  error: "",
};


export const fetchTvDetail = createAsyncThunk(
  "fetchTvDetail",
  async (tv_id?:string) => {
    const res = await axios<TvDetails>(
      `https://api.themoviedb.org/3/tv/${tv_id}?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&append_to_response=network`      
    );
    return res.data;
  }
);

export const tvDetailSlice = createSlice({
  name: "tvDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {   
    builder.addCase(fetchTvDetail.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTvDetail.fulfilled,
      (state, action: PayloadAction<TvDetails>) => {
        state.data =action.payload;
        state.loading = "fulfilled";        
      }
    );
    builder.addCase(fetchTvDetail.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default tvDetailSlice.reducer;
