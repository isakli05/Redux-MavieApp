import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import{PopularMovies} from "../types/popularMovies"

export const getmoviesAsync = createAsyncThunk(
  "movies/getmoviesAync",
  async () => {
    const {data} = await axios(`${process.env.REACT_APP_BASE_API_ENDPOINT}/movies`);
    return await data;
  }
);

export const getpopularMoviesAsync = createAsyncThunk("fetchMovies", async () => {
    const res = await axios.get<PopularMovies>(
      "http://localhost:9000/popularFilms"
    );
    return res.data;
  });