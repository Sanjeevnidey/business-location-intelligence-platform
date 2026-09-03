const demo = [
 {id:'d1',name:'Green Leaf Restaurant',category:'restaurant',lat:12.921,lng:79.127},
 {id:'d2',name:'City Cafe',category:'cafe',lat:12.912,lng:79.142},
 {id:'d3',name:'Central School',category:'school',lat:12.924,lng:79.136},
 {id:'d4',name:'Health Plus',category:'hospital',lat:12.909,lng:79.126},
 {id:'d5',name:'Metro Bank',category:'bank',lat:12.917,lng:79.146}
];

export async function fetchNearbyPlaces(lat,lng,radiusKm) {
  const query = `[out:json][timeout:25];(nwr["amenity"](around:${radiusKm*1000},${lat},${lng});nwr["shop"](around:${radiusKm*1000},${lat},${lng}););out center tags;`;
  try {
    const r = await fetch('https://overpass-api.de/api/interpreter', {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:new URLSearchParams({data:query})
    });
    if(!r.ok) throw new Error(`Overpass HTTP ${r.status}`);
    const json=await r.json();
    return json.elements.map((e,i)=>({
      id:String(e.id ?? i),
      name:e.tags?.name || 'Unnamed place',
      category:e.tags?.amenity || e.tags?.shop || 'other',
      lat:e.lat ?? e.center?.lat ?? lat,
      lng:e.lon ?? e.center?.lon ?? lng
    })).filter(x=>x.name!=='Unnamed place').slice(0,500);
  } catch {
    return demo;
  }
}