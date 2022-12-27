import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieCredits } from "../../types/movieCredits";
import MovieBanner from "./MovieBanner";

function MovieCast() {
  const { id } = useParams<{ id: string }>();
  const [movieCredit, setMovieCredit] = useState<MovieCredits>();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR`
    )
      .then((res) => res.data)
      .then((data) => setMovieCredit(data));
  }, []);
  const image = "https://image.tmdb.org/t/p/original";
  return (
    <>
      <MovieBanner />
      <div className="flex justify-between">
        <div>
          <h3 className="text-3xl text-left ml-16 text-zinc-600 font-semibold">
            Oyuncu Kadrosu{" "}
            <span className="text-2xl font-thin">
              ({movieCredit?.cast.length})
            </span>
          </h3>
          <ul className="space-y-4 ml-16 mt-3">
            {movieCredit?.cast.map((cast) => (
              <li key={cast.id} className="flex items-center gap-3">
                <Link className="flex gap-3" to={`/person/${cast.id}`}>
                  <img
                    className="w-16"
                    src={`${cast?.profile_path===null?'/public/assets/nullUser.svg':`${image}${cast?.profile_path}`}`}
                    alt={cast.name}
                  />
                  <div>
                    <h3 className="font-semibold">{cast.name}</h3>
                    <p>{cast.character}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-3xl text-left ml-16 text-zinc-600 font-semibold">
            Kadro{" "}
            <span className="text-2xl font-thin">
              ({movieCredit?.crew.length})
            </span>
          </h3>
          <ul className="space-y-4 ml-16 mt-3">
            {movieCredit?.crew.map((crew) => (
              <li key={crew.id} className="flex items-center gap-3">
                <Link className="flex gap-3" to={`/person/${crew.id}`}>
                <img
                    className="w-16"
                    src={`${crew?.profile_path===null?'/public/assets/nullUser.svg':`${image}${crew?.profile_path}`}`}
                    alt={crew.name}
                  />
                  <div>
                    <h3 className="font-semibold">{crew.name}</h3>
                    <p>{crew.known_for_department}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MovieCast;
