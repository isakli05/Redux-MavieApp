import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchTvDetail } from "../../redux/tvShows/tvShowsDetailSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TvDetails } from "../../types/tvsDetails";
import { image } from "../../helper";

function TvBanner() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const tv = useAppSelector((state) => state.tvDetails.data);
  useEffect(() => {   
    dispatch(fetchTvDetail(id));
  }, [id]);
  return (
    <div className="flex items-center p-2 sm:p-5 h-32 my-5 bg-slate-500">
      <Link to={`/tv/${id}`}>
        <div className="flex items-center md:ml-12">
          <img
            loading="lazy"
            className="w-16 mr-2"
             src={`${image}${tv?.poster_path}`}
            alt={tv?.name}
          />

          <div className="ml-2">
            <h3 className="font-semibold text-2xl md:text-3xl text-gray-100 hover:text-gray-300">
              {tv?.original_name}{" "}
              <span className="md:text-3xl font-thin ">
                ({tv?.first_air_date.slice(0, 4)})
              </span>
            </h3>
            <span className="text-gray-100 hover:text-slate-300">
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
