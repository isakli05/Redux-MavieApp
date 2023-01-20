import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PersonDetail } from "../../types/personDetail";
import axios from "axios";
import { image } from "../../helper";

function PersonDetails() {
  const { cast_id } = useParams();
  const [cast, setCast] = useState<PersonDetail>();
  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/person/${cast_id}?api_key=a005a803cdec9237f52c2801d1f28661&language=tr|en`
    )
      .then((res) => res.data)
      .then((data) => setCast(data));
  }, []);

  return (
    <div className="bg-white md:py-8 dark:bg-slate-900 dark:text-slate-100 text-slate-900 px-4 flex">
      <img
        loading="lazy"
        src={`${
         cast?.profile_path === null
            ? "/public/assets/nullUser.svg"
            : `${image}/${cast?.profile_path}`
        }`}
        alt={cast?.name}
        className="rounded-md h-48 md:h-96 object-cover"
      />

      <div className="space-y-8">
        <h2 className="text-3xl lg:text-5xl md:text-left ml-3 font-semibold">
          {cast?.name}
                  </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="px-2 md:px-4">
            <div className="hidden md:block">
            <h3 className="text-2xl font-semibold">Biyografi</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {cast?.biography === ""
                ? "Biyografi bulunamadı"
                : cast?.biography}
            </p>
            </div>
            <h3 className="text-2xl md:mt-6 mb-3 font-semibold">
              Kişisel Bilgiler
            </h3>
            <ul className="flex flex-col lg:flex-row gap-5">
              <li className="flex flex-col items-left">
                <h5 className="font-bold text-xl">Bilinen işi</h5>
                <p className="text-slate-800 dark:text-slate-100 font-medium ">
                  {cast?.known_for_department.toString() === "Acting"
                    ? "Oyuncu"
                    : cast?.known_for_department}
                </p>
              </li>
              <li className="flex flex-col items-left">
                <h5 className="font-bold text-xl">Cinsiyet</h5>
                <p className="text-slate-800 dark:text-slate-100 font-medium ">
                  {cast?.gender.toString() === "1" ? "Kadın" : "Erkek"}
                </p>
              </li>
              <li className="flex flex-col items-left">
                <h5 className="font-bold text-xl">Doğum Günü</h5>
                <p className="text-slate-800 dark:text-slate-100 font-medium ">
                  {cast?.birthday}
                </p>
              </li>
              <li className="flex flex-col items-left">
                <h5 className="font-bold text-xl">Doğum Yeri</h5>
                <p className="text-slate-800 dark:text-slate-100 font-medium ">
                  {cast?.place_of_birth}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
