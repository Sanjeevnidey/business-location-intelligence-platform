const demoPlaces = [
  {
    id: 'demo1',
    name: 'Sample Restaurant',
    category: 'restaurant',
    lat: 12.907,
    lng: 79.131
  },
  {
    id: 'demo2',
    name: 'Sample Cafe',
    category: 'cafe',
    lat: 12.910,
    lng: 79.135
  }
];


export async function fetchNearbyPlaces(lat, lng, radiusKm, type) {

  const radius = Number(radiusKm) * 1000;

  let query = '';

  if (type === 'restaurant') {

    query = `
      [out:json][timeout:15];
      (
        nwr["amenity"="restaurant"](around:${radius},${lat},${lng});
        nwr["amenity"="fast_food"](around:${radius},${lat},${lng});
      );
      out center tags;
    `;

  } else if (type === 'cafe') {

    query = `
      [out:json][timeout:15];
      nwr["amenity"="cafe"](around:${radius},${lat},${lng});
      out center tags;
    `;

  } else if (type === 'pharmacy') {

    query = `
      [out:json][timeout:15];
      nwr["amenity"="pharmacy"](around:${radius},${lat},${lng});
      out center tags;
    `;

  } else if (type === 'gym') {

    query = `
      [out:json][timeout:15];
      nwr["leisure"="fitness_centre"](around:${radius},${lat},${lng});
      out center tags;
    `;

  } else if (type === 'supermarket') {

    query = `
      [out:json][timeout:15];
      nwr["shop"="supermarket"](around:${radius},${lat},${lng});
      out center tags;
    `;

  } else {

    query = `
      [out:json][timeout:15];
      (
        nwr["amenity"](around:${radius},${lat},${lng});
        nwr["shop"](around:${radius},${lat},${lng});
      );
      out center tags;
    `;
  }


  const servers = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter'
  ];


  for (const server of servers) {

    try {

      console.log(`Trying Overpass: ${server}`);

      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 20000);


      const response = await fetch(server, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },

        body: new URLSearchParams({
          data: query
        }),

        signal: controller.signal
      });


      clearTimeout(timeout);


      if (!response.ok) {
        throw new Error(`Overpass HTTP ${response.status}`);
      }


      const data = await response.json();


      const places = data.elements
        .map((place, index) => ({

          id: String(place.id || index),

          name: place.tags?.name || 'Unnamed place',

          category:
            place.tags?.amenity ||
            place.tags?.shop ||
            place.tags?.leisure ||
            'other',

          lat: place.lat || place.center?.lat,

          lng: place.lon || place.center?.lon

        }))
        .filter((place) => place.name !== 'Unnamed place');


      console.log(`Found ${places.length} places`);

      return places;


    } catch (error) {

      console.log(
        `Overpass failed: ${server}`,
        error.message
      );

    }

  }


  console.log('Using fallback demo data');

  return demoPlaces.map((place, index) => ({
    ...place,

    lat: lat + (index === 0 ? 0.005 : -0.004),

    lng: lng + (index === 0 ? 0.006 : -0.005)

  }));
}