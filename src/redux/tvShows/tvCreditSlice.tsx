import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TvCredits } from "../../types/tvCredits";

interface TvCreditsState {
  data: TvCredits | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
}

const initialState: TvCreditsState = {
  data: undefined,
  loading: "idle",
  error: "",
};

export const fetchTvCredits = createAsyncThunk(
  "fetchTvCredits",
  async (id?: string) => {
    const res = await axios<TvCredits>(
      `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR`
    );
    return res.data;
  }
);

export const tvCreditsSlice = createSlice({
  name: "tvCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTvCredits.pending, (state) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTvCredits.fulfilled,
      (state, action: PayloadAction<TvCredits>) => {
        state.data = action.payload;
        state.loading = "fulfilled";
      }
    );
    builder.addCase(fetchTvCredits.rejected, (state) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default tvCreditsSlice.reducer;
