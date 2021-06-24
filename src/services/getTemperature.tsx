import { getAddressLatLon } from "./getAddressLatLon";
import { Direcciones } from "../interfaces/Addresses";
import { getWeatherDataFromLocation } from "./getWeatherDataFromLocation";
export const getTemperature = async (
  calle: string,
  altura: string,
  localidad_censal: string,
  date: string
) => {
  try {
    
    const datos: Direcciones[] = await getAddressLatLon(
      `${calle} ${altura}`,
      `${localidad_censal}`
    );
    const temperatura: number = await getWeatherDataFromLocation(
      datos[0].ubicacion.lon,
      datos[0].ubicacion.lat,
      date
    );

    return temperatura;
  } catch (error) {
    console.warn(error);
  }
};
