const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export async function analyzeLocation(params) {
  const qs = new URLSearchParams(params);
  const res = await fetch(`${BASE}/analysis?${qs}`);
  if (!res.ok) throw new Error('Analysis request failed');
  return res.json();
}