import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieCredits } from "../../types/movieCredits";

type MovieCreditsProps = {
  id?: string;
};

function MovieCredit({ id }: MovieCreditsProps) {
  const [movieCredit, setMovieCredit] = useState<MovieCredits>();
  useEffect(() => {
    axios(    
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR`
    )
      .then((res) => res.data)
      .then((data) => setMovieCredit(data));
  }, []);

  return (
    <div className="bg-white py-2 dark:bg-slate-900 dark:text-slate-100 text-slate-900">
      <div className="p-4">
        <h3 className="text-3xl text-left text-zinc-600 font-semibold">
          Başrol Oyuncuları
        </h3>
        <ul className="flex mt-8 overflow-scroll overflow-y-hidden">
          {movieCredit?.cast
            .map((cast) => (
              <Link key={cast.id} to={`/person/${cast.id}`}>
              <li className="flex flex-col shadow rounded-lg mb-3">
                <figure className="flex-col w-40  space-y-2">
                  <img
                    className="h-44  rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${cast?.profile_path}`}
                    alt={`${cast?.name}`}
                  />
                  <div className="flex flex-col  w-36 space-y-1">
                    <p className="font-semibold dark:text-slate-100 text-slate-900">
                      {cast.original_name}
                    </p>
                    <span className="text-sm font-light dark:text-slate-400 text-slate-500">
                      {cast.character}
                    </span>
                  </div>
                </figure>
              </li>
              </Link>
            ))
            .slice(0, 9)}
          <Link to={`/movie/${id}/cast`}>
            <li className="flex flex-col text-center h-44 items-center justify-center hover:scale-125 duration-200">
              Tümünü Gör<i className="fa-solid fa-arrow-right"></i>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
export default MovieCredit;
