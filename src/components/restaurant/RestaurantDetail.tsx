import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Calendar, ExternalLink, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Restaurant } from '../../types';
import PriceRange from '../ui/PriceRange';
import RatingStars from '../ui/RatingStars';
import MapView from '../ui/MapView';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onDelete: () => void;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({ restaurant, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Format date to a more readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format price range text
  const formatPriceRange = (min: number, max: number) => {
    return `¥${min.toLocaleString()} ~ ¥${max.toLocaleString()}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
          
          <div className="flex space-x-2">
            <Link 
              to={`/edit/${restaurant.id}`}
              className="flex items-center bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md 
                        transition-colors"
            >
              <Edit size={16} className="mr-1" />
              <span className="text-sm">Edit</span>
            </Link>
            {!showDeleteConfirm ? (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md 
                          transition-colors"
              >
                <Trash2 size={16} className="mr-1" />
                <span className="text-sm">Delete</span>
              </button>
            ) : (
              <div className="flex space-x-1">
                <button 
                  onClick={onDelete}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md 
                            transition-colors"
                >
                  <AlertTriangle size={16} className="mr-1" />
                  <span className="text-xs">Confirm</span>
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded-md 
                            transition-colors"
                >
                  <span className="text-xs">Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={18} className="text-orange-500 mr-2" />
          <span>{restaurant.location.address}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Details</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <Tag size={16} className="text-teal-500 mr-2" />
                    <span className="font-medium text-gray-700">Cuisine:</span>
                  </div>
                  <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full">{restaurant.foodGenre}</span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Rating:</span>
                  <RatingStars rating={restaurant.rating} />
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Price Level:</span>
                  <PriceRange priceRange={restaurant.priceRange} />
                </div>

                {restaurant.priceRangeText && (
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-700">Price Range:</span>
                    <span className="text-gray-600">
                      {formatPriceRange(restaurant.priceRangeText.min, restaurant.priceRangeText.max)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <span className="text-gray-600 text-sm">{formatDate(restaurant.updatedAt)}</span>
                </div>
              </div>
            </div>
            
            {restaurant.notes && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-line">{restaurant.notes}</p>
                </div>
              </div>
            )}
            
            {restaurant.links.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Links</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <ul className="space-y-2">
                    {restaurant.links.map((link, index) => (
                      <li key={index}>
                        <a 
                          href={link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <ExternalLink size={14} className="mr-2" />
                          <span className="truncate">{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Location</h3>
            <div className="h-64 rounded-md overflow-hidden">
              <MapView 
                lat={restaurant.location.coordinates.lat} 
                lng={restaurant.location.coordinates.lng}
                name={restaurant.name}
              />
            </div>
            <div className="mt-2 text-center">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  restaurant.name + ' ' + restaurant.location.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;