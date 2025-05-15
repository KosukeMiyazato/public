import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Calendar } from 'lucide-react';
import { Restaurant } from '../../types';
import PriceRange from '../ui/PriceRange';
import RatingStars from '../ui/RatingStars';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  // Format date to a more readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format price range text
  const formatPriceRange = (min: number, max: number) => {
    return `¥${min.toLocaleString()} ~ ¥${max.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{restaurant.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="text-orange-500 mr-1" />
          <span className="text-sm truncate">{restaurant.location.address}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Tag size={16} className="text-teal-500 mr-1" />
            <span className="text-sm text-gray-600 bg-teal-50 px-2 py-0.5 rounded-full">
              {restaurant.foodGenre}
            </span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(restaurant.updatedAt)}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <RatingStars rating={restaurant.rating} />
          <PriceRange priceRange={restaurant.priceRange} />
        </div>

        {restaurant.priceRangeText && (
          <div className="text-sm text-gray-600 mb-4">
            {formatPriceRange(restaurant.priceRangeText.min, restaurant.priceRangeText.max)}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            to={`/restaurant/${restaurant.id}`}
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white rounded-md py-2 
                      transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;