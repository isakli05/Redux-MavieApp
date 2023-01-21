import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TvLabels } from "../../types/tvLabel";

function TvLabel() {
  const { id } = useParams();
  const [tvLabel, setTvLabel] = useState<TvLabels>();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=a005a803cdec9237f52c2801d1f28661`
    )
      .then((res) => res.data)
      .then((data) => setTvLabel(data));
  }, []);
  return (
    <div className="">
    {" "}
    <h3 className="text-xl font-semibold ">Etikler</h3>
    <div className="md:inline">
      {tvLabel?.results !== null && tvLabel?.results.length! > 0
        ? tvLabel?.results.map((key) => (
            <button
              key={key.id}
              className="bg-slate-700  text-slate-100 text-sm font-thin p-2 m-1 rounded-lg"
            >
              <Link
                to={`/keyword/${key.id}-${key.name.replaceAll(
                  " ",
                  "-"
                )}/tv`}
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

export default TvLabel;
