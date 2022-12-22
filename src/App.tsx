import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { fetchMovies } from "./redux/moviesSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies/Movies";
import Persons from "./Pages/Persons";
import TVs from "./Pages/Tvs/TVs";
import NotFound from "./components/NotFound";
import Upcoming from "./Pages/Movies/Upcoming";
import NowPlaying from "./Pages/Movies/NowPlaying";
import AiringToday from "./Pages/Tvs/AiringToday";
import OnAir from "./Pages/Tvs/OnAir";
import Movie404 from "./Pages/Movies/Movie404";
import Tv404 from "./Pages/Tvs/Tv404";

function App() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const currerntMovie = movies.data && movies.data.results[1];
  return (
    <>
       <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
       

        <Route path="/movies">
          <Route index element={<Movies />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="upcoming" element={<Upcoming />} />
        <Route path="*" element={<Movie404 />} />

        </Route>

        <Route path="/tv">
          <Route index element={<TVs />} />
          <Route path="airing-today" element={<AiringToday />} />
          <Route path="on-the-air" element={<OnAir />} />
        <Route path="*" element={<Tv404 />} />
        </Route>
       
        <Route path="/person" element={<Persons />} />
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </>
  );
}

export default App;
