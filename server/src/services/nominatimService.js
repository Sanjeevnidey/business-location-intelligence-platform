export async function geocodeLocation(location) {
  const url =
    `https://nominatim.openstreetmap.org/search?` +
    `q=${encodeURIComponent(location)}` +
    `&format=json` +
    `&limit=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "GeoBiz-Intelligence-Platform/1.0"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error(`Location "${location}" was not found`);
  }

  return {
    name: data[0].display_name,
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon)
  };
}