import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { image } from "../../helper";
import { fetchMovieCredits } from "../../redux/movies/movieCreditsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MovieCredits } from "../../types/movieCredits";

type MovieCreditsProps = {
  id?: string;
};

function MovieCredit({ id }: MovieCreditsProps) {
  const dispatch = useAppDispatch();
  const movieCredits = useAppSelector((state) => state.movieCredits.data);
  
  useEffect(() => {
    dispatch(fetchMovieCredits(id!));
  }, []);
 
 
  
  return (
    <div className="bg-white  dark:bg-slate-900 dark:text-slate-100 text-slate-900 py-2">      
        <h3 className="text-3xl text-left text-zinc-300 font-semibold">
          Başrol Oyuncuları
        </h3>
        
        <ul className="flex mt-3  overflow-scroll overflow-y-hidden">
          {movieCredits?.cast
            .map((cast) => (
              <li key={cast.id} className="flex flex-col w-[140px]  shadow rounded-lg m-2">
                <Link to={`/person/${cast.id}`}>
                  <figure className="flex-col space-y-2">
                    <img
                      loading="lazy"
                      className="h-44 w-[140px] rounded-t-lg rounded-tr-lg"
                      src={`${
                        cast?.profile_path === null
                          ? "/public/assets/nullUser.svg"
                          : `${image}${cast?.profile_path}`
                      }`}
                      alt={`${cast?.name}`}
                    />
                    <div className="flex flex-col pl-1 pb-3  ">
                      <p className="font-semibold  dark:text-slate-100 text-slate-900">
                        {cast.original_name}
                      </p>
                      <span className="text-sm w-[140px] font-light dark:text-slate-400 text-slate-500">
                        {cast.character}
                      </span>
                    </div>
                  </figure>
              </Link>
                </li>
            ))
            .slice(0, 9)}
          <Link to={`/movie/${id}/cast`}>
            <li className="flex flex-col text-center h-44 items-center justify-center hover:text-slate-400 duration-200 ">
              Tümünü Gör<i className="fa-solid fa-arrow-right"></i>
            </li>
          </Link>
        </ul>
        
    </div>
  );
}
export default MovieCredit;
