import React, { useState, useMemo } from 'react';
import { Search, FilterX } from 'lucide-react';
import { Restaurant } from '../../types';
import RestaurantCard from './RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [filterPrice, setFilterPrice] = useState(0);

  // Extract unique food genres for filter dropdown
  const genres = useMemo(() => {
    const uniqueGenres = new Set(restaurants.map(r => r.foodGenre));
    return Array.from(uniqueGenres).sort();
  }, [restaurants]);

  // Apply filters to restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.notes.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(restaurant => !filterGenre || restaurant.foodGenre === filterGenre)
      .filter(restaurant => !filterRating || restaurant.rating >= filterRating)
      .filter(restaurant => !filterPrice || restaurant.priceRange === filterPrice);
  }, [restaurants, searchTerm, filterGenre, filterRating, filterPrice]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterGenre('');
    setFilterRating(0);
    setFilterPrice(0);
  };

  const hasActiveFilters = searchTerm || filterGenre || filterRating || filterPrice;

  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search restaurants, locations or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                      focus:border-orange-500 transition-colors"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="w-full sm:w-auto">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                        focus:border-orange-500"
            >
              <option value="">All Cuisines</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                        focus:border-orange-500"
            >
              <option value={0}>Any Rating</option>
              <option value={5}>★★★★★ (5)</option>
              <option value={4}>★★★★☆ (4+)</option>
              <option value={3}>★★★☆☆ (3+)</option>
              <option value={2}>★★☆☆☆ (2+)</option>
              <option value={1}>★☆☆☆☆ (1+)</option>
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(Number(e.target.value))}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 
                        focus:border-orange-500"
            >
              <option value={0}>Any Price</option>
              <option value={1}>$ (Budget)</option>
              <option value={2}>$$ (Affordable)</option>
              <option value={3}>$$$ (Moderate)</option>
              <option value={4}>$$$$ (Expensive)</option>
              <option value={5}>$$$$$ (Luxury)</option>
            </select>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center px-3 py-2 text-sm text-orange-700 bg-orange-50 hover:bg-orange-100 
                        rounded-md transition-colors"
            >
              <FilterX size={16} className="mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-orange-500 mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No restaurants found</h3>
          <p className="text-gray-600">
            {restaurants.length === 0 
              ? "Start by adding your first restaurant!" 
              : "Try changing your search or filters to see more results."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;