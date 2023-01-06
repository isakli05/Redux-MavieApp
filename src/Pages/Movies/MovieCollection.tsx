import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  const image = "https://image.tmdb.org/t/p/original";

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
              src={`https://image.tmdb.org/t/p/original${movieCollect?.poster_path}`}
              alt={`${movieCollect?.name}`}
              className="w-60 h-96 opacity-100 z-10 absolute mx-4 object-cover object-center rounded-md"
            />

            <figure className="w-full opacity-30 ">
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/original/${movieCollect?.backdrop_path}`}
                className="w-full h-[460px] object-top object-cover rounded-lg"
                alt={`${movieCollect?.backdrop_path}`}
              />
            </figure>
            <div className="w-max p-4 space-y-8 absolute left-72">
              <h1 className="text-3xl  font-semibold leading-tight">
                {movieCollect?.name}
                <p className="text-sm font-light">
                  {" "}
                  {movieDetail?.genres.map((genre) => (
                    <span key={genre.id}>{genre.name} </span>
                  ))}
                </p>
              </h1>
              <h2 className="text-2xl font-semibold leading-tight">
                Özet
                <p className="w-[760px] text-sm text-slate-200">
                  {movieCollect?.overview}
                </p>
              </h2>
              <h4 className="text-1xl font-semibold">
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

          <div className="bg-slate-100 py-8  dark:bg-slate-900 dark:text-slate-100 text-slate-900 px-4">
            <div className="py-8">
              <div className="text-left">
                <h2 className="text-3xl font-medium">Öne Çıkan Kadro</h2>
              </div>
              <ul className="grid md:grid-cols-4 gap-5 mt-2">
                {movieCredits?.cast.slice(0, 13).map((cast) => (
                  <Link to={`/person/${cast.id}`}>
                    <li
                      key={cast.id}
                      className=" flex bg-white dark:bg-transparent relative rounded-lg dark:border dark:border-slate-500"
                    >
                      <img
                        className="w-14 h-16 rounded-sm object-cover object-top"
                        src={`${
                          cast?.profile_path === null
                            ? "/public/assets/nullUser.svg"
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
                <h2 className="text-3xl font-medium">Öne Çıkan Ekip</h2>
              </div>
              <ul className="grid md:grid-cols-4 gap-5 mt-2">
                {movieCredits?.crew.slice(0, 6).map((crew) => (
                  <Link to={`/person/${crew.id}`}>
                    <li
                      key={crew.id}
                      className=" flex bg-white dark:bg-transparent relative rounded-lg dark:border dark:border-slate-500"
                    >
                      <img
                        className="w-14 h-16 rounded-sm object-cover object-top"
                        src={`${
                          crew?.profile_path === null
                            ? "/public/assets/nullUser.svg"
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
                <h2 className="text-3xl font-medium">{movieCollect?.parts.length} Movies</h2>
              </div>
              <ul className="grid md:grid-cols-1 gap-5 mt-2">
                {movieCollect?.parts.map((movie) => (
                   <Link to={`/movie/${movie.id}-${movie.original_title.toLocaleLowerCase().replaceAll(".","-").replaceAll(",","-").replaceAll(" ","-").replaceAll("--","-").replace(":","").split(",",1)}`}>
                    <li
                      key={movie.id}
                      className=" flex bg-white dark:bg-transparent relative rounded-lg dark:border dark:border-slate-500"
                    >
                      <img
                        className="w-28 h-38 rounded-sm object-cover object-top"
                        src={`${
                          movie?.poster_path === null
                            ? "/public/assets/nullUser.svg"
                            : `${image}${movie?.poster_path}`
                        }`}
                        alt={`${movie?.original_title}`}
                      />
                      <div className="flex flex-col justify-center ">
                        <p className="text-2xl text-slate-100 ml-3 font-semibold">
                          {movie.original_title}
                        </p>
                          <span className="text-xs ml-3">{movie.release_date}</span>
                        <p className="text-md ml-3 mt-5 text-slate-500">
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
