import React from 'react';

import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25,41], iconAnchor: [12,41], popupAnchor: [1,-34], shadowSize: [41,41]
});

export default function MapView({center=[12.9165,79.1325], markers=[]}) {
  return (
    <MapContainer center={center} zoom={13} className="map">
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={center} radius={2000} pathOptions={{fillOpacity:0.08}} />
      <Marker position={center} icon={markerIcon}><Popup>Selected business location</Popup></Marker>
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat,m.lng]} icon={markerIcon}>
          <Popup><strong>{m.name}</strong><br/>{m.category}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}