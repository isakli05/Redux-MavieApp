import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { image } from "../../helper";
import { Movies } from "../../types/Movies";

function MovieKeyList() {
  const { key_id } = useParams();
  const location = useLocation();

  const [movieKeyList, setMovieKeyList] = useState<Movies>();
  const [status, setStatus] = useState(true);
  const label =
    location.pathname.split("/")[2].split("-")[1] +
    " " +
    [location.pathname.split("/")[2].split("-")[2]] +
    " " +
    [location.pathname.split("/")[2].split("-")[3]] +
    " " +
    [location.pathname.split("/")[2].split("-")[4]] +
    " " +
    [location.pathname.split("/")[2].split("-")[5]];

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/keyword/${key_id}/movies?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=tr-TR&include_adult=false`
    )
      .then((res) => res.data)
      .then((data) => setMovieKeyList(data))
      .finally(() => setStatus(false));
  }, []);

  return (
    <div className="mb-5">
      <div className="w-full bg-cyan-900 p-5 mb-5 space-y-4">
        <h1 className="flex justify-between text-3xl mx-6 font-medium leading-tight">
          <span className="text-white">{label}</span>
          <span className="text-white">{movieKeyList?.total_results} film</span>
        </h1>
      </div>
      <div className="text-gray-600 text-center md:text-left body-font overflow-hidden">
        <div className="py-6 mx-5">
          <div className="space-y-10 md:space-y-0">
            {movieKeyList?.results.map((movie) => (
              <div
                key={movie.id}
                className="py-3 flex flex-wrap md:flex-nowrap"
              >
                <div className="flex-shrink-0 flex flex-col">
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      loading="lazy"
                      className="h-96 w-[260px] md:w-24 md:h-36 rounded-md ml-12 lg:ml-0"
                      src={`${
                        movie?.poster_path === null || ""
                          ? "/assets/tv_null.svg"
                          : `${image}${movie?.poster_path}`
                      }`}
                      alt={`${movie?.title}`}
                    />
                  </Link>
                </div>
                <div className="md:flex-grow ml-5">
                  <h2 className="text-2xl m-3 md:m-0 font-medium text-gray-100 title-font">
                    {movie.title}
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {movie.release_date}
                  </span>

                  <p className="leading-relaxed mt-2 text-gray-200">
                    {movie.overview !== ""
                      ? movie.overview.slice(0, 260).concat("...")
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieKeyList;
