import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TvSeasons } from "../../types/tvSeasons";

interface TvSeasonsState {
  data: TvSeasons | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  
}

const initialState: TvSeasonsState = {
  data: undefined,
  loading: "idle",
  error: "",
};

interface TvSeasonsParams {
    tv_id?: string;
    season_number?: string;    
  }

export const fetchTvSeasons = createAsyncThunk<TvSeasons,TvSeasonsParams>(
  "fetchTvSeasons",
  async (params) => {
    const res = await axios(     
      `https://api.themoviedb.org/3/tv/${params.tv_id}/season/${params.season_number}?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&language=en-US` ,{
        params: {
            tv_id: params.tv_id,
            season_number:params.season_number
          }
      }     
    );
    return res.data;
  }
);

export const tvSeasonsSlice = createSlice({
  name: "tvSeasons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {   
    builder.addCase(fetchTvSeasons.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTvSeasons.fulfilled,
      (state, action: PayloadAction<TvSeasons>) => {
        state.data =action.payload;
        state.loading = "fulfilled";        
      }
    );
    builder.addCase(fetchTvSeasons.rejected, (state) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

export default tvSeasonsSlice.reducer;
