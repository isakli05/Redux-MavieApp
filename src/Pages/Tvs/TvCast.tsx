import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieCredits } from "../../types/movieCredits";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchTvCredits } from "../../redux/tvShows/tvCreditSlice";
import TvBanner from "../../components/Tvs/TvBanner";
import { image } from "../../helper";
import Loading from "../../components/Loading";

function TvCast() {
  const { id } = useParams<{ id: string }>();
  const tvCredit = useAppSelector((state) => state.tvCredits.data);
  const status = useAppSelector((state) => state.tvCredits.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTvCredits(id));
  }, []);

  console.log(tvCredit);
  
  
  return (
    <>
      {status==="pending" ? (
        <Loading/>
      ) : (
        <>
    <div className="dark:bg-slate-900">
      <TvBanner />
      <div className="flex">
        <div className="w-3/6">
          <h3 className="text-3xl text-left ml-16 text-zinc-300 font-semibold">
          Dizi Oyuncuları{" "}
            <span className="text-2xl font-thin">
              ({tvCredit?.cast.length})
            </span>
          </h3>
          <ul className="space-y-4 ml-16 mt-3">
            {tvCredit?.cast.map((cast) => (
              <li key={cast.id} className="flex items-center gap-3">
                <Link className="flex gap-3" to={`/person/${cast.id}`}>
                  <img
                    loading="lazy"
                    className="w-16"
                    src={`${
                      cast?.profile_path === null
                        ? "/public/assets/nullUser.svg"
                        : `${image}${cast?.profile_path}`
                    }`}
                    alt={cast.name}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-100">{cast.name}</h3>
                    <p>{cast.character}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/6">
          <h3 className="text-3xl text-left ml-16 text-zinc-300 font-semibold">
          Dizi Ekibi{" "}
            <span className="text-2xl font-thin">
              ({tvCredit?.crew.length})
            </span>
          </h3>
          <ul className="space-y-4 ml-16 mt-3">
            {tvCredit?.crew.map((crew) => (
              <li key={crew.id} className="flex items-center gap-3">
                <Link className="flex gap-3" to={`/person/${crew.id}`}>
                  <img
                    loading="lazy"
                    className="w-16"
                    src={`${
                      crew?.profile_path === null
                        ? "/public/assets/nullUser.svg"
                        : `${image}${crew?.profile_path}`
                    }`}
                    alt={crew.name}
                  />
                  
                  <div>
                    <h3 className="font-semibold text-gray-100">{crew.name}</h3>
                    <p className="text-zinc-300">{crew.known_for_department}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
      )}
    </>
  );
}

export default TvCast;