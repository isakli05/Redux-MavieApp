import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getPopularPersonsAsync } from "./movies/services";
import { PopularPersons } from "../../types/popularPersons";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

interface PopularPersonsState {
  data: PopularPersons | undefined;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string;
  page: number;
}

const initialState: PopularPersonsState = {
  data: undefined,
  loading: "idle",
  error: "",
  page: 1,
};

//server için&language=tr-TR&page=1
//export const fetchPersons =getPopularPersonsAsync;
// `https://api.themoviedb.org/3/movie/popular?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&page=${page}`

export const fetchPersons = createAsyncThunk(
  "fetchPersons",
  async (page?: number) => {
    const res = await axios<PopularPersons>(
      `https://api.themoviedb.org/3/person/popular?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&page=${page}`
    );
    return res.data;
  }
);

export const personSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersons.pending, (state, action) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchPersons.fulfilled,
      (state, action: PayloadAction<PopularPersons>) => {
        state.data = { ...current(state), ...action.payload };
        //console.log(state.data);
        //console.log(current(state))

        state.loading = "fulfilled";
        state.page++;
      }
    );
    builder.addCase(fetchPersons.rejected, (state, action) => {
      state.error = "error fetching data";
      state.loading = "rejected";
    });
  },
});

// export const { getMovies } = personSlice.actions;
export default personSlice.reducer;
