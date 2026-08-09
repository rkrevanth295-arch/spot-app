import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const hyderabadCenter: [number, number] = [17.3850, 78.4867];

interface Spot {
  id: string;
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    api.get('/spots/')
      .then(res => setSpots(res.data))
      .catch(err => console.error('Failed to fetch spots:', err));
  }, []);

  return (
    <MapContainer center={hyderabadCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map(spot => (
        <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
          <Popup>
            <strong>{spot.name}</strong>
            <br />
            {spot.category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;