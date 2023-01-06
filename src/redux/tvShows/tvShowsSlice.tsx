import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tvs } from "../../types/tvs";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface PopularTvShowsState {
  data: Tvs | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  page: number;
}

const initialState: PopularTvShowsState = {
  data: undefined,
  loading: "idle",
  error: "",
  page: 1,
};

export const fetchTvShows = createAsyncThunk(
  "fetchTvShows",
  async (page?: number) => {
    const res = await axios<Tvs>(
      `https://api.themoviedb.org/3/tv/popular?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&page=${page}`
    );
    return res.data;
  }
);

export const tvShowsSlice = createSlice({
  name: "tvs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch Popular Tv Shows
    builder.addCase(fetchTvShows.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTvShows.fulfilled,
      (state, action: PayloadAction<Tvs>) => {
        state.data = { ...current(state), ...action.payload };     
        state.loading = "fulfilled";
        state.page++;
      }
    );
    builder.addCase(fetchTvShows.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default tvShowsSlice.reducer;
