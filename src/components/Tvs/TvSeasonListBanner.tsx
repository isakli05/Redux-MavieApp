import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { image } from "../../helper";
import { useAppDispatch } from "../../redux/store";
import { fetchTvDetail } from "../../redux/tvShows/tvShowsDetailSlice";
import { TvDetails } from "../../types/tvsDetails";

function TvSeasonListBanner({ tv_id }: { tv_id: string }) {
  
  const [tvDetail,setTvDetail]=useState<TvDetails>()
  const id=tv_id.split("-")[0]
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTvDetail(tv_id));
    axios(
      `https://api.themoviedb.org/3/tv/${id}?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&include_adult=false`
    )
      .then((res) => res.data)
      .then((data) => setTvDetail(data))  
  }, []);

  return (
    <>    
      <div className="flex items-center p-2 sm:p-5 h-32 my-5 bg-slate-600">
        <div className="flex items-center ml-5 md:ml-12">
          <Link className="flex" to={`/tv/${tv_id}`}>
            <img
              loading="lazy"
              className="w-16 mr-2"
               src={`${image}${tvDetail?.poster_path}`}
              alt={tvDetail?.name}
            />
            <div className="ml-2">
              <div className="flex space-x-2">
                <h3 className="font-semibold text-lg md:text-3xl text-gray-100 hover:text-gray-300">
                  {tvDetail?.name}{" "}
                </h3>
                <h5 className="text-sm md:text-3xl font-thin text-gray-100 mt-1">
                  ({tvDetail?.first_air_date!==""?tvDetail?.first_air_date.slice(0,4):""})
                </h5>
              </div>
              <span className="text-gray-100 hover:text-slate-300">
                <i className="fa-solid fa-arrow-left mr-2 text-sm "></i>Back to main
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TvSeasonListBanner;
