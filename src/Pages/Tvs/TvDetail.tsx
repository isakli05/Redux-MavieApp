import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import TvCredits from "../../components/Tvs/TvCredit";
import TvRecommendation from "../../components/Tvs/TvRecommendation";
import { fetchTvDetail } from "../../redux/tvShows/tvShowsDetailSlice";
import TvLabel from "../../components/Tvs/TvLabel";
import TvSeasonsBackdrops from "../../components/Tvs/TvSeasonsBackdrops";
import { languages } from "../../languages-list";
import { image } from "../../helper";
import Loading from "../../components/Loading";

function TvDetail() {
  const { id } = useParams();
  const tv_id = id?.split("-")[0];
  const name = id?.split("-")[1];

  const dispatch = useAppDispatch();
  const tvDetail = useAppSelector((state) => state.tvDetails.data);
  const status = useAppSelector((state) => state.tvDetails.loading);
const [tvKey, setTvKey] = useState([]);
  useEffect(() => {
    dispatch(fetchTvDetail(tv_id!));
    axios(
      `https://api.themoviedb.org/3/tv/${tv_id}/keywords?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&include_adult=false`
    )
      .then((res) => res.data)
      .then((data) => setTvKey(data))  
  }, [dispatch, tv_id]);
  
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
                tvDetail?.poster_path === ""?
                "": 
                `${image}${tvDetail?.poster_path}`
              }`}
              alt={`${tvDetail?.name===null?"":""}`}
              className="hidden md:block w-40 h-60 left-2 top-36 md:left-3 lg:w-60 lg:h-96 opacity-100 z-10 absolute mx-4 object-cover object-center rounded-md"
            />

            <figure className="w-full opacity-30">
              <img
                loading="lazy"
                src={`${
                  tvDetail?.backdrop_path === ""?
                  "":`${image}${tvDetail?.backdrop_path}`}`}
                className="w-full h-[460px] object-top object-cover rounded-lg"
                alt={`${tvDetail?.backdrop_path===null?"":""}`}
              />
            </figure>
            <div className="lg:w-max p-4 space-y-4 absolute left-4 top-96 md:top-auto  w-46 lg:left-72">
              <h1 className="text-2xl font-semibold leading-tight">
                {tvDetail?.name}
                <span className="text-3xl font-light">
                  {" "}
                  ({tvDetail?.first_air_date.slice(0, 4)})
                </span>
              </h1>
              <p className="hidden md:block w-[700px] text-slate-300">{tvDetail?.overview}</p>
              <p className="text-sm text-slate-200">
                {tvDetail?.genres.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </p>
            </div>
          </div>

          <div className="px-4  space-y-4 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 ">
            <div className="lg:flex lg:gap-x-8">
              <article className="w-12/12 lg:w-9/12 dark:border-gray-700">
                <TvCredits id={id} />

                <Link to={`/tv/${id}/cast`}>
                  <li className="flex flex-col font-semibold text-1xl text-left my-6 hover:text-slate-400 duration-200 ">
                    Tüm Oyuncular ve Ekip
                  </li>
                </Link>
                 {tvDetail?.seasons !== null ? (
                   <>
                   <hr />
                    <TvSeasonsBackdrops
                      title={tvDetail?.name}
                      tv_id={id}
                      season_number={tvDetail?.last_episode_to_air?.season_number.toString()}
                    /> 
                  </>
                ) : (
                  <></>
                )}               
                
                <TvRecommendation id={id} name={tvDetail?.name}/>
              </article>

              <aside className="w-3/12 divider grid gap-1">
                <article className="w-full mt-4 grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Film Detayları
                    </h3>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                      Durum
                    </h3>
                    <p className="text-slate-300 dark:text-slate-400 font-light text-sm w-60">
                      {tvDetail?.status === "Returning Series"
                        ? "Yeni Sezonu Olan Diziler"
                        : "Devam Ediyor"}
                    </p>
                  </figure>
                </article>
                <article className="w-full space-y-2 grid grid-cols-1 pb-4">
                <h3 className="text-slate-300 dark:text-slate-400 font-bold">
                        {tvDetail?.networks.length !== 0 && tvDetail?.networks.length !== 1 ?"Ağlar":"Ağ"}
                      </h3>
                  {tvDetail?.networks.map((network) => (
                    <figure key={network.id} className="space-y-2">                    
                      <Link key={network.id} to={`/network/${network.id}`}>
                        <img
                          loading="lazy"
                          className="h-7  rounded-md"
                          src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                          alt={`${network.name}`}
                        />
                      </Link>
                    </figure>
                  ))}
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Tip
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">
                      {tvDetail?.type}
                    </p>
                  </figure>
                </article>
                <article className="w-full  grid grid-cols-1 pb-4">
                  <figure className="space-y-1">
                    <h3 className="text-slate-700 dark:text-slate-400 font-bold">
                      Orjinal Dili
                    </h3>
                    <p className="text-slate-700 dark:text-slate-400 font-light text-sm">                      
                      {languages.filter(lang => lang.code === tvDetail?.original_language).map(lang => lang.name)}                      
                    </p>
                  </figure>
                </article>
                <article className="w-full mt-4 grid grid-cols-1 pb-4">
                  <TvLabel />
                </article>
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TvDetail;
