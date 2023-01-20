import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { air_date, image } from "../../helper";
import { Movies } from "../../types/Movies";
import { Tvs } from "../../types/tvs";

function Free() {
  const [type, setType] = useState("movie");
  const [watch, setWacth] = useState<Movies>();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number, type: string) => {
    setType(type);
    setActiveIndex(index);
  };
  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/discover/${type}?api_key=a005a803cdec9237f52c2801d1f28661&watch_region=US&with_watch_monetization_types=free
        `
    )
      .then((res) => res.data)
      .then((data) => setWacth(data));
  }, [type]);
  return (
    <div>
      <div className="flex m-5 mt-20">
        <h3 className="mr-6 text-2xl text-left text-zinc-300 font-semibold">
          Free To Watch
        </h3>
        <div className="flex-col rounded-xl shadow-sm" role="group">
          <button
            onClick={() => handleClick(0, "movie")}
            className={`
        ${activeIndex === 0 ? "bg-cyan-400 transition duration-500 ease-linear" : ""}
        px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-xl  dark:bg-gray-700 dark:border-gray-600 dark:text-white `}
          >
            Movies
          </button>

          <button
            onClick={() => handleClick(1, "tv")}
            className={`
        ${activeIndex === 1 ? "bg-cyan-400 transition duration-500 ease-linear" : ""}
        px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-xl  dark:bg-gray-700 dark:border-gray-600 dark:text-white `}
          >
            Tv
          </button>
        </div>
      </div>

      <div className="m-5">
        <ul className="flex overflow-scroll overflow-y-hidden">
          {watch?.results.map((movie) => (
            <Link
              key={movie.id}
              to={`/${type}/${movie.id}-${
                type === "tv"
                  ? movie.original_name
                  : movie.original_title
                      ?.toLowerCase()
                      .replaceAll(".", "-")
                      .replaceAll(",", "-")
                      .replaceAll(" ", "-")
                      .replaceAll("--", "-")
                      .replace(":", "")
                      .split(",", 1)
              }`}
            >
              <li className="flex flex-col w-40 gap-x-5 shadow rounded-lg mb-2">
                <figure className="flex-col space-y-2">
                  <img
                    className="h-56 w-36 object-cover object-top rounded-md"
                    src={`${
                      movie?.poster_path === null
                        ? "/public/assets/nullUser.svg"
                        : `${image}${movie?.poster_path}`
                    }`}
                    alt=""
                  />

                  <p className="mt-2 w-28  text-slate-100  text-md font-l">
                    {type === "movie" ? movie?.title : movie?.name}
                  </p>
                  <p className="mt-2 w-28  text-slate-700 dark:text-slate-400 text-md font-l">
                    {air_date(movie?.release_date || movie?.first_air_date)}
                  </p>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Free;
