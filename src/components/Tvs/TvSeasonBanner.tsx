import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchTvDetail } from "../../redux/tvShows/tvShowsDetailSlice";


function TvSeasonBanner({ tv_id }: { tv_id: string }) {
  const tv_season = useAppSelector((state) => state.tvSeasons.data);  
  const tv_season_length = useAppSelector((state) => state.tvDetails.data?.seasons.length);
  const dispatch =useAppDispatch();
  useEffect(() => {
    dispatch(fetchTvDetail(tv_id));
  }, [])
    
  return (
    <>
      <div className="flex items-center p-5 h-32 my-5 bg-slate-600">
        <div className="flex items-center ml-11">
          <Link to={`/tv/${tv_id}/season/${tv_season?.season_number}`}>
            <img
              loading="lazy"
              className="w-16 mr-2"
              src={`https://image.tmdb.org/t/p/original/${tv_season?.poster_path}`}
              alt={tv_season?.name}
            />
          </Link>
          <div className="ml-2">
            <div className="flex space-x-2">
              <Link to={`/tv/${tv_id}/season/${tv_season?.season_number}`}>
                <h3 className="font-semibold text-3xl hover:text-slate-300">{tv_season?.name} </h3>
              </Link>
              <h5 className="text-3xl font-thin">
                ({tv_season?.air_date.slice(0, 4)})
              </h5>
            </div>
            <Link to={`/tv/${tv_id}/seasons`}>
              <span className="text-slate-700 hover:text-slate-300">
                <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Sezon
                Listesine Dön
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b flex justify-between">
        <div className="ml-10">
          {tv_season?.season_number! > 1 ? (
            <Link to={`/tv/${tv_id}/season/${tv_season?.season_number! - 1}`}>
              {" "}
              <h3 className="text-slate-700 text-lg mb-3">
                <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Sezon{" "}
                {tv_season?.season_number! - 1}
              </h3>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="mr-10">
          {tv_season?.season_number!<tv_season_length! ? (
            <Link to={`/tv/${tv_id}/season/${tv_season?.season_number! + 1}`}>
              {" "}
              <h3 className="text-slate-700 text-lg mb-3">
               Sezon{" "}
                {tv_season?.season_number! + 1}
                {" "}
                <i className="fa-solid fa-arrow-right mr-2 text-sm "></i>
              </h3>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default TvSeasonBanner;
