import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tvs } from "../../types/tvs";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface OnAirTvShowsState {
  data: Tvs | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  page: number;
}

const initialState: OnAirTvShowsState = {
  data: undefined,
  loading: "idle",
  error: "",
  page: 1,
};

export const fetchTvOnAir = createAsyncThunk(
  "fetchTvOnAir",
  async (page?: number) => {
    const res = await axios<Tvs>(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&page=${page}&adult=false`
    );
    return res.data;
  }
);

export const tvOnAirSlice = createSlice({
  name: "tvOnAir",
  initialState,
  reducers: {},
  extraReducers: (builder) => {    
    builder.addCase(fetchTvOnAir.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTvOnAir.fulfilled,
      (state, action: PayloadAction<Tvs>) => {
        state.data = { ...current(state), ...action.payload };     
        state.loading = "fulfilled";
        state.page++;
      }
    );
    builder.addCase(fetchTvOnAir.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default tvOnAirSlice.reducer;
