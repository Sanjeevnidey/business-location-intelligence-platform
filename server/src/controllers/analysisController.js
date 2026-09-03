import { geocodeLocation } from '../services/nominatimService.js';
import { fetchNearbyPlaces } from '../services/overpassService.js';

export async function getAnalysis(req, res) {
  try {
    const {
      city,
      radius = 5
    } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        error: 'City is required'
      });
    }

    // Step 1: Convert city name into coordinates
    const location = await geocodeLocation(city);

    // Step 2: Find nearby places using those coordinates
    const places = await fetchNearbyPlaces(
      location.latitude,
      location.longitude,
      Number(radius)
    );

    res.json({
      success: true,
      location,
      radiusKm: Number(radius),
      totalPlaces: places.length,
      places
    });

  } catch (error) {
    console.error('Analysis error:', error.message);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}