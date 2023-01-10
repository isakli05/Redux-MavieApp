import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TvSeasonBanner from "../../components/Tvs/TvSeasonBanner";
import { air_date, timeConvert } from "../../helper";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchTvSeasons } from "../../redux/tvShows/tvSeasonsSlice";

type TvSeasonsProps = {
  tv_id?: string;
  season_number?: string;
};

function TvSeasonDetail() {
  const { tv_id, season_number } = useParams<TvSeasonsProps>();
  const season_episodes = useAppSelector((state) => state.tvSeasons.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTvSeasons({ tv_id, season_number }));
    window.scrollTo(0, 0);
  }, [tv_id, season_number, dispatch]);

  

 

  console.log(season_episodes);
  return (
    <div className="mb-5">
      <TvSeasonBanner tv_id={tv_id!} />
      <div className="w-full">
        <h1 className="flex mt-10 text-2xl ml-10 font-medium leading-tight">
          <span className="text-white">
            Bölümler {season_episodes?.episodes?.length}
          </span>
        </h1>
      </div>
      <div className="text-gray-600 body-font overflow-hidden">
        <div className="pb-6 mx-10">
          <div className="">
            {season_episodes?.episodes?.map((episodes) => (
              <div
                key={episodes.id}
                className="py-3 flex flex-wrap md:flex-nowrap"
              >
                <div className="flex-shrink-0 flex flex-col ">
                  {/* <Link to={`/tv/${tv_id}/season/${season_number}/episode/${episodes.episode_number}`}> */}
                    <img
                      loading="lazy"
                      className="h-36 rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${episodes?.still_path}`}
                      alt={`${episodes?.name}`}
                    />
                  {/* </Link> */}
                </div>
                <div className="md:flex-grow ml-5">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-medium text-gray-900 title-font">
                      {episodes.name}
                    </h2>
                    <h2 className="text-gray-500 text-sm">
                      {air_date(episodes.air_date)}
                      <br />
                      {timeConvert(episodes.runtime)}
                    </h2>
                  </div>
                  <p className="leading-relaxed mt-6">{episodes.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvSeasonDetail;
