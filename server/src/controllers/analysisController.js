import { geocodeLocation } from '../services/nominatimService.js';
import { fetchNearbyPlaces } from '../services/overpassService.js';
import { generateBusinessIntelligence, generateCategoryInsights } from '../services/intelligenceService.js';

export async function getAnalysis(req, res) {
  try {
    const { city, type = 'restaurant', radius = 5 } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        error: 'City is required'
      });
    }

    // Convert radius to a number
    const radiusKm = Number(radius);

    // Step 1: Find city coordinates
    const location = await geocodeLocation(city);

    console.log(
      `Searching for ${type} within ${radiusKm} km`
    );

    // Step 2: Find nearby businesses
    const places = await fetchNearbyPlaces(
      location.latitude,
      location.longitude,
      radiusKm,
      type
    );

    // Step 3: Generate business intelligence
    const intelligence = generateBusinessIntelligence(
      places,
      type,
      radiusKm
    );
    const categoryInsights = generateCategoryInsights(places);

    // Step 4: Send response
    res.json({
      success: true,
      location,
      radiusKm,
      totalPlaces: places.length,
      type,
      intelligence,
      categoryInsights,
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