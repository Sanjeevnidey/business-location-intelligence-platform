# Cloud-Based Business Location Intelligence Platform

A multipage React + Express application for analyzing business locations using public geographic data.

## Stack
- Frontend: React + Vite + React Router + Leaflet
- Backend: Node.js + Express
- Data: OpenStreetMap ecosystem (Overpass/Nominatim)
- Database: MongoDB Atlas (optional; demo mode works without it)
- Charts: Recharts
- Auth: Demo/local authentication scaffold

## Pages
- Landing
- Login
- Register
- Dashboard
- Location Search
- Analysis
- Compare
- Saved Locations
- Profile

## Run

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

Copy `server/.env.example` to `server/.env`.

The starter backend includes demo data fallback so the UI can be explored without MongoDB or API credentials.
