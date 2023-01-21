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
import Loading from "../../components/Loading";
import { image } from "../../helper";


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
        <Loading/>
      ) : (
        <>
          <div className="flex px-4 py-8 md:py-6 flex-col md:flex-row text-slate-900 dark:text-slate-100 items-center bg-slate-900">
            <img
              loading="lazy"
              src={`${
                movieDetail?.poster_path === ""?
                "": 
                `${image}${movieDetail?.poster_path}`
              }`}
              alt={`${movieDetail?.title===null?"":""}`}
              className="hidden md:block w-40 h-60 left-2 top-36 md:left-3 lg:w-60 lg:h-96 opacity-100 z-10 absolute mx-4 object-cover object-center rounded-md"
            />

            <figure className="w-full opacity-30 ">
              <img
                loading="lazy"
                 src={`${image}${movieDetail?.backdrop_path}`}
                className="w-full h-[460px] object-top object-cover rounded-lg"
                alt={`${movieDetail?.backdrop_path}`}
              />
            </figure>
            <div className="lg:w-max p-4 space-y-4 absolute left-4 w-4/5 lg:left-72">
              <h1 className="text-2xl text-zinc-100 font-semibold leading-tight">
                {movieDetail?.title}
                <span className="text-3xl font-light">
                  {" "}
                  ({movieDetail?.release_date.slice(0, 4)})
                </span>
              </h1>
              <p className="hidden md:block w-[700px] text-slate-300">
                {movieDetail?.overview}
              </p>
              <p className="text-sm text-slate-200">
                {movieDetail?.genres.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </p>
            </div>
          </div>

          <div className="px-4 space-y-4 bg-slate-900 text-gray-900 dark:text-gray-100 ">
            <div className="lg:flex lg:gap-x-8">
              <article className="w-12/12 lg:w-9/12 dark:border-gray-700">
                <MovieCredit id={id} />
                <Link to={`/movie/${movie_id}/cast`}>
                  <li className="flex flex-col font-semibold text-1xl text-left my-6 hover:text-slate-400 text-slate-300 duration-200 ">
                    Tüm Oyuncular ve Ekip
                  </li>
                </Link>
                {movieDetail?.belongs_to_collection !== null ? (
                  <>
                  <hr />
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

              <aside className="bg-slate-900 text-zinc-300 lg:w-3/12 divider grid grid-cols-1 gap-1">
                <article className="w-full mt-4 grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Orijinal Başlık
                    </h3>
                    <p className="text-slate-300 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.original_title}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Durum
                    </h3>
                    <p className="text-slate-300 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.status === "Released"
                        ? "Vizyonda"
                        : "Vizyonda Değil"}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Orijinal Dili
                    </h3>
                    <p className="text-slate-300 dark:text-slate-400 font-light text-sm">
                      {movieDetail?.original_language === "en"
                        ? "İngilizce"
                        : "Türkçe"}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Bütçe
                    </h3>
                    <p className="text-slate-300 dark:text-slate-400 font-light text-sm">
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
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Kazanç
                    </h3>
                    <p className="text-slate-300 dark:text-slate-400 font-light text-sm">
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
                <article className="w-full mt-4 grid grid-cols-1 pb-4">
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
