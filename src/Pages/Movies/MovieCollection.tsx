import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { image } from "../../helper";
import { fetchMovieCollect } from "../../redux/movies/movieCollectSlice";
import { fetchMovieCredits } from "../../redux/movies/movieCreditsSlice";
import { fetchMovieDetail } from "../../redux/movies/movieDetailSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

function MovieCollection() {
  const { coll_id } = useParams();
  const collection_id = coll_id?.split("-")[0];
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.movieCollect.loading);

  const movieCredits = useAppSelector((state) => state.movieCredits.data);
  const movieCollect = useAppSelector((state) => state.movieCollect.data);
  const movieDetail = useAppSelector((state) => state.movieDetail.data);
  const movieId = movieCollect?.parts[0].id;
  

  useEffect(() => {
    window.scrollTo(0, 0)
    if (status === "idle") {
      dispatch(fetchMovieCollect(collection_id!));
    }
    dispatch(fetchMovieCredits(String(movieId)));
    dispatch(fetchMovieDetail(String(movieId)));
  }, [dispatch, status]);

  return (
    <>
      {status === "pending" ? (
        <Loading/>
      ) : (
        <>
          <div className="flex px-4 py-8 md:py-6 flex-col md:flex-row text-slate-900 dark:text-slate-100 items-center  dark:bg-slate-900">
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original${movieCollect?.poster_path}`}
              alt={`${movieCollect?.name}`}
              className="hidden md:block w-60 h-96 opacity-100 z-10 absolute mx-4 object-cover object-center rounded-md"
            />

            <figure className="w-full opacity-30 ">
              <img
                loading="lazy"
                 src={`${image}${movieCollect?.backdrop_path}`}
                className="w-full h-[460px] object-top object-cover rounded-lg"
                alt={`${movieCollect?.backdrop_path}`}
              />
            </figure>
            <div className="lg:w-max p-4 ml-3 md:ml-0 space-y-8 absolute lg:left-72">
              <h1 className="text-3xl text-slate-100  font-semibold leading-tight">
                {movieCollect?.name}
                <p className="text-sm font-light text-slate-300">
                  {" "}
                  {movieDetail?.genres.map((genre) => (
                    <span key={genre.id}>{genre.name} </span>
                  ))}
                </p>
              </h1>
              <h2 className="hidden md:block text-2xl text-slate-100 font-semibold leading-tight">
                Özet
                <p className="hidden md:block w-[760px] text-sm text-slate-200">
                  {movieCollect?.overview}
                </p>
              </h2>
              <h4 className="text-1xl font-semibold text-slate-100">
                Film Sayısı:
                <span className="text-slate-200">
                  {" "}
                  {movieCollect?.parts.length}
                </span>
                <br />
                Kazanç:
                <span className="text-slate-100">
                  {" "}
                  {movieDetail?.revenue === 0
                    ? "Bilinmiyor"
                    : "$" +
                      movieDetail?.revenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        .concat(".00")}
                </span>
              </h4>
            </div>
          </div>

          <div className="py-8 m-3 bg-slate-900 text-slate-100px-4">
            <div className="py-8">
              <div className="text-left">
                <h2 className="text-3xl font-medium text-slate-100">Öne Çıkan Kadro</h2>
              </div>
              <ul className="grid md:grid-cols-4 gap-5 mt-2">
                {movieCredits?.cast.slice(0, 13).map((cast) => (
                  <Link to={`/person/${cast.id}`}>
                    <li
                      key={cast.id}
                      className=" flex bg-slate-900 dark:bg-transparent relative rounded-lg dark:border dark:border-slate-500"
                    >
                      <img
                        className="w-14 h-16 rounded-sm object-cover object-top"
                        src={`${
                          cast?.profile_path === null || cast.profile_path === ""
                            ? "/src/assets/nullUser.svg"
                            : `${image}${cast?.profile_path}`
                        }`}
                        alt={`${cast?.name}`}
                      />
                      <div className="flex flex-col justify-center ">
                        <p className="text-1xl text-slate-100 ml-3 font-medium">
                          {cast.name}
                        </p>
                        <p className="text-sm ml-3 text-slate-500">
                          {cast.character}
                        </p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            <hr />
            <div className="py-8">
              <div className="text-left">
                <h2 className="text-3xl font-medium text-slate-100">Öne Çıkan Ekip</h2>
              </div>
              <ul className="grid md:grid-cols-4 gap-5 mt-2">
                {movieCredits?.crew.slice(0, 6).map((crew) => (
                  <Link to={`/person/${crew.id}`}>
                    <li
                      key={crew.id}
                      className=" flex bg-slate-900 dark:bg-transparent relative rounded-lg dark:border dark:border-slate-500"
                    >
                      <img
                        className="w-14 h-16 rounded-sm object-cover object-top"
                        src={`${
                          crew?.profile_path === null || crew.profile_path === "" 
                            ? "/src/assets/nullUser.svg"
                            : `${image}${crew?.profile_path}`
                        }`}
                        alt={`${crew?.name}`}
                      />
                      <div className="flex flex-col justify-center ">
                        <p className="text-1xl text-slate-100 ml-3 font-medium">
                          {crew.name}
                        </p>
                        <p className="text-sm ml-3 text-slate-500">
                          {crew.department}
                        </p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            <hr />

            <div className="py-8">
              <div className="text-left">
                <h2 className="text-3xl font-medium text-slate-100">{movieCollect?.parts.length} Movies</h2>
              </div>
              <ul className="grid md:grid-cols-1 gap-5 mt-2">
                {movieCollect?.parts.map((movie) => (
                   <Link to={`/movie/${movie.id}-${movie.original_title.toLocaleLowerCase().replaceAll(".","-").replaceAll(",","-").replaceAll(" ","-").replaceAll("--","-").replace(":","").split(",",1)}`}>
                    <li
                      key={movie.id}
                      className="max-w-max flex bg-slate-900 dark:bg-transparent relative rounded-lg dark:border dark:border-slate-500"
                    >
                      <img
                        className="w-28 h-38 rounded-sm object-cover object-top"
                        src={`${
                          movie?.poster_path === null
                            ? "/src/assets/nullUser.svg"
                            : `${image}${movie?.poster_path}`
                        }`}
                        alt={`${movie?.original_title}`}
                      />
                      <div className="flex flex-col justify-center ">
                        <p className="text-2xl text-slate-100 ml-3 font-semibold">
                          {movie.original_title}
                        </p>
                          <span className="text-xs ml-3 text-slate-300">{movie.release_date}</span>
                        <p className="text-md ml-3 mt-5 text-slate-100">
                          {movie.overview.split(" ").slice(0, 60).join(" ")}...
                        </p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>           
          </div>
        </>
      )}
    </>
  );
}

export default MovieCollection;
