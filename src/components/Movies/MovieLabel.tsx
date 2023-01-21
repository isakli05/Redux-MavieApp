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
    <div className="">
      {" "}
      <h3 className="text-xl font-semibold ">Etikler</h3>
      <div className="md:inline">
        {movieLabel?.keywords !== null && movieLabel?.keywords.length! > 0
          ? movieLabel?.keywords.map((key) => (
              <button
                key={key.id}
                className="bg-slate-700  text-slate-100 text-sm font-thin p-2 m-1 rounded-lg"
              >
                <Link
                  to={`/keyword/${key.id}-${key.name.replaceAll(
                    " ",
                    "-"
                  )}/movie`}
                >
                  {key.name}
                </Link>
              </button>
            ))
          : "Hiç anahtar kelime eklenmedi."}
      </div>
    </div>
  );
}

export default MovieLabel;
