import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { air_date, image } from "../../helper";

import { Movies } from "../../types/Movies";

function Popular() {
  const [type, setType] = useState("with_watch_monetization_types=flatrate");
  const [popular, setPopular] = useState<Movies>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const handleClick = (index: number, type: string) => {
    setType(type);
    setActiveIndex(index);
  };
  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=a005a803cdec9237f52c2801d1f28661&watch_region=US&${type}
      `
    )
      .then((res) => res.data)
      .then((data) => setPopular(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div>
      <div className="flex m-5 ">
        <h3 className="mr-3 lg:mr-6 lg:text-2xl text-sm md:text-1xl text-left text-zinc-300 font-semibold w-14 lg:w-max">
          What's Popular
        </h3>
        <div
          className="flex-col lg:text-2xl rounded-xl shadow-sm "
          role="group"
        >
          <button
            onClick={() =>
              handleClick(0, "with_watch_monetization_types=flatrate")
            }
            className={`
            ${
              activeIndex === 0
                ? "bg-cyan-400 transition duration-500 ease-linear"
                : "bg-white"
            }
            p-2 md:px-4 md:py-2 text-xs lg:text-sm font-medium  text-gray-900  border border-gray-200 rounded-l-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            Streaming
          </button>
          <button
            onClick={() => handleClick(2, "with_watch_monetization_types=rent")}
            className={`
            ${
              activeIndex === 2
                ? "bg-cyan-400 transition duration-500 ease-linear"
                : "bg-white"
            }
            p-2 md:px-4 md:py-2 text-xs lg:text-sm font-medium  text-gray-900  border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            For Rent
          </button>
          <button
            onClick={() => handleClick(3, "with_watch_monetization_type=3|2")}
            className={`
            ${
              activeIndex === 3
                ? "bg-cyan-400 transition duration-500 ease-linear"
                : "bg-white"
            }
            p-2 md:px-4 md:py-2 text-xs lg:text-sm font-medium  text-gray-900  border border-gray-200 rounded-r-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            In Theaters
          </button>
        </div>
      </div>

      <div className="m-5">
        <ul className="flex overflow-scroll overflow-y-hidden">
          {popular?.results.map((movie) => (
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
              <li className="flex flex-col w-40 gap-x-5 shadow rounded-lg mb-2">
                <figure className="flex-col space-y-2">
                  <img
                    loading="eager"
                    className="h-56 w-36 object-cover object-top rounded-md"
                    src={`${
                      movie?.poster_path === null
                        ? "/assets/nullUser.svg"
                        : `${image}${movie?.poster_path}`
                    }`}
                    alt=""
                  />

                  <p className="mt-2 w-28  text-gray-100 text-md font-l">
                    {movie?.title}
                  </p>
                  <p className="mt-2 w-28  text-slate-700 dark:text-slate-400 text-md font-l">
                    {air_date(movie?.release_date)}
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

export default Popular;
