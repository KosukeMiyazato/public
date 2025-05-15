import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

interface MapSelectorProps {
  address: string;
  lat: number;
  lng: number;
  onLocationChange: (address: string, lat: number, lng: number) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ 
  address, 
  lat, 
  lng, 
  onLocationChange 
}) => {
  const [searchValue, setSearchValue] = useState(address);
  
  // In a real application, you would use the Google Places API to search for locations
  // and get their coordinates. For this demo, we'll simulate a search.
  const handleSearch = () => {
    if (!searchValue.trim()) return;
    
    // Simulate geocoding by generating random coordinates near Tokyo
    // In a real app, you would call the Google Geocoding API here
    const randomLat = 35.6812 + (Math.random() - 0.5) * 0.1;
    const randomLng = 139.7671 + (Math.random() - 0.5) * 0.1;
    
    onLocationChange(searchValue, randomLat, randomLng);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter restaurant address"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                      focus:border-orange-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin size={16} className="text-gray-400" />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
      
      <div className="bg-gray-100 h-48 rounded-md overflow-hidden">
        <div className="w-full h-full relative flex items-center justify-center text-center p-4">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MapPin size={24} className="text-orange-500 mb-2" />
            {address ? (
              <>
                <p className="font-medium text-gray-700">{address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Search for a location</p>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        Note: In a complete implementation, this would use the Google Maps API for search and location selection.
      </p>
    </div>
  );
};

export default MapSelector;