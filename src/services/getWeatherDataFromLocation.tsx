import { WeatherAPIResponse } from "../interfaces/WeatherAPIResponse";
import moment from "moment";

export const getWeatherDataFromLocation = async (
  lon: number,
  lat: number,
  date: string
) => {
  // const today = moment();
  // const fechaMeetup = moment(date);

  const resp = await fetch(
    `https://community-open-weather-map.p.rapidapi.com/forecast?q=buenos%20aires&units=metric&mode=json&lat=${lat}&lon=${lon}&lang=es`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8f9d3dd21emsh1dd5d31c44a80e8p1a8426jsn4d007eb29267",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    }
  );

  const list = ((await resp.json()) as WeatherAPIResponse).list;

  const valor = await list.filter(
    (pronosticoDiario) =>
      moment(date).diff(pronosticoDiario.dt_txt, "hours") <= 3 &&
      moment(date).diff(pronosticoDiario.dt_txt, "hours") > 0
  );

  const temperaturaDiaMeetup = valor[0].main.temp;
  
  return temperaturaDiaMeetup;
};
