const demo = [
  {
    id: 'd1',
    name: 'Green Leaf Restaurant',
    category: 'restaurant',
    lat: 12.921,
    lng: 79.127
  },
  {
    id: 'd2',
    name: 'City Cafe',
    category: 'cafe',
    lat: 12.912,
    lng: 79.142
  },
  {
    id: 'd3',
    name: 'Central School',
    category: 'school',
    lat: 12.924,
    lng: 79.136
  },
  {
    id: 'd4',
    name: 'Health Plus',
    category: 'hospital',
    lat: 12.909,
    lng: 79.126
  },
  {
    id: 'd5',
    name: 'Metro Bank',
    category: 'bank',
    lat: 12.917,
    lng: 79.146
  }
];

export async function fetchNearbyPlaces(
  lat,
  lng,
  radiusKm,
  type = 'restaurant'
) {

  const typeToTag = {
    restaurant: ['amenity', 'restaurant'],
    cafe: ['amenity', 'cafe'],
    hospital: ['amenity', 'hospital'],
    school: ['amenity', 'school'],
    bank: ['amenity', 'bank'],
    pharmacy: ['amenity', 'pharmacy'],
    supermarket: ['shop', 'supermarket']
  };

  const [key, value] =
    typeToTag[type] || typeToTag.restaurant;

  const radiusMeters = radiusKm * 1000;

  let query;

if (type === 'restaurant') {
  query =
    `[out:json][timeout:25];` +
    `(` +
    `nwr["amenity"="restaurant"](around:${radiusMeters},${lat},${lng});` +
    `nwr["amenity"="fast_food"](around:${radiusMeters},${lat},${lng});` +
    `);` +
    `out center tags;`;
} else {
  const [key, value] =
    typeToTag[type] || typeToTag.restaurant;

 const query =
  `[out:json][timeout:15];` +
  `nwr["amenity"~"restaurant|fast_food|cafe"]` +
  `(around:${radiusMeters},${lat},${lng});` +
  `out center tags;`;
}

  console.log(`Searching for ${type} within ${radiusKm} km`);

  try {
    const response = await fetch(
      'https://overpass-api.de/api/interpreter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'GeoBiz-Intelligence-Platform/1.0'
        },
        body: `data=${encodeURIComponent(query)}`
      }
    );

    if (!response.ok) {
      throw new Error(
        `Overpass HTTP ${response.status}`
      );
    }

    const json = await response.json();

    return json.elements
      .map((element, index) => ({
        id: String(element.id ?? index),
        name: element.tags?.name || 'Unnamed place',
        category: element.tags?.[key] || type,
        lat: element.lat ?? element.center?.lat ?? lat,
        lng: element.lon ?? element.center?.lon ?? lng
      }))
      .filter(place => place.name !== 'Unnamed place')
      .slice(0, 500);

  } catch (error) {
    console.error(
      'Overpass error:',
      error.message
    );

    throw new Error(
      `Overpass request failed: ${error.message}`
    );
  }
}