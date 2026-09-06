export function generateCategoryInsights(places) {
  const categories = {};

  places.forEach((place) => {
    const category = place.category || 'other';

    categories[category] =
      (categories[category] || 0) + 1;
  });

  return categories;
}

export function generateBusinessIntelligence(
  places,
  type,
  radiusKm
) {
  const totalBusinesses = places.length;

 //competition level

  let competitionLevel;

  if (totalBusinesses <= 3) {
    competitionLevel = 'Low';
  } else if (totalBusinesses <= 10) {
    competitionLevel = 'Medium';
  } else {
    competitionLevel = 'High';
  }

  //Business density

  const area = Math.PI * Math.pow(radiusKm, 2);

  const businessDensity = totalBusinesses / area;

  let densityLevel;

  if (businessDensity < 0.1) {
    densityLevel = 'Low';
  } else if (businessDensity < 0.3) {
    densityLevel = 'Medium';
  } else {
    densityLevel = 'High';
  }

  //Opportunity Score

  let opportunityScore = 100;

  // Reduce score based on competitors
  opportunityScore -= totalBusinesses * 8;

  // Reduce score based on density
  if (densityLevel === 'High') {
    opportunityScore -= 20;
  } else if (densityLevel === 'Medium') {
    opportunityScore -= 10;
  }

  // Nearby competition matters more
  if (radiusKm <= 2) {
    opportunityScore -= 10;
  } else if (radiusKm <= 5) {
    opportunityScore -= 5;
  }

  // Keep score between 0 and 100
  opportunityScore = Math.max(0, Math.min(100, opportunityScore));

  //RECOMMENDATION

  let recommendation;

  if (opportunityScore >= 70) {
    recommendation =
      `Good opportunity for a ${type} business. Competition appears manageable in this area.`;
  } else if (opportunityScore >= 40) {
    recommendation =
      `Moderate opportunity for a ${type} business. Analyze competitors carefully before making a decision.`;
  } else {
    recommendation =
      `High competition detected for ${type} businesses. Consider a different location or business strategy.`;
  }

  return {
    totalBusinesses,
    competitionLevel,

    businessDensity: Number(
      businessDensity.toFixed(3)
    ),

    densityLevel,

    opportunityScore,

    recommendation
  };
}