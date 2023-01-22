import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { image } from "../../helper";
import { Tvs } from "../../types/tvs";

function TvKeyList() {
  const { key_id } = useParams();  
  const id = key_id?.split("-")[0];
  const location = useLocation();
  const name =
    location.pathname.split("/")[2].split("-")[1] +
    " " +
    [location.pathname.split("/")[2].split("-")[2]] +
    " " +
    [location.pathname.split("/")[2].split("-")[3]] +
    " " +
    [location.pathname.split("/")[2].split("-")[4]] +
    " " +
    [location.pathname.split("/")[2].split("-")[5]];


  const [tvKeyList, setMovieKeyList] = useState<Tvs>();
  const [status, setStatus] = useState(true);
  
 
  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/discover/tv?api_key=a005a803cdec9237f52c2801d1f28661&language=tr-TR&with_keywords=${id}`
    )
      .then((res) => res.data)
      .then((data) => setMovieKeyList(data))
      .finally(() => setStatus(false));
  }, []);
  

  return (
    <>
    {status ? (
      <div className="flex  flex-col md:flex-row items-center justify-center px-6 py-4 space-y-2 text-center">
        <button
          type="button"
          className="bg-transparent w-56 border-0 py-2 px-6 focus:outline-none  rounded text-lg"
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
    <div className="mb-5">
      <div className="w-full bg-cyan-900 p-5 mb-5 space-y-4">
        <h1 className="flex justify-between text-3xl mx-6 font-medium leading-tight">
          <span className="text-white">{name}</span>
          <span className="text-white">{tvKeyList?.total_results} dizi</span>
        </h1>
      </div>
      <div className="text-gray-600 body-font overflow-hidden">
        <div className="py-6 mx-10">
          <div className="">
            {tvKeyList?.results.map((tv) => (
              <div
                key={tv.id}
                className="py-3 flex flex-wrap md:flex-nowrap"
              >
                <div className="flex-shrink-0 flex flex-col ">
                  <Link to={`/tv/${tv.id}`}>
                    <img
                      loading="lazy"
                      className="h-36 w-24 rounded-md"
                      src={`${
                        tv?.poster_path === null
                          ? "/public/assets/tv_null.svg"
                          : `${image}${tv?.poster_path}`
                      }`}
                      alt={`${tv?.original_name}`}
                    />
                  </Link>
                </div>
                <div className="md:flex-grow ml-5">
                  <h2 className="text-2xl font-medium text-gray-100 title-font">
                    {tv.name}
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {tv.first_air_date}
                  </span>

                  <p className="leading-relaxed mt-6 text-gray-200">
                    {tv.overview !== ""
                      ? tv.overview.slice(0, 260).concat("...")
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
      )}
    </>
  );
}

export default TvKeyList;
