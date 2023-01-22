import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieCredits } from "../../types/movieCredits";
import MovieBanner from "../../components/Movies/MovieBanner";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchMovieCredits } from "../../redux/movies/movieCreditsSlice";
import { image } from "../../helper";
import Loading from "../../components/Loading";

function MovieCast() {
  const { id } = useParams<{ id: string }>();
  const movieCredit = useAppSelector((state) => state.movieCredits.data);
  const status = useAppSelector((state) => state.movieCredits.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovieCredits(id));
  }, []);
  
  return (
    <>
      {status==="pending" ? (
        <Loading/>
      ) : (
        <>
    <div className="dark:bg-slate-900">
      <MovieBanner />
      <div className="flex">
        <div className="w-3/6">
          <h3 className="text-2xl md:text-3xl text-left ml-2 lg:ml-16 text-zinc-300 font-medium md:font-semibold">
            Oyuncu Kadrosu{" "}
            <span className="hidden sm:block text-2xl font-thin">
              ({movieCredit?.cast.length})
            </span>
          </h3>
          <ul className="space-y-4 ml-2 lg:ml-16 mt-3">
            {movieCredit?.cast.map((cast,index) => (
              <li key={index} className="flex items-center gap-3">
                <Link className="lg:flex gap-3" to={`/person/${cast.id}`}>
                  <img
                    loading="lazy"
                    className="w-16"
                    src={`${
                      cast?.profile_path === null
                        ? "/src/assets/nullUser.svg"
                        : `${image}${cast?.profile_path}`
                    }`}
                    alt={cast.name}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-100">{cast.name}</h3>
                    <p className="text-gray-100">{cast.character}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/6">
          <h3 className="text-2xl md:text-3xl text-left  lg:ml-16 text-zinc-300 font-medium md:font-semibold ml-16">
            Kadro{" "}
            <span className="hidden sm:block text-2xl font-thin">
              ({movieCredit?.crew.length})
            </span>
          </h3>
          <ul className="space-y-4 ml-16 mt-3">
            {movieCredit?.crew.map((crew,index) => (
              <li key={index} className="flex items-center gap-3">
                <Link className="lg:flex gap-3" to={`/person/${crew.id}`}>
                  <img
                    loading="lazy"
                    className="w-16"
                    src={`${
                      crew?.profile_path === null
                        ? "/src/assets/nullUser.svg"
                        : `${image}${crew?.profile_path}`
                    }`}
                    alt={crew.name}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-100">{crew.name}</h3>
                    <p className="text-gray-100">{crew.known_for_department}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
      )}
    </>
  );
}

export default MovieCast;