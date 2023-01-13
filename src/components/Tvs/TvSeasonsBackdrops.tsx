import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { air_date, image } from "../../helper";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchTvSeasons } from "../../redux/tvShows/tvSeasonsSlice";

type TvSeasonsProps = {
  tv_id?: string;
  season_number?: string;
  title?: string;
};

function TvSeasonsBackdrops({ tv_id, title, season_number }: TvSeasonsProps) {
  const tvSeasons = useAppSelector((state) => state.tvSeasons.data);
  const status = useAppSelector((state) => state.tvSeasons.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTvSeasons({ tv_id, season_number }));
  }, [tv_id, season_number, dispatch]);

  const date=air_date(String(tvSeasons?.air_date))
  return (
    <div className="mt-10 relative">
      <h3 className="text-2xl mb-5 text-left text-zinc-300 font-semibold">
        Şuanki Sezon
      </h3>
      <figure className="w-full ">
        <Link
          to={`/tv/${tv_id}/season/${tvSeasons?.season_number}`}
          className=""
        >
          <img
            loading="lazy"
            src={`${
                      tvSeasons?.poster_path === null
                        ? "/public/assets/tv_null.svg"
                        : `${image}${tvSeasons?.poster_path}`
                    }`}
            className="h-48 w-32 object-top object-cover rounded-lg"
            alt={`${tvSeasons?.name}`}
          />
        </Link>
      </figure>

      <div className="w-full p-4 absolute left-36 top-16">
      <Link
          to={`/tv/${tv_id}/season/${tvSeasons?.season_number}`}
          className=""
        >
        <p className="text-lg font-semibold leading-tight mb-2">
          {tvSeasons?.name}          
        </p>
        </Link>

        <p className="text-md font-semibold leading-tight">
          {tvSeasons?.air_date?.slice(0, 4)} | {tvSeasons?.episodes.length} Bölüm
        </p>
        <h1 className="text-slate-300 mt-9 w-11/12">
          {title} dizisinin {tvSeasons?.season_number}. sezonu {date}{" "}
          tarihinde gösterime girdi.
        </h1>
      </div>
    </div>
  );
}
export default TvSeasonsBackdrops;
