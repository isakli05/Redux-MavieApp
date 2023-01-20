import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieCollect } from "../../redux/movies/movieCollectSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

type MovieColletionProps = {
  id?: string;
  title?: string;
};

function MovieColletionBackDrop({ id, title }: MovieColletionProps) {
  const movieCollect = useAppSelector((state) => state.movieCollect.data);
  const status = useAppSelector((state) => state.movieCollect.loading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovieCollect(id!));
  }, [id]);

  return (
    <div className="mt-10 relative">
      <figure className="w-full opacity-30">
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original/${movieCollect?.backdrop_path}`}
          className="w-full h-96 md:h-64 object-top object-cover rounded-lg"
          alt={`${movieCollect?.name}`}
        />
      </figure>

      <div className="w-full p-4 absolute top-1/4">
        <h1 className="text-1xl lg:text-3xl font-semibold leading-tight">
          Part of the {movieCollect?.name}
        </h1>
        <h1 className="text-slate-300 mb-6 w-11/12">
          {movieCollect?.parts.map((part) => (
            <span key={part.id}>{part.title} </span>
          ))}
          <span>içerir.</span>
        </h1>
        <Link
          to={`/collection/${movieCollect?.id}-${
            title
              ?.toLocaleLowerCase()
              .replaceAll(" ", "-")
              .slice(0, title.indexOf(":")) + "-collection"
          }`}
          className="bg-slate-600 hover:bg-slate-800 px-6 py-2 lg:py-3 font-semibold text-white text-sm lg:text-md  rounded-full"
        >
          KOLEKSİYONU GÖRÜNTÜLE
        </Link>
      </div>
    </div>
  );
}
export default MovieColletionBackDrop;
