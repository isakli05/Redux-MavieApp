import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTvDetail } from "../../redux/tvShows/tvShowsDetailSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TvDetails } from "../../types/tvsDetails";

function TvBanner() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const tv = useAppSelector((state) => state.tvDetails.data);
  useEffect(() => {   
    dispatch(fetchTvDetail(id));
  }, [id]);
  return (
    <div className="flex items-center p-5 h-32 my-5 bg-slate-600">
      <Link to={`/tv/${id}`}>
        <div className="flex items-center ml-12">
          <img
            loading="lazy"
            className="w-16 mr-2"
            src={`https://image.tmdb.org/t/p/original/${tv?.poster_path}`}
            alt={tv?.name}
          />

          <div className="ml-2">
            <h3 className="font-semibold text-3xl">
              {tv?.original_name}{" "}
              <span className="text-3xl font-thin">
                ({tv?.first_air_date.slice(0, 4)})
              </span>
            </h3>
            <span className="text-slate-700">
              <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Sayfaya
              Dön
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TvBanner;
