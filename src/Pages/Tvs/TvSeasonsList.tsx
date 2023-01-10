
import { Link, useParams } from 'react-router-dom'
import TvSeasonListBanner from '../../components/Tvs/TvSeasonListBanner'
import { air_date } from '../../helper';
import { useAppSelector } from '../../redux/store';

function TvSeasonsList() {
    const {tv_id} = useParams();
    const tv_name=tv_id?.split("-")[1]
    const tvSeasons = useAppSelector((state) => state.tvDetails.data);
  return (    
    <div className="mb-5">
    <TvSeasonListBanner tv_id={tv_id!}/>
    
    <div className="text-gray-600 body-font overflow-hidden">
      <div className="pb-6 mx-10">
        <div className="">
          {tvSeasons?.seasons.map((season) => (
            <div
              key={season.id}
              className="py-3 flex flex-wrap md:flex-nowrap"
            >
              <div className="flex-shrink-0 flex flex-col ">
                 <Link to={`/tv/${tv_id}/season/${season.season_number}`}>
                  <img
                    loading="lazy"
                    className="h-36 rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${season?.poster_path}`}
                    alt={`${season?.name}`}
                  />
                </Link> 
              </div>
              <div className="md:flex-grow ml-5">
                <div className="flex space-x-3">
                <Link to={`/tv/${tv_id}/season/${season.season_number}`}>
                  <h2 className="text-2xl font-medium text-gray-900 title-font">
                    {season.name}
                  </h2>
                </Link> 

                  <h2 className="text-gray-500 text-sm flex items-center">
                    {season.air_date.slice(0,4)} | {season.episode_count} Bölüm                    
                  </h2>
                </div>
                <p className="leading-relaxed mt-6">{season.overview ==="" ? `${tv_name?.toLocaleUpperCase()} ${season.season_number}.Sezon ${air_date(season.air_date)}'de gösterime girdi.`:season.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
//Yellowstone'un 5. Sezonu 13 Kasım 2022'de gösterime girdi.

export default TvSeasonsList