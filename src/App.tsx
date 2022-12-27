import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { fetchMovies } from "./redux/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies/Movies";
import Person from "./Pages/Persons/Persons.tsx";
import TVs from "./Pages/Tvs/TVs";
import NotFound from "./components/NotFound";
import Upcoming from "./Pages/Movies/Upcoming";
import NowPlaying from "./Pages/Movies/NowPlaying";
import AiringToday from "./Pages/Tvs/AiringToday";
import OnAir from "./Pages/Tvs/OnAir";
import Movie404 from "./Pages/Movies/Movie404";
import Tv404 from "./Pages/Tvs/Tv404";
import Footer from "./components/Footer";
import MovieDetail from "./Pages/Movies/MovieDetail";
import PersonDetails from "./Pages/Persons/PersonDetails";
import Person404 from "./Pages/Persons/Person404";
import MovieCast from "./Pages/Movies/MovieCast";

function App() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const currerntMovie = movies.data && movies.data.results[1];
  return (
    <div className="flex flex-col min-h-screen">
       <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
       

        <Route path="/movie">
          <Route index element={<Movies />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path=":id" element={<MovieDetail />} />
          <Route path=":id/cast" element={<MovieCast />} />
        <Route path="*" element={<Movie404 />} />

        </Route>

        <Route path="/tv">
          <Route index element={<TVs />} />
          <Route path="airing-today" element={<AiringToday />} />
          <Route path="on-the-air" element={<OnAir />} />
        <Route path="*" element={<Tv404 />} />
        </Route>
       
        
        <Route path="/Person">
          <Route index element={<Person />} />
          <Route path=":cast_id" element={<PersonDetails />} />
        <Route path="*" element={<Person404 />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes> 
      <Footer/>
    </div>
  );
}

export default App;
