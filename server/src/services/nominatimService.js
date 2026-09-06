export async function geocodeLocation(location) {
  const url =
    `https://nominatim.openstreetmap.org/search?` +
    `q=${encodeURIComponent(location)}` +
    `&format=json` +
    `&limit=5` +
    `&addressdetails=1`;

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

  console.log("Nominatim candidates:");
  data.forEach((place, index) => {
    console.log(index + 1, {
      name: place.display_name,
      type: place.type,
      category: place.category,
      latitude: place.lat,
      longitude: place.lon
    });
  });

  const best =
  data.find(place => place.type === 'city') ||
  data.find(place => place.type === 'town') ||
  data.find(place => place.type === 'village') ||
  data[0];

  return {
    name: best.display_name,
    latitude: Number(best.lat),
    longitude: Number(best.lon)
  };
}