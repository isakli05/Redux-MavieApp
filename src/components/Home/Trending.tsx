import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { air_date, image } from "../../helper";
import { Movies } from "../../types/Movies";
import { Tvs } from "../../types/tvs";

function Trending() {
  const [type, setType] = useState("day");
  const [trend, setTrending] = useState<Movies>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [watchType, setWatchType] = useState("")
  const handleClick = (index: number, type: string) => {
    setType(type);
    setActiveIndex(index);
  };
  useEffect(() => {
    axios(
      ` https://api.themoviedb.org/3/trending/all/${type}?api_key=a005a803cdec9237f52c2801d1f28661`
    )
      .then((res) => res.data)
      .then((data) => setTrending(data));
        
  }, [type]);
  return (
    <div>
      <div className="flex m-5 mt-20">
        <h3 className="mr-6 text-2xl text-left text-zinc-300 font-semibold">
          Trending
        </h3>
        <div className="flex-col rounded-xl shadow-sm" role="group">
          <button
            onClick={() => handleClick(0, "day")}
            className={`
        ${activeIndex === 0 ? "bg-cyan-400 transition duration-500 ease-linear" : ""}
        px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-xl  dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            Today
          </button>

          <button
            onClick={() => handleClick(1, "week")}
            className={`
        ${activeIndex === 1 ? "bg-cyan-400 transition duration-500 ease-linear" : ""}
        px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-xl  dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="m-5">
        <ul className="flex overflow-scroll overflow-y-hidden">
          {trend?.results.map((movie) => (
            <Link
              key={movie.id}
              to={`/${movie.media_type}/${movie.id}`}
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

                  <p className="mt-2 w-28  text-slate-100  text-md font-l">
                    {movie?.title || movie?.name}
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

export default Trending;
