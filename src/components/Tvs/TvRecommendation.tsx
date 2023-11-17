import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { image } from "../../helper";
import { Tvs } from "../../types/tvs";

type TvRecommendationProps = {
  id?: string;
  name?: string;
};

function TvRecommendation({ id,name }: TvRecommendationProps) {
  const [tvRecom, setTvRecom] = useState<Tvs>();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=f23d45e024dfa841dbe4c5648bd1a790&language=en-US&page=1`
    )
      .then((res) => res.data)
      .then((data) => setTvRecom(data));
  }, []);

  
  
  return (
    <div>
      <h3 className="mt-6 mb-4 text-2xl text-left text-zinc-300 font-semibold">
        Tavsiyeler
        
      </h3>
      <ul className="flex  overflow-scroll overflow-y-hidden">
        {tvRecom?.results.length===0?`We don't have enough data to suggest any TV shows based on ${name}. You can help by rating TV shows you've seen.`: tvRecom?.results.map((tv) => (
          <Link
            key={tv.id}
            to={`/tv/${tv.id}-${tv.original_name
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
                  className="h-36 w-64 object-cover object-center rounded-md"
                  src={`${
                    tv?.poster_path === null
                      ? "/assets/tv_null.svg"
                      : `${image}${tv?.poster_path}`
                  }`}
                  alt=""
                />

                <p className="mt-2 w-60 truncate text-slate-300 dark:text-slate-400 text-md font-l">
                  {tv?.name}
                </p>
              </figure>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default TvRecommendation;
