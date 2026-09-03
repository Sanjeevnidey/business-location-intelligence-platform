export function calculateScore(places) {
  const count = (keys) => places.filter(p => keys.includes(String(p.category).toLowerCase())).length;
  const competitors = count(['restaurant','cafe','fast_food']);
  const schools = count(['school','college','university']);
  const hospitals = count(['hospital','clinic','doctors']);
  const banks = count(['bank','atm']);
  const demand = Math.min(100, 60 + schools * 5 + hospitals * 3);
  const competition = Math.max(45, 100 - competitors * 3);
  const facilities = Math.min(100, 50 + (schools+hospitals+banks) * 5);
  const accessibility = Math.min(100, 65 + Math.min(30, places.length / 5));
  const environment = 70;
  const score = Math.round(demand*.30 + competition*.25 + facilities*.20 + accessibility*.15 + environment*.10);
  return {score, demand:Math.round(demand), competition:Math.round(competition), facilities:Math.round(facilities), accessibility:Math.round(accessibility), environment};
}