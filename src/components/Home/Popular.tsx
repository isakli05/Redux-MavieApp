import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { air_date, image } from "../../helper";

import { Movies } from "../../types/Movies";

function Popular() {
  const [type, setType] = useState("with_watch_monetization_types=flatrate");
  const [popular, setPopular] = useState<Movies>();
  const [activeIndex, setActiveIndex] = useState(0);
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
      .then((data) => setPopular(data));
  }, [type]);


  return (
    <div>
      <div className="flex m-5">
        <h3 className="mr-6 text-2xl text-left text-zinc-300 font-semibold">
          What's Popular
        </h3>
        <div className="flex-col rounded-xl shadow-sm" role="group">
          <button
          onClick={() => handleClick(0, "with_watch_monetization_types=flatrate")}            
            className={`
            ${activeIndex === 0 ? "bg-red-500" : ""}
            px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            Streaming
          </button>
          
          <button
            onClick={() => handleClick(2, "with_watch_monetization_types=rent")} 
            className={`
            ${activeIndex === 2 ? "bg-red-500" : ""}
            px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            For Rent
          </button>
          <button
            onClick={() => handleClick(3, "with_watch_monetization_type=3|2")} 
            className={`
            ${activeIndex === 3 ? "bg-red-500" : ""}
            px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
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
                    className="h-56 w-36 object-cover object-top rounded-md"
                    src={`${
                      movie?.poster_path === null
                        ? "/public/assets/nullUser.svg"
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
