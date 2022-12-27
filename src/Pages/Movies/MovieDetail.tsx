import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { MovieDetails } from "../../types/movieDetails";
import MovieCredit from "./MovieCredit";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<MovieDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR`
    )
      .then((res) => res.data)
      .then((data) => setMovieDetail(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="flex px-4 py-8 md:py-6 flex-col md:flex-row text-slate-900 dark:text-slate-100 items-center  dark:bg-slate-900">
        <img        
          src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}
          alt={`${movieDetail?.title}`}
          className="w-60 h-96 opacity-100 z-10 absolute mx-4 object-cover object-center rounded-md"
          loading="lazy"
        />

        <figure className="w-full opacity-30 ">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`}
            className="w-full h-[460px] object-top object-cover rounded-lg"
            alt={`${movieDetail?.backdrop_path}`}
          />
        </figure>
        <div className="w-[650px] p-4 space-y-4 absolute left-72 ">
          <h1 className="md:text-5xl text-4xl font-semibold leading-tight">
            {movieDetail?.title}
            <span className="text-lg">
              ({movieDetail?.release_date.slice(0, 4)})
            </span>
          </h1>
          <p className="text-slate-600">{movieDetail?.overview}</p>
          <p className="text-sm text-slate-600">
            {movieDetail?.genres.map((genre) => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
        </div>
      </div>

      <MovieCredit id={id} />
    </>
  );
}

export default MovieDetail;
