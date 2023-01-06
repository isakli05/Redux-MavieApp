import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetail } from "../../redux/movies/movieDetailSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MovieDetails } from "../../types/movieDetails";

function MovieBanner() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movieDetail.data);
  useEffect(() => {   
    dispatch(fetchMovieDetail(id));
  }, [id]);
  return (
    <div className="flex items-center p-5 h-32 my-5 bg-slate-600">
      <Link to={`/movie/${id}`}>
        <div className="flex items-center ml-12">
          <img
            loading="lazy"
            className="w-16 mr-2"
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
          />

          <div className="ml-2">
            <h3 className="font-semibold text-3xl">
              {movie?.original_title}{" "}
              <span className="text-3xl font-thin">
                ({movie?.release_date.slice(0, 4)})
              </span>
            </h3>
            <span className="text-slate-700">
              <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Sayfaya
              Dön
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieBanner;
