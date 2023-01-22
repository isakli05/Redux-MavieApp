import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import TvSeasonListBanner from "../../components/Tvs/TvSeasonListBanner";
import { air_date, image } from "../../helper";
import { useAppSelector } from "../../redux/store";

function TvSeasonsList() {
  const { tv_id } = useParams();
  const tv_name = tv_id?.split("-")[1];
  const tvSeasons = useAppSelector((state) => state.tvDetails.data);
  const status = useAppSelector((state) => state.tvSeasons.loading);

  return (
    <>
      {status === "pending" ? (
        <Loading/>
      ) : (
        <>
          <div className="mb-5">
            <TvSeasonListBanner tv_id={tv_id!} />

            <div className="text-gray-600 body-font overflow-hidden">
              <div className="pb-6 mx-5 md:mx-10">
                <div className="">
                  {tvSeasons?.seasons.map((season) => (
                    <div
                      key={season.id}
                      className="py-3 flex md:flex-nowrap mb-10"
                    >
                      <div className="flex-shrink-0 justify-end flex flex-col ">
                        <Link
                          to={`/tv/${tv_id}/season/${season.season_number}`}
                        >
                          <img
                            loading="lazy"
                            className="md:h-36 w-24 rounded-md"
                            src={`${
                              season?.poster_path === null
                                ? "/assets/tv_null.svg"
                                : `${image}${season?.poster_path}`
                            }`}
                            alt={`${season?.name}`}
                          />
                        </Link>
                      </div>
                      <div className="md:flex-grow ml-5">
                        <div className="flex space-x-3">
                          <Link
                            to={`/tv/${tv_id}/season/${season.season_number}`}
                          >
                            <h2 className="text-2xl font-medium text-gray-200 title-font">
                              {season.name}
                            </h2>
                          </Link>

                          <h2 className="text-gray-400 text-sm flex items-center">
                            {season.air_date?.slice(0, 4)} |{" "}
                            {season.episode_count} Bölüm
                          </h2>
                        </div>
                        <p className="leading-relaxed mt-3 md:mt-6 text-gray-200">
                          {season.overview === ""
                            ? `${tv_name?.toLocaleUpperCase()} ${
                                season.season_number
                              }.Sezon ${air_date(season.air_date)}'de gösterime girdi.`
                            : season.overview}
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
export default TvSeasonsList;
