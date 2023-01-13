import { useEffect } from "react";
import { Link } from "react-router-dom";
import { image } from "../../helper";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchTvDetail } from "../../redux/tvShows/tvShowsDetailSlice";


function TvSeasonBanner({ tv_id }: { tv_id: string }) {
  const tv_season = useAppSelector((state) => state.tvSeasons.data);  
  const tv_season_detail = useAppSelector((state) => state.tvDetails.data);
  const dispatch =useAppDispatch();
  useEffect(() => {
    dispatch(fetchTvDetail(tv_id));
  }, [])
    console.log(tv_season_detail);
    console.log(tv_season);
    
    
  return (
    <>
      <div className="flex items-center p-5 h-32 my-5 bg-slate-500">
        <div className="flex items-center ml-11">
          <Link to={`/tv/${tv_id}/season/${tv_season?.season_number}`}>
            <img
              loading="lazy"
              className="w-16 mr-2"
              src={`${
                tv_season?.poster_path === null
                  ? "/public/assets/tv_null.svg"
                  : `${image}${tv_season?.poster_path}`
              }`}
              alt={tv_season?.name}
            />
          </Link>
          <div className="ml-2">
            <div className="flex space-x-2">
              <Link to={`/tv/${tv_id}/season/${tv_season?.season_number}`}>
                <h3 className="font-semibold text-3xl text-gray-100 hover:text-gray-300">{tv_season?.name} </h3>
              </Link>
              <h5 className="text-3xl font-thin text-gray-100">
              {tv_season?.air_date?"("+tv_season?.air_date?.slice(0,4)+")":""}
              </h5>
            </div>
            <Link to={`/tv/${tv_id}/seasons`}>
              <span className="text-gray-100 hover:text-slate-300">
                <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Sezon
                Listesine Dön
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b flex justify-between">
        <div className="ml-10">
          {tv_season_detail?.seasons[0].name==="Specials" && tv_season?.season_number! !== 0?
            <Link to={`/tv/${tv_id}/season/${tv_season_detail?.seasons[0].season_number}`}>
              {" "}
              <h3 className="text-slate-300 hover:text-slate-100 text-lg mb-3">
                <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>               
                {tv_season_detail?.seasons[0].name}
                {" "}
              </h3>
            </Link>
          :
          tv_season?.season_number! > 1 ? (
            <Link to={`/tv/${tv_id}/season/${tv_season?.season_number! - 1}`}>
              {" "}
              <h3 className="text-slate-300 hover:text-slate-100 text-lg mb-3">
                <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Sezon{" "}
                {tv_season?.season_number! - 1}
              </h3>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="mr-10 ">
          {tv_season?.season_number!<tv_season_detail?.seasons
          .length!&&tv_season_detail?.seasons[0].name!=="Specials" ? (
            <Link to={`/tv/${tv_id}/season/${tv_season?.season_number! + 1}`}>
              {" "}
              <h3 className="text-slate-300 hover:text-slate-100 text-lg mb-3">
               Sezon{" "}
                {tv_season?.season_number! + 1}
                {" "}
                <i className="fa-solid fa-arrow-right mr-2 text-sm text-slate-300"></i>
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
