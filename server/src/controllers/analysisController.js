import { fetchNearbyPlaces } from '../services/overpassService.js';
import { calculateScore } from '../services/scoringService.js';

export async function getAnalysis(req,res) {
  const {lat='12.9165', lng='79.1325', radius='2', type='Restaurant', city='Vellore'} = req.query;
  try {
    const places = await fetchNearbyPlaces(Number(lat), Number(lng), Number(radius));
    const score = calculateScore(places);
    res.json({city,type,radius:Number(radius),places,score,source: places.length ? 'OpenStreetMap / Overpass' : 'demo fallback'});
  } catch (err) {
    res.status(500).json({message:'Analysis failed', error:err.message});
  }
}