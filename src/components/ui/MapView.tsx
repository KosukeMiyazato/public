import React from 'react';

interface MapViewProps {
  lat: number;
  lng: number;
  name: string;
  height?: string;
}

const MapView: React.FC<MapViewProps> = ({ lat, lng, name, height = '100%' }) => {
  // Create the Google Maps URL with marker
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY`;
  
  // This is a placeholder for the Google Maps API
  // In a real app, you would use the Google Maps JavaScript API or a library like react-google-maps
  
  return (
    <div className="w-full h-full relative bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500 mb-2"
        >
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="font-medium text-gray-700">{name}</p>
        <p className="text-sm text-gray-500">Latitude: {lat.toFixed(6)}</p>
        <p className="text-sm text-gray-500">Longitude: {lng.toFixed(6)}</p>
        <p className="text-xs text-gray-400 mt-2">
          To display an actual map, integrate with Google Maps API
        </p>
      </div>
    </div>
  );
};

export default MapView;