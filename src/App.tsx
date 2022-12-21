import "./App.css";
import { fetchMovies } from "./redux/moviesSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
function App() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const currerntMovie= movies.data&&movies.data.results[1];
  return (
    <div className="container mx-auto">
      <button onClick={() => dispatch(fetchMovies())}>Fetch Movie</button><br /><br />
      {movies.loading && "loading..."}
      {movies.error && movies.error}
      {currerntMovie && <div>
       <p> Movie Name: {currerntMovie.title}</p>
        <p>Movie Language: {currerntMovie.original_language}</p>
        <p>Movie Overview: {currerntMovie.overview}</p>
        Movie Poster: <img className="w-44" src={`https://image.tmdb.org/t/p/original/${currerntMovie.poster_path}`}/>
        </div>}
        <p>{movies.data?.total_pages}</p>
    </div>
  );
}

export default App;
