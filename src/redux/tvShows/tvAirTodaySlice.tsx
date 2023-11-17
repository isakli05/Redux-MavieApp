import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tvs } from "../../types/tvs";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface AirTodayState {
  data: Tvs | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  page: number;
}

const initialState: AirTodayState = {
  data: undefined,
  loading: "idle",
  error: "",
  page: 1,
};

export const fetchTvAirToday = createAsyncThunk(
  "fetchTvAirToday",
  async (page?: number) => {
    const res = await axios<Tvs>(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&page=${page}&adult=false`
    );
    return res.data;
  }
);

export const tvOnAirSlice = createSlice({
  name: "tvAirToday",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTvAirToday.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTvAirToday.fulfilled,
      (state, action: PayloadAction<Tvs>) => {
        state.data = { ...current(state), ...action.payload };     
        state.loading = "fulfilled";
        state.page++;
      }
    );
    builder.addCase(fetchTvAirToday.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default tvOnAirSlice.reducer;
