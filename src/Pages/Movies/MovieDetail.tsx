import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieCollect } from "../../redux/movies/movieCollectSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { MovieCollect } from "../../types/movieCollect";
import { MovieDetails } from "../../types/movieDetails";
import MovieColletionBackDrop from "../../components/Movies/MovieColletionBackDrop";
import MovieCredit from "../../components/Movies/MovieCredit";
import MovieLabel from "../../components/Movies/MovieLabel";
import MovieRecommendation from "../../components/Movies/MovieRecommendation";
import { fetchMovieDetail } from "../../redux/movies/movieDetailSlice";


function MovieDetail() {
  const { id } = useParams();
  const movie_id = id?.split("-")[0];

  const dispatch = useAppDispatch();
  const movieDetail = useAppSelector((state) => state.movieDetail.data);
  const status = useAppSelector((state) => state.movieDetail.loading);
  useEffect(() => {
    dispatch(fetchMovieDetail(movie_id!));   
  }, [dispatch, movie_id]);



  return (
    <>
      {status === "pending" ? (
        <div className="flex  flex-col md:flex-row items-center justify-center px-6 py-4 space-y-2 text-center">
          <button
            type="button"
            className="bg-indigo-500 w-56 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            disabled
          >
            <div role="status">
              <svg
                aria-hidden="true"
                className="m-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </button>
        </div>
      ) : (
        <>
          <div className="flex px-4 py-8 md:py-6 flex-col md:flex-row text-slate-900 dark:text-slate-100 items-center  dark:bg-slate-900">
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}
              alt={`${movieDetail?.title}`}
              className="w-60 h-96 opacity-100 z-10 absolute mx-4 object-cover object-center rounded-md"
            />

            <figure className="w-full opacity-30 ">
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`}
                className="w-full h-[460px] object-top object-cover rounded-lg"
                alt={`${movieDetail?.backdrop_path}`}
              />
            </figure>
            <div className="w-max p-4 space-y-4 absolute left-72">
              <h1 className="text-2xl font-semibold leading-tight">
                {movieDetail?.title}
                <span className="text-3xl font-light">
                  {" "}
                  ({movieDetail?.release_date.slice(0, 4)})
                </span>
              </h1>
              <p className="w-[700px] text-slate-300">
                {movieDetail?.overview}
              </p>
              <p className="text-sm text-slate-200">
                {movieDetail?.genres.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </p>
            </div>
          </div>

          <div className="px-4  space-y-4 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 ">
            <div className="lg:flex gap-x-8">
              <article className="w-9/12 dark:border-gray-700">
                <MovieCredit id={id} />
                {movieDetail?.belongs_to_collection !== null ? (
                  <>
                    <MovieColletionBackDrop
                      title={movieDetail?.original_title}
                      id={movieDetail?.belongs_to_collection.id}
                    />
                  </>
                ) : (
                  <></>
                )}               
                
              <MovieRecommendation id={id} />
              </article>

              <aside className="w-3/12 divider grid gap-1">
                <article className="w-full mt-4 grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Orijinal Başlık
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.original_title}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Durum
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.status === "Released"
                        ? "Vizyonda"
                        : "Vizyonda Değil"}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Orijinal Dili
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.original_language === "en"
                        ? "İngilizce"
                        : "Türkçe"}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Bütçe
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.budget === 0
                        ? "Bilinmiyor"
                        : "$" +
                          movieDetail?.budget
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .concat(".00")}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Kazanç
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.revenue === 0
                        ? "Bilinmiyor"
                        : "$" +
                          movieDetail?.revenue
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .concat(".00")}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <MovieLabel />
                </article>
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetail;
