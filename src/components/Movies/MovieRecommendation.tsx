import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movies } from "../../types/Movies";

type MovieRecommendationProps = {
  id?: string;
};

function MovieRecommendation({ id }: MovieRecommendationProps) {
  const [movieRecom, setMovieRecom] = useState<Movies>();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a005a803cdec9237f52c2801d1f28661&language=en-US&page=1`
    )
      .then((res) => res.data)
      .then((data) => setMovieRecom(data));
  }, []);

  const image = "https://image.tmdb.org/t/p/original";
  return (
    <div>
      <h3 className="mt-6 mb-4 text-2xl text-left text-zinc-600 font-semibold">
        Tavsiyeler
      </h3>
      <ul className="flex gap-4 overflow-scroll overflow-y-hidden">
        {movieRecom?.results.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}-${movie.original_title
              .toLocaleLowerCase()
              .replaceAll(".", "-")
              .replaceAll(",", "-")
              .replaceAll(" ", "-")
              .replaceAll("--", "-")
              .replace(":", "")
              .split(",", 1)}`}
          >
            <li className="flex flex-col w-72 shadow rounded-lg mb-2">
              <figure className="flex-col space-y-2">
                <img
                  className="h-40 w-72 object-cover object-center rounded-md"
                  src={`${
                    movie?.poster_path === null
                      ? "/public/assets/nullUser.svg"
                      : `${image}${movie?.poster_path}`
                  }`}
                  alt=""
                />

                <p className="mt-2 w-70 truncate text-slate-700 dark:text-slate-400 text-md font-l">
                  {movie?.title}
                </p>
              </figure>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default MovieRecommendation;
