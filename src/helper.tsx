export const image = "https://image.tmdb.org/t/p/original";

export let air_date = (date: string) =>
  new Date(String(date)).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const timeConvert = (n: number) => {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours === 0 ? "" : rhours + "h"} ${
    rminutes > 0 ? rminutes + "m" : ""
  }`;
};
