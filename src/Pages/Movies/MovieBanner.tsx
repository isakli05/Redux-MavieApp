import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieDetails } from "../../types/movieDetails";

function MovieBanner() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails>();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR`
    )
      .then((res) => res.data)
      .then((data) => setMovie(data));
  }, [id]);
  return (
    <div className="flex items-center p-5 h-32 my-5 bg-slate-600">
      <Link to={`/movie/${id}`}>
        <div className="flex items-center ml-12">
          <img
            className="w-16 mr-2"
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie?.title}
          />
        
        <div>
          <h3 className="font-semibold text-3xl">
            {movie?.original_title}{" "}
            <span className="text-3xl font-thin">
              ({movie?.release_date.slice(0, 4)})
            </span>
          </h3>
          <span><i className="fa-solid fa-arrow-left mr-2"></i>Sayfaya Dön</span>
        </div></div>
      </Link>
    </div>
  );
}

export default MovieBanner;
