export const getAddressLatLon = async (
  direccion: string,
  localidad?: string | null
) => {
  const url = localidad
    ? `https://apis.datos.gob.ar/georef/api/direcciones?provincia=${encodeURI(
        "Buenos Aires"
      )}&localidad_censal=${encodeURI(localidad)}&direccion=${encodeURI(
        direccion
      )}`
    : `https://apis.datos.gob.ar/georef/api/direcciones?provincia=${encodeURI(
        "Buenos Aires"
      )}&direccion=${encodeURI(direccion)}`;

  const resp = await fetch(url);
  const { direcciones } = await resp.json();
  return direcciones;
};
