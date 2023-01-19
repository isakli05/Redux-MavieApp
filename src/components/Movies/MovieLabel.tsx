import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieLabels } from "../../types/movieLabel";

function MovieLabel() {
  const { id } = useParams();
  const [movieLabel, setMovieLabel] = useState<MovieLabels>();

  useEffect(() => {
    axios(        
      `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=a005a803cdec9237f52c2801d1f28661`
    )
      .then((res) => res.data)
      .then((data) => setMovieLabel(data));
  }, []);
  return (
    <div className="w-60">
      {" "}
      <h3 className="text-xl font-semibold ">Etikler</h3>
      <div className="grid grid-cols-3 min-w-max md:inline md:w-min gap-3 ">
       {movieLabel?.keywords!==null
       ?movieLabel?.keywords.map((key) => (
        <button key={key.id} className="bg-slate-700 text-slate-100 text-sm font-thin  py-2 px-1 md:m-1 md:p-2  rounded-lg">
        <Link to={`/keyword/${key.id}-${key.name.replaceAll(" ","-")}/movie`}>
          {key.name}
        </Link>
        </button>
      )):"Hiç anahtar kelime eklenmedi."} 
      </div>
    </div>
  );
}

export default MovieLabel;
