import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { image } from "../../helper";
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
    <div className="flex items-center p-2 sm:p-5 h-32 my-5 bg-slate-600">
      <Link to={`/movie/${id}`}>
        <div className="flex items-center md:ml-12">
          <img
            loading="lazy"
            className="w-16 mr-2"
             src={`${image}${movie?.poster_path}`}
            alt={movie?.title}
          />

          <div className="ml-2">
            <h3 className="font-semibold text-2xl md:text-3xl text-gray-100 hover:text-gray-300">
              {movie?.original_title}{" "}
              <span className="md:text-3xl font-thin">
                ({movie?.release_date.slice(0, 4)})
              </span>
            </h3>
            <span className="text-gray-100 hover:text-slate-300">
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
